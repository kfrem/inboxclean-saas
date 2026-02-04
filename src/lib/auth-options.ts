import { type NextAuthOptions } from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      image?: string
    }
    accessToken?: string
    refreshToken?: string
    expiresAt?: number
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    sub: string
    accessToken?: string
    refreshToken?: string
    expiresAt?: number
    microsoftId?: string
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: 'microsoft-entra',
      name: 'Microsoft',
      type: 'oauth',
      wellKnown: 'https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration',
      clientId: process.env.MICROSOFT_CLIENT_ID || '',
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET || '',
      authorization: {
        params: {
          scope: 'openid profile email offline_access Mail.ReadWrite Mail.ReadWrite.Shared User.Read',
          prompt: 'consent',
        },
      },
      profile: async (profile: any) => ({
        id: profile.sub,
        name: profile.name,
        email: profile.email,
        image: profile.picture,
        microsoft_id: profile.sub,
      }),
    },
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, account }): Promise<JWT> {
      if (account) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
        token.expiresAt = account.expires_at
        token.microsoftId = account.providerAccountId
      }

      // Refresh token if needed
      if (token.expiresAt && Date.now() >= (token.expiresAt as number) * 1000) {
        // Token refresh logic would go here
        console.log('Token refresh needed')
      }

      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub
        session.accessToken = token.accessToken as string
        session.refreshToken = token.refreshToken as string
        session.expiresAt = token.expiresAt as number
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },
  events: {
    async signIn({ user }) {
      console.log('User signed in:', user.email)
    },
    async signOut() {
      console.log('User signed out')
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
}
