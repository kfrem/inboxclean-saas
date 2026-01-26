import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Providers } from '@/app/providers'

export const metadata: Metadata = {
  title: 'InboxClean - Smart Email Cleanup',
  description: 'Automatically cleanup your Outlook inbox with intelligent detection',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
