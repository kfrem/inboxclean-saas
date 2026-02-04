'use client'

import { useQuery } from '@tanstack/react-query'
import { Card } from '@/components/ui/button'
import Link from 'next/link'

interface CleanupHistoryItem {
  id: string
  cleanup_type: string
  emails_deleted: number
  storage_freed_mb: number
  execution_time_seconds: number
  status: string
  created_at: string
}

export default function HistoryPage() {
  const { data, isLoading } = useQuery<{
    cleanups: CleanupHistoryItem[]
    pagination: { total: number }
  }>({
    queryKey: ['cleanup-history'],
    queryFn: async () => {
      const res = await fetch('/api/cleanup/history')
      if (!res.ok) throw new Error('Failed to fetch history')
      const json = await res.json()
      return json.data
    },
  })

  const getTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      auto_replies: '🤖',
      bounces: '↩️',
      duplicates: '📋',
      spam: '🚫',
      inactive_newsletters: '📬',
      large_emails: '📦',
    }
    return icons[type] || '📧'
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Cleanup History</h1>
        <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
          View all your past email cleanups
        </p>
      </div>

      {isLoading ? (
        <div className="text-center py-8 sm:py-12">
          <div className="animate-pulse-subtle">
            <p className="text-gray-600">Loading history...</p>
          </div>
        </div>
      ) : !data?.cleanups || data.cleanups.length === 0 ? (
        <Card className="p-6 sm:p-8 text-center">
          <div className="text-4xl mb-4">📭</div>
          <p className="text-gray-600 mb-4 text-sm sm:text-base">No cleanups yet</p>
          <Link href="/">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 min-h-[44px] text-sm sm:text-base">
              Run Your First Cleanup
            </button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {data.cleanups.map((cleanup) => (
            <Card key={cleanup.id} className="p-4 sm:p-6 hover:shadow-lg transition">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1 sm:mb-2">
                    <span className="text-xl sm:text-2xl">
                      {getTypeIcon(cleanup.cleanup_type)}
                    </span>
                    <div>
                      <h3 className="font-semibold text-base sm:text-lg capitalize">
                        {cleanup.cleanup_type.replace(/_/g, ' ')}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {new Date(cleanup.created_at).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between sm:justify-end sm:text-right gap-4 sm:gap-6">
                  <div>
                    <p className="text-xs text-gray-500">Deleted</p>
                    <p className="text-sm sm:text-base font-semibold">
                      {cleanup.emails_deleted} emails
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Freed</p>
                    <p className="text-sm sm:text-base font-semibold text-green-600">
                      {cleanup.storage_freed_mb.toFixed(1)} MB
                    </p>
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-xs text-gray-500">Time</p>
                    <p className="text-sm text-gray-600">
                      {cleanup.execution_time_seconds}s
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t">
                <div className="text-xs text-gray-500 font-mono truncate">
                  ID: {cleanup.id}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
