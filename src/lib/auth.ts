import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { NextRequest, NextResponse } from 'next/server'
import type { CustomSession } from '@/types'

export async function getSession(): Promise<CustomSession | null> {
  return getServerSession(authOptions) as Promise<CustomSession | null>
}

export async function withAuth(
  handler: (req: NextRequest, session: CustomSession) => Promise<NextResponse>
) {
  return async (req: NextRequest) => {
    const session = await getSession()

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    return handler(req, session)
  }
}

export async function withSubscription(
  tier: 'free' | 'pro' | 'enterprise' | 'any' = 'any'
) {
  return async (
    handler: (req: NextRequest, session: CustomSession) => Promise<NextResponse>
  ) => {
    return async (req: NextRequest) => {
      const session = await getSession()

      if (!session) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        )
      }

      // Get user's subscription status from database
      // This is a simplified version - in production, query the DB
      if (tier !== 'any' && session.user) {
        // Check user's tier against required tier
        // Redirect to upgrade if needed
      }

      return handler(req, session)
    }
  }
}
