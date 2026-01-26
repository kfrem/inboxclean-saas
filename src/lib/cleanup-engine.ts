import type { Email } from '@/types'

/**
 * Detect bounce emails from Microsoft Graph API response
 * Bounces are emails from mailer-daemon, postmaster, and delivery failure notifications
 */
export async function detectBounceEmails(emails: Email[]): Promise<Email[]> {
  const bouncePatterns = [
    /mailer-daemon|postmaster|noreply.*bounce/i,
    /Mail Delivery Failed/i,
    /Undeliverable/i,
    /delivery status notification/i,
  ]

  return emails.filter((email) => {
    const fromLower = email.from.toLowerCase()
    const subjectLower = email.subject.toLowerCase()

    // Check if from address or subject matches bounce patterns
    const isBounce = bouncePatterns.some(
      (pattern) => pattern.test(fromLower) || pattern.test(subjectLower)
    )

    return isBounce
  })
}

/**
 * Detect duplicate emails by comparing sender, subject, and approximate date
 */
export function detectDuplicateEmails(emails: Email[]): Email[] {
  const emailMap = new Map<string, Email>()
  const duplicates: Email[] = []

  for (const email of emails) {
    // Create a hash key from from + subject + date (rounded to day)
    const dateKey = new Date(email.received_date).toLocaleDateString()
    const hashKey = `${email.from}|${email.subject}|${dateKey}`

    if (emailMap.has(hashKey)) {
      // Mark as duplicate
      duplicates.push({
        ...email,
        is_duplicate: true,
      })
    } else {
      emailMap.set(hashKey, email)
    }
  }

  return duplicates
}

/**
 * Calculate spam score based on various indicators
 * Returns score from 0 to 1 (1 = most likely spam)
 */
export function calculateSpamScore(email: Email): number {
  let score = 0

  // Check for marketing/promotional language
  const marketingKeywords = [
    'unsubscribe',
    'promotional',
    'marketing',
    'limited time',
    'act now',
    'buy now',
    'limited offer',
  ]
  const subjectLower = email.subject.toLowerCase()
  const marketingMatches = marketingKeywords.filter((kw) =>
    subjectLower.includes(kw)
  ).length
  score += (marketingMatches / marketingKeywords.length) * 0.2

  // Check for suspicious patterns
  const suspiciousPatterns = [
    /click here/i,
    /verify account/i,
    /confirm identity/i,
    /update payment/i,
  ]
  const suspiciousMatches = suspiciousPatterns.filter((p) =>
    p.test(subjectLower)
  ).length
  score += (suspiciousMatches / suspiciousPatterns.length) * 0.3

  // Check for all caps (often spam indicator)
  const allCapsRatio = (email.subject.match(/[A-Z]/g) || []).length /
    email.subject.length
  if (allCapsRatio > 0.7) score += 0.2

  return Math.min(score, 1.0)
}

/**
 * Detect inactive newsletters
 * Newsletters that haven't been opened or clicked in 90 days
 */
export function detectInactiveNewsletters(
  emails: Email[],
  daysThreshold: number = 90
): Email[] {
  const ninetyDaysAgo = new Date()
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - daysThreshold)

  // Filter emails that are:
  // 1. From newsletter/marketing addresses
  // 2. Haven't been read
  // 3. Older than threshold
  return emails.filter((email) => {
    const isNewsletterLike = /(newsletter|news|updates|digest|weekly|daily)/i.test(
      email.from
    )
    const isOld = new Date(email.received_date) < ninetyDaysAgo
    const isUnread = !email.is_read

    return isNewsletterLike && isOld && isUnread
  })
}

/**
 * Detect large emails that consume storage
 */
export function detectLargeEmails(
  emails: Email[],
  sizeThresholdMB: number = 5
): Email[] {
  const sizeThresholdBytes = sizeThresholdMB * 1024 * 1024

  return emails.filter((email) => (email.size_bytes || 0) > sizeThresholdBytes)
}

/**
 * Run cleanup detection based on type
 */
export async function runCleanupDetection(
  emails: Email[],
  cleanupType: string
): Promise<Email[]> {
  switch (cleanupType) {
    case 'bounces':
      return await detectBounceEmails(emails)
    case 'duplicates':
      return detectDuplicateEmails(emails)
    case 'spam': {
      // Filter emails with high spam score
      const threshold = 0.7
      return emails.filter((email) => calculateSpamScore(email) > threshold)
    }
    case 'inactive_newsletters':
      return detectInactiveNewsletters(emails)
    case 'large_emails':
      return detectLargeEmails(emails, 5)
    default:
      return []
  }
}

/**
 * Calculate storage size to be freed
 */
export function calculateStorageSaved(emails: Email[]): number {
  const totalBytes = emails.reduce((sum, email) => sum + (email.size_bytes || 0), 0)
  return Math.round((totalBytes / (1024 * 1024)) * 100) / 100 // Convert to MB and round to 2 decimals
}
