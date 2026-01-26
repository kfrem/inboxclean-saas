import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">InboxClean</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{session.user?.email}</span>
              <button className="text-sm text-gray-600 hover:text-gray-900">
                Sign out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <a href="/dashboard" className="px-3 py-4 border-b-2 border-blue-500 text-blue-600 text-sm font-medium">
              Dashboard
            </a>
            <a href="/dashboard/history" className="px-3 py-4 border-b-2 border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300 text-sm font-medium">
              History
            </a>
            <a href="/settings" className="px-3 py-4 border-b-2 border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300 text-sm font-medium">
              Settings
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}
