import { z } from 'zod'

// User registration/login validation
export const userSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export type UserInput = z.infer<typeof userSchema>

// Cleanup form validation
export const cleanupFormSchema = z.object({
  cleanup_type: z.enum(['auto_replies', 'bounces', 'duplicates', 'spam', 'inactive_newsletters', 'custom']),
  dry_run: z.boolean().default(false),
  selected_folders: z.array(z.string()).optional(),
  advanced_options: z.boolean().default(false),
})

export type CleanupFormData = z.infer<typeof cleanupFormSchema>

// Rule creation validation
export const ruleSchema = z.object({
  name: z.string().min(3, 'Rule name must be at least 3 characters'),
  description: z.string().optional(),
  rule_type: z.enum(['bounces', 'duplicates', 'spam', 'custom']),
  conditions: z.record(z.any()),
  actions: z.record(z.any()),
  is_active: z.boolean().default(true),
  run_schedule: z.string().optional(),
})

export type RuleInput = z.infer<typeof ruleSchema>

// Payment validation
export const subscriptionSchema = z.object({
  plan_id: z.enum(['free', 'pro', 'enterprise']),
  payment_method_id: z.string().optional(),
})

export type SubscriptionInput = z.infer<typeof subscriptionSchema>

// Email validation
export const emailSchema = z.object({
  to: z.string().email(),
  subject: z.string(),
  body: z.string(),
  html: z.string().optional(),
})

// Feedback validation
export const feedbackSchema = z.object({
  type: z.enum(['bug', 'feature', 'general']),
  title: z.string().min(5),
  message: z.string().min(10),
  email: z.string().email().optional(),
})

export type FeedbackInput = z.infer<typeof feedbackSchema>
