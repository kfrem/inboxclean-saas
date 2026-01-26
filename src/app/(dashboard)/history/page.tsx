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
      bounces: '↩️',
      duplicates: '📋',
      spam: '🚫',
      inactive_newsletters: '📬',
      large_emails: '📦',
    }
    return icons[type] || '📧'
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Cleanup History</h1>
        <p className="text-gray-600 mt-2">View all your past email cleanups</p>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading history...</p>
        </div>
      ) : !data?.cleanups || data.cleanups.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-gray-600 mb-4">No cleanups yet</p>
          <Link href="/dashboard">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Run Your First Cleanup
            </button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-4">
          {data.cleanups.map((cleanup) => (
            <Card key={cleanup.id} className="p-6 hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">
                      {getTypeIcon(cleanup.cleanup_type)}
                    </span>
                    <div>
                      <h3 className="font-semibold text-lg capitalize">
                        {cleanup.cleanup_type.replace(/_/g, ' ')}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {new Date(cleanup.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <p className="text-sm text-gray-600">
                    {cleanup.emails_deleted} emails deleted
                  </p>
                  <p className="text-sm font-semibold">
                    {cleanup.storage_freed_mb.toFixed(1)} MB freed
                  </p>
                  <p className="text-xs text-gray-500">
                    {cleanup.execution_time_seconds}s
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="text-xs text-gray-500 font-mono">
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
