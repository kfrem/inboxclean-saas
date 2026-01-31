import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { createSupabaseServerClient } from '@/lib/supabase-server'

/**
 * GET /api/cleanup/history?page=1&limit=10
 * Retrieve user's cleanup history
 * Returns paginated list of past cleanups
 */
export async function GET(req: NextRequest) {
  try {
    const session = await getSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const searchParams = req.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 50)
    const offset = (page - 1) * limit

    // Query the database with prefixed table name
    const supabase = await createSupabaseServerClient()
    const { data, count, error } = await supabase
      .from('inboxclean_cleanup_history')
      .select('*', { count: 'exact' })
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      console.error('Database query error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to fetch cleanup history' },
        { status: 500 }
      )
    }

    const totalPages = count ? Math.ceil(count / limit) : 0

    return NextResponse.json(
      {
        success: true,
        data: {
          cleanups: data || [],
          pagination: {
            page,
            limit,
            total: count || 0,
            pages: totalPages,
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
