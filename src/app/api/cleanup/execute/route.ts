import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { createGraphClient } from '@/lib/graph-api'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import {
  runCleanupDetection,
  calculateStorageSaved,
} from '@/lib/cleanup-engine'
import type { Email } from '@/types'

/**
 * POST /api/cleanup/execute
 * Actually execute the cleanup - DELETE emails
 * This is the main endpoint for performing cleanup
 */
export async function POST(req: NextRequest) {
  try {
    const session = await getSession()
    if (!session?.accessToken || !session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized - no access token' },
        { status: 401 }
      )
    }

    const { cleanup_type, dry_run = false, only_from_strangers } = await req.json()

    // Validate cleanup type
    const validTypes = ['auto_replies', 'bounces', 'duplicates', 'spam', 'inactive_newsletters', 'large_emails']
    if (!validTypes.includes(cleanup_type)) {
      return NextResponse.json(
        { error: 'Invalid cleanup type' },
        { status: 400 }
      )
    }

    // Initialize Graph API client
    const graphClient = createGraphClient(session.accessToken)

    // Get emails from inbox
    const graphEmails = await graphClient.getMessages('inbox', undefined, 500)

    // Convert Graph emails to our Email type
    const emails: Email[] = graphEmails.map((ge) => ({
      id: ge.id,
      from: ge.from.emailAddress.address,
      subject: ge.subject,
      received_date: new Date(ge.receivedDateTime),
      folder: 'Inbox',
      is_read: ge.isRead,
      size_bytes: ge.size,
      has_attachments: ge.hasAttachments,
    }))

    // Run detection
    const emailsToDelete = await runCleanupDetection(emails, cleanup_type, {
      accessToken: session.accessToken,
      onlyFromStrangers: only_from_strangers,
    })

    const emailIds = emailsToDelete.map((e) => e.id)
    const storageSaved = calculateStorageSaved(emailsToDelete)

    // If dry_run, return without deleting
    if (dry_run) {
      return NextResponse.json(
        {
          success: true,
          data: {
            cleanup_id: `preview-${Date.now()}`,
            status: 'preview',
            emails_found: emailIds.length,
            emails_deleted: 0,
            storage_freed_mb: storageSaved,
            estimated_time_seconds: Math.ceil(emailIds.length / 50),
            message: 'Dry run preview - no emails were deleted',
          },
        },
        { status: 200 }
      )
    }

    // Execute actual deletion
    const startTime = Date.now()
    let deleted = 0
    let failed = 0

    // Batch delete in groups of 20
    const batchSize = 20
    for (let i = 0; i < emailIds.length; i += batchSize) {
      const batch = emailIds.slice(i, i + batchSize)

      for (const emailId of batch) {
        const success = await graphClient.deleteMessage(emailId)
        if (success) {
          deleted++
        } else {
          failed++
        }
      }
    }

    const executionTime = Math.round((Date.now() - startTime) / 1000)

    // Save to database with prefixed table name
    const supabase = await createSupabaseServerClient()
    const { data: cleanupRecord, error: dbError } = await supabase
      .from('inboxclean_cleanup_history')
      .insert({
        user_id: session.user.id,
        cleanup_type,
        status: 'completed',
        emails_found: emailIds.length,
        emails_deleted: deleted,
        emails_failed: failed,
        storage_freed_mb: parseFloat(storageSaved.toFixed(2)),
        execution_time_seconds: executionTime,
      })
      .select()
      .single()

    if (dbError) {
      console.error('Failed to save cleanup history:', dbError)
    }

    const cleanupId = cleanupRecord?.id || `cleanup-${Date.now()}`

    return NextResponse.json(
      {
        success: true,
        data: {
          cleanup_id: cleanupId,
          status: 'completed',
          cleanup_type,
          emails_found: emailIds.length,
          emails_deleted: deleted,
          emails_failed: failed,
          storage_freed_mb: storageSaved,
          execution_time_seconds: executionTime,
          created_at: new Date().toISOString(),
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Cleanup execution error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to execute cleanup',
      },
      { status: 500 }
    )
  }
}
