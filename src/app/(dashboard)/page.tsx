'use client'

import { useQuery } from '@tanstack/react-query'
import { Card } from '@/components/ui/button'
import { CleanupForm } from '@/components/CleanupForm'

interface DashboardStats {
  inbox: {
    total_emails: number
    total_size_mb: number
  }
  cleanups: {
    total_cleanups: number
    storage_freed_mb: number
  }
}

export default function DashboardPage() {
  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const res = await fetch('/api/dashboard/stats')
      if (!res.ok) throw new Error('Failed to fetch stats')
      const json = await res.json()
      return json.data
    },
  })

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Dashboard</h1>
        <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
          Welcome back to your inbox
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="p-4 sm:p-6">
          <p className="text-xs sm:text-sm font-medium text-gray-600">Total Emails</p>
          <p className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2">
            {isLoading ? (
              <span className="animate-pulse-subtle">...</span>
            ) : (
              stats?.inbox.total_emails.toLocaleString()
            )}
          </p>
        </Card>

        <Card className="p-4 sm:p-6">
          <p className="text-xs sm:text-sm font-medium text-gray-600">Storage Used</p>
          <p className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2">
            {isLoading ? (
              <span className="animate-pulse-subtle">...</span>
            ) : (
              `${(stats?.inbox.total_size_mb || 0).toFixed(1)} MB`
            )}
          </p>
        </Card>

        <Card className="p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
          <p className="text-xs sm:text-sm font-medium text-gray-600">Cleanups Done</p>
          <p className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2">
            {isLoading ? (
              <span className="animate-pulse-subtle">...</span>
            ) : (
              stats?.cleanups.total_cleanups
            )}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Freed {(stats?.cleanups.storage_freed_mb || 0).toFixed(1)} MB
          </p>
        </Card>
      </div>

      {/* Cleanup Section */}
      <Card className="p-4 sm:p-6 md:p-8">
        <CleanupForm />
      </Card>
    </div>
  )
}
