import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { createGraphClient } from '@/lib/graph-api'
import {
  runCleanupDetection,
  calculateStorageSaved,
} from '@/lib/cleanup-engine'
import type { Email } from '@/types'

/**
 * POST /api/cleanup/preview
 * Get a preview of emails that would be deleted
 * Does NOT delete anything - just shows what would happen
 */
export async function POST(req: NextRequest) {
  try {
    const session = await getSession()
    if (!session?.accessToken) {
      return NextResponse.json(
        { error: 'Unauthorized - no access token' },
        { status: 401 }
      )
    }

    const { cleanup_type, limit = 100, only_from_strangers } = await req.json()

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

    // Run detection based on cleanup type
    const startTime = Date.now()

    const emailsToDelete = await runCleanupDetection(emails, cleanup_type, {
      accessToken: session.accessToken,
      onlyFromStrangers: only_from_strangers,
    })

    const detectionTime = Date.now() - startTime
    const storageSaved = calculateStorageSaved(emailsToDelete)

    return NextResponse.json(
      {
        success: true,
        data: {
          cleanup_type,
          emails_found: emailsToDelete.length,
          storage_freed_mb: storageSaved,
          confidence: 0.95,
          preview_emails: emailsToDelete.slice(0, limit).map((e) => ({
            id: e.id,
            from: e.from,
            subject: e.subject,
            received_date: e.received_date.toISOString(),
            folder: e.folder,
            size_mb: ((e.size_bytes || 0) / (1024 * 1024)).toFixed(2),
          })),
          detection_time_ms: detectionTime,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Cleanup preview error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate preview',
      },
      { status: 500 }
    )
  }
}
