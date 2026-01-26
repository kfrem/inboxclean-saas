// User types
export interface User {
  id: string
  email: string
  name: string
  avatar_url?: string
  microsoft_id: string
  microsoft_email: string
  tier: 'free' | 'pro' | 'enterprise'
  subscription_id?: string
  status: 'active' | 'paused' | 'cancelled'
  last_cleanup_at?: Date
  created_at: Date
  updated_at: Date
}

// Cleanup types
export interface CleanupRequest {
  cleanup_type: 'bounces' | 'duplicates' | 'spam' | 'inactive_newsletters' | 'custom'
  dry_run?: boolean
  rules?: CleanupRule[]
  folder?: string
}

export interface CleanupResponse {
  cleanup_id: string
  status: 'pending' | 'in_progress' | 'completed' | 'failed'
  emails_found: number
  emails_deleted?: number
  emails_failed?: number
  storage_freed_mb?: number
  started_at: Date
  completed_at?: Date
  error_message?: string
}

export interface CleanupHistory {
  id: string
  user_id: string
  cleanup_type: string
  status: 'completed' | 'failed' | 'in_progress'
  emails_found: number
  emails_deleted: number
  emails_failed: number
  storage_freed_mb: number
  execution_time_seconds: number
  error_message?: string
  created_at: Date
  updated_at: Date
}

// Rule types
export interface CleanupRule {
  id?: string
  user_id?: string
  name: string
  description?: string
  rule_type: 'bounces' | 'duplicates' | 'spam' | 'custom'
  conditions: Record<string, any>
  actions: Record<string, any>
  is_active: boolean
  run_schedule?: string
  last_run_at?: Date
  next_run_at?: Date
  created_at?: Date
  updated_at?: Date
}

// Email types
export interface Email {
  id: string
  from: string
  subject: string
  received_date: Date
  folder: string
  is_read: boolean
  size_bytes: number
  has_attachments: boolean
  bounce_score?: number
  spam_score?: number
  is_duplicate?: boolean
}

// Subscription types
export interface Subscription {
  id: string
  user_id: string
  stripe_subscription_id?: string
  stripe_customer_id?: string
  plan_id: 'free' | 'pro' | 'enterprise'
  status: 'active' | 'past_due' | 'cancelled'
  billing_cycle_start: Date
  billing_cycle_end: Date
  amount_cents: number
  currency: string
  auto_renew: boolean
  created_at: Date
  updated_at: Date
}

// Session type
export interface CustomSession {
  user: {
    id: string
    email: string
    name: string
    image?: string
  }
  accessToken?: string
  expiresAt?: number
}

// Dashboard stats
export interface DashboardStats {
  inbox_stats: {
    total_emails: number
    unread_emails: number
    folders_count: number
    total_size_mb: number
  }
  cleanup_stats: {
    total_cleanups: number
    total_emails_deleted: number
    total_storage_freed_mb: number
    last_cleanup_at?: Date
  }
  efficiency: {
    avg_cleanup_time_seconds: number
    emails_per_cleanup: number
    estimated_hours_saved: number
  }
  subscription: {
    tier: string
    status: string
    billing_cycle_end?: Date
  }
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface ApiError {
  code: string
  message: string
  status: number
}
