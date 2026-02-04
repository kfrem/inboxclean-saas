import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { createSupabaseServerClient } from '@/lib/supabase-server'

/**
 * GET /api/dashboard/stats
 * Retrieve dashboard statistics for authenticated user
 * Shows inbox stats, cleanup stats, and trends
 */
export async function GET() {
  try {
    const session = await getSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = await createSupabaseServerClient()

    // Get cleanup stats from database
    const { data: cleanupHistory, error: cleanupError } = await supabase
      .from('inboxclean_cleanup_history')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })

    if (cleanupError) {
      console.error('Database query error:', cleanupError)
    }

    // Calculate cleanup stats from real data
    const totalCleanups = cleanupHistory?.length || 0
    const emailsDeleted = cleanupHistory?.reduce((sum: number, c: any) => sum + (c.emails_deleted || 0), 0) || 0
    const storageFreed = cleanupHistory?.reduce((sum: number, c: any) => sum + (c.storage_freed_mb || 0), 0) || 0

    // Get cleanups this month
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const cleanupsThisMonth = cleanupHistory?.filter((c: any) =>
      new Date(c.created_at) >= startOfMonth
    ).length || 0

    // Inbox stats - these would come from Microsoft Graph API in production
    // For now using mock data until Graph API is fully integrated
    const mockStats = {
      inbox: {
        total_emails: 4287,
        unread_count: 128,
        total_size_mb: 2341.5,
        oldest_email_date: '2022-03-15T09:30:00Z',
      },
      cleanups: {
        total_cleanups: totalCleanups,
        emails_deleted: emailsDeleted,
        storage_freed_mb: parseFloat(storageFreed.toFixed(2)),
        cleanups_this_month: cleanupsThisMonth,
      },
      categories: {
        bounces: {
          estimated_count: 47,
          estimated_size_mb: 12.5,
        },
        duplicates: {
          estimated_count: 89,
          estimated_size_mb: 45.2,
        },
        inactive_newsletters: {
          estimated_count: 234,
          estimated_size_mb: 89.3,
        },
        large_emails: {
          estimated_count: 12,
          estimated_size_mb: 156.7,
        },
      },
      trends: {
        cleanups_by_day: [
          { date: '2024-01-01', count: 1 },
          { date: '2024-01-02', count: 0 },
          { date: '2024-01-03', count: 2 },
          { date: '2024-01-04', count: 0 },
          { date: '2024-01-05', count: 1 },
          { date: '2024-01-06', count: 1 },
          { date: '2024-01-07', count: 1 },
        ],
        storage_freed_by_day: [
          { date: '2024-01-01', mb: 12.5 },
          { date: '2024-01-03', mb: 89.3 },
          { date: '2024-01-05', mb: 45.2 },
          { date: '2024-01-06', mb: 56.7 },
          { date: '2024-01-07', mb: 78.5 },
        ],
      },
      recommendations: [
        {
          type: 'bounces',
          description: 'Remove undeliverable emails',
          estimated_emails: 47,
          estimated_size_mb: 12.5,
          priority: 'high',
        },
        {
          type: 'duplicates',
          description: 'Remove duplicate messages',
          estimated_emails: 89,
          estimated_size_mb: 45.2,
          priority: 'medium',
        },
      ],
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          user_id: session.user.id,
          timestamp: new Date().toISOString(),
          ...mockStats,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Stats retrieval error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to retrieve stats',
      },
      { status: 500 }
    )
  }
}
