import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { SignOutButton } from '@/components/SignOutButton'
import Link from 'next/link'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">InboxClean</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 truncate max-w-[200px]">
                {session.user?.email}
              </span>
              <SignOutButton />
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-4 sm:space-x-8 overflow-x-auto">
            <Link
              href="/"
              className="px-3 py-4 border-b-2 border-blue-500 text-blue-600 text-sm font-medium whitespace-nowrap"
            >
              Dashboard
            </Link>
            <Link
              href="/history"
              className="px-3 py-4 border-b-2 border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300 text-sm font-medium whitespace-nowrap"
            >
              History
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {children}
      </main>
    </div>
  )
}
