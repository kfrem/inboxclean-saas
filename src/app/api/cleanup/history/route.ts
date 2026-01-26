import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'

/**
 * GET /api/cleanup/history?page=1&limit=10
 * Retrieve user's cleanup history
 * Returns paginated list of past cleanups
 */
export async function GET(req: NextRequest) {
  try {
    const session = await getSession()
    if (!session?.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const searchParams = req.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 50)
    const offset = (page - 1) * limit

    // Mock data for now - in production, query the database
    // const { data, count, error } = await db
    //   .from('cleanup_history')
    //   .select('*', { count: 'exact' })
    //   .eq('user_id', session.userId)
    //   .order('created_at', { ascending: false })
    //   .range(offset, offset + limit - 1)

    const mockData = [
      {
        id: `cleanup-${Date.now() - 3600000}`,
        user_id: session.userId,
        cleanup_type: 'bounces',
        emails_found: 47,
        emails_deleted: 47,
        storage_freed_mb: 12.5,
        execution_time_seconds: 18,
        status: 'completed',
        created_at: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: `cleanup-${Date.now() - 86400000}`,
        user_id: session.userId,
        cleanup_type: 'inactive_newsletters',
        emails_found: 234,
        emails_deleted: 234,
        storage_freed_mb: 89.3,
        execution_time_seconds: 45,
        status: 'completed',
        created_at: new Date(Date.now() - 86400000).toISOString(),
      },
    ]

    return NextResponse.json(
      {
        success: true,
        data: {
          cleanups: mockData,
          pagination: {
            page,
            limit,
            total: 2,
            pages: 1,
          },
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('History retrieval error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to retrieve history',
      },
      { status: 500 }
    )
  }
}
