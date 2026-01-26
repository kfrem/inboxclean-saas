# OUTLOOK CLEANUP SaaS - COMPLETE BUILD SPECIFICATION

**Version:** 1.0  
**Last Updated:** January 26, 2026  
**Status:** Ready for Development  
**Estimated Build Time:** 16 weeks (120-160 hours)

---

## TABLE OF CONTENTS

1. [Project Overview](#project-overview)
2. [Business Model](#business-model)
3. [Technology Stack](#technology-stack)
4. [Feature Phases](#feature-phases)
5. [Database Schema](#database-schema)
6. [API Specifications](#api-specifications)
7. [Frontend Architecture](#frontend-architecture)
8. [Backend Architecture](#backend-architecture)
9. [Authentication & Security](#authentication--security)
10. [Cleanup Engine](#cleanup-engine)
11. [Deployment Guide](#deployment-guide)
12. [Testing Strategy](#testing-strategy)
13. [Success Metrics](#success-metrics)

---

## PROJECT OVERVIEW

### Vision

InboxClean is a SaaS platform that helps Microsoft Outlook users automatically detect and remove unwanted emails (bounces, duplicates, spam, inactive newsletters) with a single click or on a schedule. The platform integrates directly with Outlook via Microsoft Graph API, providing users with intelligent email management without manual sorting.

### Business Problem

- **Users:** People with cluttered Outlook inboxes (500-50,000+ emails)
- **Problem:** Manual email cleanup is time-consuming and error-prone
- **Current Solutions:** Limited; most Outlook features are basic
- **Market Gap:** No specialized SaaS for intelligent email cleanup

### Solution

- **Automatic Detection:** AI-powered bounce, duplicate, and spam detection
- **One-Click Cleanup:** Remove unwanted emails in seconds
- **Scheduled Cleanup:** Set rules and let the system clean automatically
- **Safety First:** Preview before deletion, full audit trail, recovery options

### Target Market

**Primary:** 
- Professionals aged 25-55
- Corporate workers with 500+ emails
- Email management power users
- Organizations with email compliance needs

**Secondary:**
- Freelancers & entrepreneurs
- Customer support teams
- Sales teams managing leads

**TAM:** ~500M business email users globally
**SAM:** ~10M English-speaking Outlook users
**SOM:** ~50K users in Year 1

---

## BUSINESS MODEL

### Revenue Streams

#### 1. Freemium Subscription Model
- **Free Tier:** 1 cleanup per month, basic detection
- **Pro Tier:** £9.99/month - Unlimited cleanups, advanced detection, scheduling
- **Enterprise Tier:** £99/month - Team management, API access, SSO, SLA

#### 2. Volume Discounts
- Annual plans: 20% discount
- Team licenses: 30% off per user
- Enterprise contracts: Custom pricing

### Pricing Strategy

| Feature | Free | Pro | Enterprise |
|---------|------|-----|------------|
| Cleanups/month | 1 | Unlimited | Unlimited |
| Detection Types | Basic (bounces) | All 5 types | Custom |
| Scheduling | ❌ | ✅ | ✅ |
| Team Management | ❌ | ❌ | ✅ |
| API Access | ❌ | ❌ | ✅ |
| Support | Email | Email | Priority |
| Monthly Cost | Free | £9.99 | £99+ |

### Revenue Projections (Year 1)

- **500 signups** (first 3 months)
- **50 paid conversions** (10% conversion rate)
- **£5,000 MRR** by month 12
- **£60,000 ARR** at 12 months
- **Break-even:** Month 18-20 (including infrastructure)

---

## TECHNOLOGY STACK

### Frontend
- **Framework:** Next.js 15 (React 19 with App Router)
- **Styling:** Tailwind CSS + shadcn/ui components
- **State Management:** TanStack Query (React Query) for server state
- **Forms:** React Hook Form + Zod validation
- **Authentication UI:** NextAuth.js
- **Charts:** Recharts for analytics
- **Testing:** Vitest + React Testing Library

### Backend
- **Runtime:** Node.js 20+
- **Framework:** Next.js API Routes
- **Database:** Supabase (PostgreSQL)
- **Authentication:** NextAuth.js + Microsoft Entra ID
- **Email API:** Microsoft Graph API
- **Payment:** Stripe
- **Job Queue:** Bull (Redis for MVP, Vercel for scalability)
- **Logging:** Pino + Sentry
- **Testing:** Jest + Supertest

### Infrastructure
- **Hosting:** Vercel (Next.js optimized)
- **Database:** Supabase PostgreSQL
- **File Storage:** Supabase Storage
- **Email Notifications:** SendGrid or Resend
- **Payment Processing:** Stripe
- **Monitoring:** Sentry + Vercel Analytics
- **CDN:** Vercel Edge Network (included)
- **Redis:** Upstash (for job queue)

### Development Tools
- **Language:** TypeScript
- **Package Manager:** pnpm
- **Version Control:** Git + GitHub
- **CI/CD:** GitHub Actions
- **Code Quality:** ESLint + Prettier + TypeScript strict mode
- **Documentation:** Markdown + Swagger/OpenAPI

---

## FEATURE PHASES

### PHASE 1: MVP (Weeks 1-4)
**Goal:** Core functionality, user acquisition, validate product-market fit

#### Features
1. **User Authentication**
   - Microsoft Entra ID OAuth 2.0 integration
   - Email verification
   - Profile setup wizard
   - Session management

2. **Basic Email Cleanup**
   - Bounce email detection
   - One-click cleanup preview
   - Cleanup execution
   - Email removal from folder

3. **Dashboard**
   - Email statistics (total, unread, by folder)
   - Recent activity log
   - Cleanup history
   - Settings page

4. **Inbox Management**
   - View inbox contents
   - Select folders for cleanup
   - Preview emails to be deleted
   - Undo functionality (7-day window)

#### Deliverables
- Working auth flow
- Functional cleanup engine
- Basic dashboard
- Database schema
- API endpoints for auth + cleanup
- Deployment to production
- Documentation

#### Success Criteria
- 100+ signups
- 50% of signups complete first cleanup
- 99.9% uptime
- Zero data loss incidents

---

### PHASE 2: Enhanced Features (Weeks 5-8)
**Goal:** Advanced capabilities, user retention, premium features

#### Features
1. **Advanced Detection**
   - Duplicate email detection
   - Inactive newsletter detection (no clicks/opens in 90 days)
   - Spam detection (machine learning)
   - Custom rule creation

2. **Scheduled Cleanup**
   - Cron-based scheduling
   - Weekly/monthly/custom intervals
   - Rule templates (e.g., "delete bounces weekly")
   - Execution history with timestamps

3. **Rules Engine**
   - Create custom cleanup rules
   - Combine conditions (from, subject, date, size)
   - Save favorite rule sets
   - Rule templates (popular pre-built rules)

4. **Email Categories**
   - Auto-categorize emails by type
   - Personal, work, promotions, updates
   - Apply rules per category
   - Category management

5. **Advanced Dashboard**
   - Cleanup statistics & charts
   - Estimated storage savings
   - Cleanup trend analysis
   - ROI calculator (time saved)

#### Deliverables
- Enhanced cleanup engine
- Rules engine implementation
- Advanced dashboard UI
- Background job queue
- Scheduled task system
- Advanced analytics

#### Success Criteria
- 1,000+ total signups
- 15% of Pro tier conversion
- Feature adoption >60%
- 99.95% uptime

---

### PHASE 3: Monetization & Polish (Weeks 9-12)
**Goal:** Generate revenue, improve UX, strengthen retention

#### Features
1. **Payment Integration**
   - Stripe subscription management
   - Multiple payment methods
   - Billing history
   - Invoice management
   - Dunning management (failed payments)

2. **Team Management (Enterprise)**
   - Invite team members
   - Role-based access control (admin, member)
   - Usage tracking per user
   - Centralized billing

3. **Audit & Compliance**
   - Detailed activity logging
   - Compliance reports
   - Data retention policies
   - GDPR compliance

4. **API for Enterprise**
   - REST API for integrations
   - Webhook support
   - Rate limiting per plan
   - API key management
   - OpenAPI documentation

5. **UI/UX Refinement**
   - Onboarding improvements
   - Mobile responsive design
   - Dark mode support
   - Accessibility (WCAG 2.1 AA)
   - Performance optimization

#### Deliverables
- Stripe integration
- Billing dashboard
- Team management system
- Public REST API
- Compliance documentation
- Mobile-optimized UI
- Performance optimization

#### Success Criteria
- 5,000+ signups
- £5,000 MRR
- 30% Pro tier conversion
- Mobile traffic >30%
- 99.95% uptime

---

### PHASE 4: Scale & Launch (Weeks 13-16)
**Goal:** Production hardening, monitoring, market launch

#### Features
1. **Production Monitoring**
   - 24/7 uptime monitoring
   - Performance metrics
   - Error tracking & alerts
   - Database performance optimization
   - Rate limiting enforcement

2. **Customer Support**
   - Help documentation
   - FAQ section
   - Email support queue
   - Status page
   - Feedback collection

3. **Marketing**
   - Blog posts (3-5 technical guides)
   - Email capture for launch
   - Launch announcement
   - Social media content
   - Case studies

4. **Security Hardening**
   - Security audit
   - Penetration testing
   - SSL certificate
   - DDoS protection
   - Data encryption at rest

#### Deliverables
- Production-ready system
- Monitoring & alerting
- Support infrastructure
- Marketing materials
- Security certification
- Launch checklist

#### Success Criteria
- 10,000+ signups
- £10,000+ MRR run-rate
- >99.99% uptime
- <2s page load time
- Zero security incidents

---

## DATABASE SCHEMA

### Overview
- **10 tables** for complete data model
- **PostgreSQL** for relational integrity
- **Row-level security (RLS)** for tenant isolation
- **Automated backups** every 6 hours

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  avatar_url TEXT,
  microsoft_id VARCHAR(255) UNIQUE NOT NULL,
  microsoft_email VARCHAR(255) NOT NULL,
  tier VARCHAR(50) DEFAULT 'free', -- free, pro, enterprise
  subscription_id VARCHAR(255), -- Stripe subscription
  status VARCHAR(50) DEFAULT 'active', -- active, paused, cancelled
  last_cleanup_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_microsoft_id ON users(microsoft_id);
```

### Subscriptions Table
```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  stripe_subscription_id VARCHAR(255) UNIQUE,
  stripe_customer_id VARCHAR(255),
  plan_id VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL, -- active, past_due, cancelled
  billing_cycle_start TIMESTAMP,
  billing_cycle_end TIMESTAMP,
  amount_cents INTEGER,
  currency VARCHAR(3) DEFAULT 'GBP',
  auto_renew BOOLEAN DEFAULT TRUE,
  cancellation_reason TEXT,
  cancelled_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_stripe_subscription_id ON subscriptions(stripe_subscription_id);
```

### Cleanup History Table
```sql
CREATE TABLE cleanup_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  cleanup_type VARCHAR(50) NOT NULL, -- bounces, duplicates, spam, inactive_newsletters, custom
  status VARCHAR(50) DEFAULT 'completed', -- pending, in_progress, completed, failed
  emails_found INTEGER,
  emails_deleted INTEGER,
  emails_failed INTEGER,
  storage_freed_mb DECIMAL(10, 2),
  execution_time_seconds INTEGER,
  error_message TEXT,
  preview_tokens TEXT[], -- stores email IDs for recovery
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_cleanup_history_user_id ON cleanup_history(user_id);
CREATE INDEX idx_cleanup_history_created_at ON cleanup_history(created_at DESC);
```

### Cleanup Rules Table
```sql
CREATE TABLE cleanup_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  rule_type VARCHAR(50) NOT NULL, -- bounces, duplicates, spam, custom
  conditions JSONB NOT NULL, -- flexible rule conditions
  actions JSONB NOT NULL, -- what to do when matched
  is_active BOOLEAN DEFAULT TRUE,
  run_schedule VARCHAR(50), -- cron expression or 'never'
  last_run_at TIMESTAMP,
  next_run_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_cleanup_rules_user_id ON cleanup_rules(user_id);
CREATE INDEX idx_cleanup_rules_is_active ON cleanup_rules(is_active);
```

### Email Cache Table
```sql
CREATE TABLE email_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  message_id VARCHAR(255) NOT NULL,
  from_address VARCHAR(255),
  subject TEXT,
  received_date TIMESTAMP,
  folder VARCHAR(255),
  is_read BOOLEAN,
  size_bytes INTEGER,
  has_attachments BOOLEAN,
  bounce_score DECIMAL(3, 2),
  spam_score DECIMAL(3, 2),
  is_duplicate BOOLEAN,
  duplicate_of_message_id VARCHAR(255),
  cached_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP DEFAULT (NOW() + INTERVAL '30 days'),
  UNIQUE(user_id, message_id)
);

CREATE INDEX idx_email_cache_user_id ON email_cache(user_id);
CREATE INDEX idx_email_cache_expires_at ON email_cache(expires_at);
```

### Audit Log Table
```sql
CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  action VARCHAR(100) NOT NULL, -- cleanup_executed, rule_created, subscription_changed
  resource_type VARCHAR(50), -- email, rule, subscription
  resource_id VARCHAR(255),
  changes JSONB, -- before/after values
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_audit_log_user_id ON audit_log(user_id);
CREATE INDEX idx_audit_log_action ON audit_log(action);
```

### API Keys Table
```sql
CREATE TABLE api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  key_hash VARCHAR(255) NOT NULL UNIQUE,
  last_used_at TIMESTAMP,
  rate_limit_requests INTEGER DEFAULT 1000,
  rate_limit_window_seconds INTEGER DEFAULT 3600,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_api_keys_user_id ON api_keys(user_id);
```

### Access Tokens Table
```sql
CREATE TABLE access_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  microsoft_access_token TEXT NOT NULL ENCRYPTED, -- TweetNaCl secretbox
  microsoft_refresh_token TEXT NOT NULL ENCRYPTED,
  token_expires_at TIMESTAMP NOT NULL,
  scopes TEXT[] NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_access_tokens_user_id ON access_tokens(user_id);
```

### Notifications Table
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- cleanup_completed, rule_triggered, payment_failed
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  data JSONB, -- contextual data
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
```

### Recovery Bin Table
```sql
CREATE TABLE recovery_bin (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  cleanup_history_id UUID REFERENCES cleanup_history(id) ON DELETE CASCADE,
  message_id VARCHAR(255) NOT NULL,
  from_address VARCHAR(255),
  subject TEXT,
  received_date TIMESTAMP,
  folder_original VARCHAR(255),
  message_json JSONB, -- Full email metadata for recovery
  deleted_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP DEFAULT (NOW() + INTERVAL '30 days')
);

CREATE INDEX idx_recovery_bin_user_id ON recovery_bin(user_id);
CREATE INDEX idx_recovery_bin_expires_at ON recovery_bin(expires_at);
```

### Data Relationships
```
users (1) ──→ (N) subscriptions
users (1) ──→ (N) cleanup_history
users (1) ──→ (N) cleanup_rules
users (1) ──→ (N) email_cache
users (1) ──→ (N) audit_log
users (1) ──→ (N) api_keys
users (1) ──→ (N) access_tokens
users (1) ──→ (N) notifications
users (1) ──→ (N) recovery_bin

cleanup_history (1) ──→ (N) recovery_bin
```

---

## API SPECIFICATIONS

### Authentication Endpoints

#### POST /api/auth/login
Initiates Microsoft Entra ID OAuth flow

**Request:**
```json
{
  "redirect_uri": "https://inboxclean.app/api/auth/callback"
}
```

**Response:**
```json
{
  "auth_url": "https://login.microsoftonline.com/...",
  "state": "abc123xyz"
}
```

**Status Codes:** 200, 400

---

#### GET /api/auth/callback
Handles OAuth callback from Microsoft

**Query Parameters:**
- `code` - Authorization code from Microsoft
- `state` - State parameter for CSRF protection

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "tier": "free"
  },
  "token": "jwt_token",
  "session": { ... }
}
```

**Status Codes:** 200, 400, 401

---

#### POST /api/auth/logout
Revokes tokens and clears session

**Request:** (Requires auth)

**Response:**
```json
{
  "success": true
}
```

**Status Codes:** 200, 401

---

#### GET /api/auth/me
Get current authenticated user

**Request:** (Requires auth header)

**Response:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "tier": "pro",
  "microsoft_email": "user@outlook.com",
  "subscription": {
    "plan_id": "pro",
    "status": "active",
    "billing_cycle_end": "2026-02-26"
  },
  "created_at": "2026-01-01T00:00:00Z"
}
```

**Status Codes:** 200, 401

---

### Cleanup Endpoints

#### POST /api/cleanup/preview
Get preview of emails to be cleaned

**Request:**
```json
{
  "cleanup_type": "bounces",
  "rules": [
    {
      "field": "from_domain",
      "operator": "equals",
      "value": "mailer-daemon@microsoft.com"
    }
  ],
  "limit": 100
}
```

**Response:**
```json
{
  "total_found": 247,
  "preview_emails": [
    {
      "id": "msg_123",
      "from": "mailer-daemon@microsoft.com",
      "subject": "Delivery Status Notification",
      "received_date": "2025-12-15T10:30:00Z",
      "folder": "Inbox",
      "reason": "bounce_detected",
      "risk_score": 0.95
    }
  ],
  "estimated_storage_freed_mb": 45.2,
  "execution_time_estimate_seconds": 15
}
```

**Status Codes:** 200, 400, 401

---

#### POST /api/cleanup/execute
Execute cleanup based on preview or rules

**Request:**
```json
{
  "cleanup_type": "bounces",
  "dry_run": false,
  "move_to_folder": null
}
```

**Response:**
```json
{
  "cleanup_id": "cleanup_456",
  "status": "in_progress",
  "emails_found": 247,
  "emails_deleted": 0,
  "storage_freed_mb": 0,
  "started_at": "2026-01-26T10:30:00Z",
  "estimated_completion_seconds": 15
}
```

**Status Codes:** 202, 400, 401, 429

---

#### GET /api/cleanup/:id
Get cleanup execution details

**Response:**
```json
{
  "id": "cleanup_456",
  "status": "completed",
  "cleanup_type": "bounces",
  "emails_found": 247,
  "emails_deleted": 247,
  "emails_failed": 0,
  "storage_freed_mb": 45.2,
  "execution_time_seconds": 12,
  "created_at": "2026-01-26T10:30:00Z",
  "completed_at": "2026-01-26T10:30:12Z",
  "error_message": null
}
```

**Status Codes:** 200, 404, 401

---

#### GET /api/cleanup/history
List cleanup history for user

**Query Parameters:**
- `limit` - Results per page (default 20, max 100)
- `offset` - Pagination offset
- `cleanup_type` - Filter by type (optional)

**Response:**
```json
{
  "total": 45,
  "limit": 20,
  "offset": 0,
  "history": [
    {
      "id": "cleanup_456",
      "cleanup_type": "bounces",
      "status": "completed",
      "emails_deleted": 247,
      "storage_freed_mb": 45.2,
      "created_at": "2026-01-26T10:30:00Z"
    }
  ]
}
```

**Status Codes:** 200, 401

---

#### POST /api/cleanup/undo/:id
Restore emails from a cleanup execution

**Request:**
```json
{
  "restore_to_folder": "Inbox"
}
```

**Response:**
```json
{
  "status": "in_progress",
  "emails_restored": 0,
  "total_to_restore": 247,
  "estimated_completion_seconds": 20
}
```

**Status Codes:** 202, 400, 404, 401

---

### Rules Endpoints

#### POST /api/rules
Create a new cleanup rule

**Request:**
```json
{
  "name": "Delete Old Receipts",
  "description": "Automatically delete receipts older than 6 months",
  "rule_type": "custom",
  "conditions": {
    "from_domain": "receipt@example.com",
    "date_before": "2025-07-26",
    "subject_contains": ["receipt", "invoice"]
  },
  "actions": {
    "delete": true,
    "add_label": "cleaned"
  },
  "is_active": true,
  "run_schedule": "0 0 * * 0" -- every Sunday
}
```

**Response:**
```json
{
  "id": "rule_789",
  "name": "Delete Old Receipts",
  "rule_type": "custom",
  "is_active": true,
  "created_at": "2026-01-26T10:30:00Z",
  "next_run_at": "2026-02-01T00:00:00Z"
}
```

**Status Codes:** 201, 400, 401

---

#### GET /api/rules
List user's cleanup rules

**Query Parameters:**
- `is_active` - Filter by active status (optional)

**Response:**
```json
{
  "total": 5,
  "rules": [
    {
      "id": "rule_789",
      "name": "Delete Old Receipts",
      "rule_type": "custom",
      "is_active": true,
      "last_run_at": "2026-01-19T00:00:00Z",
      "next_run_at": "2026-02-01T00:00:00Z"
    }
  ]
}
```

**Status Codes:** 200, 401

---

#### GET /api/rules/:id
Get specific rule details

**Response:**
```json
{
  "id": "rule_789",
  "name": "Delete Old Receipts",
  "rule_type": "custom",
  "conditions": { ... },
  "actions": { ... },
  "is_active": true,
  "run_schedule": "0 0 * * 0",
  "last_run_at": "2026-01-19T00:00:00Z",
  "next_run_at": "2026-02-01T00:00:00Z"
}
```

**Status Codes:** 200, 404, 401

---

#### PUT /api/rules/:id
Update a cleanup rule

**Request:** (Same as POST /api/rules)

**Response:** (Same as GET /api/rules/:id)

**Status Codes:** 200, 400, 404, 401

---

#### DELETE /api/rules/:id
Delete a cleanup rule

**Response:**
```json
{
  "success": true
}
```

**Status Codes:** 200, 404, 401

---

#### POST /api/rules/:id/run
Manually execute a rule

**Request:**
```json
{
  "dry_run": false
}
```

**Response:**
```json
{
  "cleanup_id": "cleanup_999",
  "status": "in_progress",
  "emails_found": 152
}
```

**Status Codes:** 202, 400, 404, 401

---

### Dashboard & Analytics Endpoints

#### GET /api/dashboard/stats
Get user dashboard statistics

**Response:**
```json
{
  "inbox_stats": {
    "total_emails": 12547,
    "unread_emails": 342,
    "folders_count": 8,
    "total_size_mb": 2340.5
  },
  "cleanup_stats": {
    "total_cleanups": 23,
    "total_emails_deleted": 4200,
    "total_storage_freed_mb": 850.3,
    "last_cleanup_at": "2026-01-25T14:30:00Z"
  },
  "efficiency": {
    "avg_cleanup_time_seconds": 22,
    "emails_per_cleanup": 183,
    "estimated_hours_saved": 4.2
  },
  "subscription": {
    "tier": "pro",
    "status": "active",
    "billing_cycle_end": "2026-02-26"
  }
}
```

**Status Codes:** 200, 401

---

#### GET /api/dashboard/cleanup-trends
Get cleanup history trends for charts

**Query Parameters:**
- `days` - Number of days to include (default 30)

**Response:**
```json
{
  "trends": [
    {
      "date": "2026-01-26",
      "cleanups_count": 2,
      "emails_deleted": 340,
      "storage_freed_mb": 62.1
    }
  ]
}
```

**Status Codes:** 200, 401

---

### Subscription & Billing Endpoints

#### GET /api/billing/plans
List available subscription plans

**Response:**
```json
{
  "plans": [
    {
      "id": "free",
      "name": "Free",
      "price_cents": 0,
      "features": ["1 cleanup per month", "basic detection"]
    },
    {
      "id": "pro",
      "name": "Pro",
      "price_cents": 999,
      "currency": "GBP",
      "billing_interval": "month",
      "features": ["unlimited cleanups", "all detection types", "scheduling"]
    }
  ]
}
```

**Status Codes:** 200

---

#### POST /api/billing/subscribe
Create or upgrade subscription

**Request:**
```json
{
  "plan_id": "pro",
  "payment_method_id": "pm_123abc"
}
```

**Response:**
```json
{
  "subscription_id": "sub_456def",
  "status": "active",
  "plan_id": "pro",
  "billing_cycle_start": "2026-01-26T00:00:00Z",
  "billing_cycle_end": "2026-02-26T00:00:00Z"
}
```

**Status Codes:** 201, 400, 402, 401

---

#### POST /api/billing/cancel
Cancel subscription

**Request:**
```json
{
  "reason": "too expensive"
}
```

**Response:**
```json
{
  "status": "cancelled",
  "cancelled_at": "2026-01-26T10:30:00Z",
  "access_until": "2026-02-26T00:00:00Z"
}
```

**Status Codes:** 200, 400, 401

---

#### GET /api/billing/invoices
List user's invoices

**Query Parameters:**
- `limit` - Results per page (default 20)

**Response:**
```json
{
  "invoices": [
    {
      "id": "inv_789ghi",
      "amount_cents": 999,
      "currency": "GBP",
      "status": "paid",
      "billing_date": "2026-01-26",
      "due_date": "2026-02-26",
      "pdf_url": "https://..."
    }
  ]
}
```

**Status Codes:** 200, 401

---

### Miscellaneous Endpoints

#### GET /api/health
Health check endpoint (no auth required)

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2026-01-26T10:30:00Z",
  "database": "connected",
  "microsoft_graph": "connected"
}
```

**Status Codes:** 200, 503

---

#### POST /api/feedback
Submit user feedback

**Request:**
```json
{
  "type": "bug|feature|general",
  "title": "Cleanup very slow",
  "message": "Cleanup took 2 minutes for 500 emails",
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "ticket_id": "ticket_123"
}
```

**Status Codes:** 201, 400

---

## FRONTEND ARCHITECTURE

### Technology Stack
- **Next.js 15** with App Router
- **React 19** with server components
- **TypeScript** strict mode
- **Tailwind CSS** + **shadcn/ui**
- **TanStack Query** for data fetching
- **React Hook Form** for forms
- **Zod** for validation

### Project Structure
```
src/
├── app/
│   ├── (auth)/                      # Auth routes
│   │   ├── login/page.tsx           # Login page
│   │   ├── callback/page.tsx        # OAuth callback
│   │   └── signup/page.tsx          # Signup/onboarding
│   ├── (dashboard)/                 # Protected routes
│   │   ├── layout.tsx               # Dashboard layout
│   │   ├── page.tsx                 # Dashboard home
│   │   ├── cleanup/
│   │   │   ├── page.tsx             # Cleanup interface
│   │   │   └── history/page.tsx     # Cleanup history
│   │   ├── rules/
│   │   │   ├── page.tsx             # Rules manager
│   │   │   └── [id]/page.tsx        # Edit rule
│   │   ├── settings/
│   │   │   ├── page.tsx             # User settings
│   │   │   ├── billing/page.tsx     # Billing
│   │   │   └── team/page.tsx        # Team management (Enterprise)
│   │   └── analytics/page.tsx       # Analytics dashboard
│   ├── api/                         # API routes
│   │   ├── auth/
│   │   │   ├── login/route.ts
│   │   │   ├── callback/route.ts
│   │   │   ├── logout/route.ts
│   │   │   └── me/route.ts
│   │   ├── cleanup/
│   │   │   ├── preview/route.ts
│   │   │   ├── execute/route.ts
│   │   │   ├── [id]/route.ts
│   │   │   ├── history/route.ts
│   │   │   └── undo/route.ts
│   │   ├── rules/
│   │   │   ├── route.ts
│   │   │   ├── [id]/route.ts
│   │   │   └── [id]/run/route.ts
│   │   ├── dashboard/
│   │   │   ├── stats/route.ts
│   │   │   └── trends/route.ts
│   │   ├── billing/
│   │   │   ├── plans/route.ts
│   │   │   ├── subscribe/route.ts
│   │   │   ├── cancel/route.ts
│   │   │   └── invoices/route.ts
│   │   ├── webhooks/
│   │   │   └── stripe/route.ts
│   │   ├── health/route.ts
│   │   └── feedback/route.ts
│   ├── layout.tsx                   # Root layout
│   └── error.tsx                    # Error boundary
├── components/
│   ├── auth/
│   │   ├── LoginButton.tsx
│   │   ├── LogoutButton.tsx
│   │   └── AuthProvider.tsx
│   ├── cleanup/
│   │   ├── CleanupForm.tsx
│   │   ├── CleanupPreview.tsx
│   │   ├── CleanupProgress.tsx
│   │   ├── CleanupHistory.tsx
│   │   └── CleanupModal.tsx
│   ├── rules/
│   │   ├── RuleForm.tsx
│   │   ├── RuleList.tsx
│   │   ├── RuleEditor.tsx
│   │   └── RuleTemplates.tsx
│   ├── dashboard/
│   │   ├── StatsCard.tsx
│   │   ├── StorageMeter.tsx
│   │   ├── TrendChart.tsx
│   │   ├── ActivityFeed.tsx
│   │   └── QuickActions.tsx
│   ├── billing/
│   │   ├── PricingTable.tsx
│   │   ├── SubscriptionStatus.tsx
│   │   ├── PaymentForm.tsx
│   │   └── InvoiceList.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx
│   │   └── MobileNav.tsx
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── Alert.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── ErrorBoundary.tsx
│   │   └── NotFound.tsx
│   └── ui/
│       ├── dialog.tsx
│       ├── form.tsx
│       ├── input.tsx
│       ├── select.tsx
│       ├── table.tsx
│       ├── tabs.tsx
│       ├── toast.tsx
│       └── ...other shadcn components
├── hooks/
│   ├── useAuth.ts
│   ├── useCleanup.ts
│   ├── useRules.ts
│   ├── useDashboard.ts
│   ├── useBilling.ts
│   └── useLocalStorage.ts
├── lib/
│   ├── api.ts                       # API client
│   ├── auth.ts                      # Auth utilities
│   ├── validation.ts                # Zod schemas
│   ├── constants.ts
│   ├── utils.ts
│   └── cn.ts                        # Tailwind classname utility
├── types/
│   ├── index.ts
│   ├── api.ts
│   ├── user.ts
│   ├── cleanup.ts
│   └── billing.ts
├── config/
│   └── site.ts                      # Site configuration
└── styles/
    ├── globals.css
    ├── variables.css
    └── animations.css
```

### Key Components

#### CleanupForm Component
```typescript
// components/cleanup/CleanupForm.tsx
interface CleanupFormProps {
  onSubmit: (data: CleanupFormData) => Promise<void>;
  isLoading?: boolean;
}

export function CleanupForm({ onSubmit, isLoading }: CleanupFormProps) {
  const form = useForm<CleanupFormData>({
    resolver: zodResolver(cleanupFormSchema),
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Cleanup type selection */}
      {/* Advanced options toggle */}
      {/* Preview button */}
      {/* Submit button */}
    </form>
  );
}
```

#### CleanupPreview Component
```typescript
// components/cleanup/CleanupPreview.tsx
interface PreviewData {
  total_found: number;
  preview_emails: Email[];
  estimated_storage_freed_mb: number;
  execution_time_estimate_seconds: number;
}

export function CleanupPreview({ data, onConfirm }: Props) {
  return (
    <div>
      {/* Show email list */}
      {/* Storage calculation */}
      {/* Confirm/Cancel buttons */}
    </div>
  );
}
```

#### Dashboard Component
```typescript
// app/(dashboard)/page.tsx
export default async function DashboardPage() {
  const session = await getSession();
  const stats = await getDashboardStats(session.user.id);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatsCard label="Total Emails" value={stats.inbox_stats.total_emails} />
      <StatsCard label="Storage Freed" value={`${stats.cleanup_stats.total_storage_freed_mb}MB`} />
      <StatsCard label="Hours Saved" value={stats.efficiency.estimated_hours_saved} />
      
      {/* Trends chart */}
      {/* Recent cleanups */}
      {/* Quick actions */}
    </div>
  );
}
```

### State Management Pattern

**TanStack Query for server state:**
```typescript
// hooks/useCleanup.ts
export function useCleanup() {
  return useMutation({
    mutationFn: async (data: CleanupRequest) => {
      const response = await api.post('/cleanup/execute', data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['cleanup-history'] });
      toast.success('Cleanup executed successfully');
    },
  });
}
```

### Form Validation Pattern

**Zod schemas for validation:**
```typescript
// lib/validation.ts
export const cleanupFormSchema = z.object({
  cleanup_type: z.enum(['bounces', 'duplicates', 'spam', 'inactive_newsletters']),
  dry_run: z.boolean().default(false),
  selected_folders: z.array(z.string()).optional(),
});
```

---

## BACKEND ARCHITECTURE

### Technology Stack
- **Next.js API Routes** for backend
- **Supabase PostgreSQL** for database
- **Upstash Redis** for job queue
- **Stripe** for payments
- **Microsoft Graph API** for email access
- **NextAuth.js** for authentication

### API Route Structure

#### Authentication Routes
```typescript
// app/api/auth/login/route.ts
export async function POST(req: Request) {
  const { redirect_uri } = await req.json();
  
  const state = generateSecureString(32);
  const auth_url = buildMicrosoftAuthUrl(redirect_uri, state);
  
  // Store state in session for verification
  
  return Response.json({ auth_url, state });
}
```

#### Cleanup Routes
```typescript
// app/api/cleanup/execute/route.ts
export async function POST(req: Request) {
  const session = await getSession();
  const { cleanup_type, dry_run } = await req.json();
  
  // Validate user subscription
  // Get user's access token
  // Queue cleanup job
  // Return cleanup ID and status
  
  return Response.json({ cleanup_id, status: 'in_progress' }, { status: 202 });
}
```

### Cleanup Engine

#### Detection Algorithm

**Bounce Detection:**
```typescript
async function detectBounceEmails(accessToken: string) {
  const bouncePatterns = [
    /mailer-daemon|postmaster|noreply.*bounce/i,
    /Mail Delivery Failed/i,
    /Undeliverable/i,
  ];
  
  const mailFolder = await getFolder(accessToken, 'Inbox');
  const emails = await getMessages(accessToken, mailFolder.id, {
    filter: "from:mailer-daemon OR from:postmaster",
  });
  
  return emails.map(email => ({
    id: email.id,
    reason: 'bounce_detected',
    confidence: 0.98,
  }));
}
```

**Duplicate Detection:**
```typescript
async function detectDuplicateEmails(accessToken: string) {
  const allEmails = await getAllMessages(accessToken);
  const emailMap = new Map();
  const duplicates = [];
  
  for (const email of allEmails) {
    const hash = hashEmail(email);
    
    if (emailMap.has(hash)) {
      duplicates.push({
        id: email.id,
        reason: 'duplicate_detected',
        duplicate_of: emailMap.get(hash),
      });
    } else {
      emailMap.set(hash, email.id);
    }
  }
  
  return duplicates;
}

function hashEmail(email: Message): string {
  const content = `${email.from}|${email.subject}|${email.receivedDateTime}`;
  return hash(content);
}
```

**Spam Detection:**
```typescript
async function detectSpamEmails(accessToken: string) {
  const emails = await getAllMessages(accessToken);
  const spamEmails = [];
  
  for (const email of emails) {
    const spamScore = calculateSpamScore(email);
    
    if (spamScore > 0.7) {
      spamEmails.push({
        id: email.id,
        reason: 'spam_detected',
        spam_score: spamScore,
      });
    }
  }
  
  return spamEmails;
}

function calculateSpamScore(email: Message): number {
  let score = 0;
  
  // Check sender reputation
  if (isBlacklisted(email.from)) score += 0.3;
  
  // Check for phishing indicators
  if (hasPhishingIndicators(email.subject)) score += 0.2;
  
  // Check for marketing language
  if (hasMarketingLanguage(email.body)) score += 0.2;
  
  // Check for suspicious links
  if (hasSuspiciousLinks(email.body)) score += 0.3;
  
  return Math.min(score, 1.0);
}
```

**Inactive Newsletter Detection:**
```typescript
async function detectInactiveNewsletters(accessToken: string) {
  const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
  const inactiveEmails = [];
  
  // Find emails from marketing/newsletter senders
  const newsletters = await getMessages(accessToken, null, {
    filter: `categories/any(c: c eq 'Newsletter' or c eq 'Marketing')`,
  });
  
  for (const email of newsletters) {
    // Check if user has opened/interacted with recent emails from sender
    const recentInteraction = await checkRecentInteraction(
      accessToken,
      email.from,
      ninetyDaysAgo
    );
    
    if (!recentInteraction) {
      inactiveEmails.push({
        id: email.id,
        reason: 'inactive_newsletter',
        last_activity: email.receivedDateTime,
      });
    }
  }
  
  return inactiveEmails;
}
```

#### Cleanup Execution

```typescript
async function executeCleanup(
  userId: string,
  cleanupType: string,
  dryRun: boolean = false
) {
  const accessToken = await getAccessToken(userId);
  
  // Get emails to clean
  let emailsToDelete = [];
  
  switch (cleanupType) {
    case 'bounces':
      emailsToDelete = await detectBounceEmails(accessToken);
      break;
    case 'duplicates':
      emailsToDelete = await detectDuplicateEmails(accessToken);
      break;
    case 'spam':
      emailsToDelete = await detectSpamEmails(accessToken);
      break;
    case 'inactive_newsletters':
      emailsToDelete = await detectInactiveNewsletters(accessToken);
      break;
  }
  
  if (dryRun) {
    return {
      emails_found: emailsToDelete.length,
      estimated_storage: calculateStorageSaved(emailsToDelete),
    };
  }
  
  // Execute deletion
  const results = await deleteEmails(accessToken, emailsToDelete);
  
  // Log in database
  await logCleanup(userId, cleanupType, results);
  
  return results;
}

async function deleteEmails(accessToken: string, emails: any[]) {
  const batchSize = 20;
  let deleted = 0;
  let failed = 0;
  
  for (let i = 0; i < emails.length; i += batchSize) {
    const batch = emails.slice(i, i + batchSize);
    
    try {
      // Use Microsoft Graph batch requests
      const results = await batchDeleteMessages(accessToken, batch);
      deleted += results.successful;
      failed += results.failed;
    } catch (error) {
      failed += batch.length;
      console.error('Batch deletion failed:', error);
    }
  }
  
  return { deleted, failed };
}
```

### Job Queue Implementation

Using Bull queue for background job processing:

```typescript
// lib/queue.ts
import Queue from 'bull';

export const cleanupQueue = new Queue('cleanup', {
  redis: {
    host: process.env.UPSTASH_REDIS_HOST,
    port: process.env.UPSTASH_REDIS_PORT,
    password: process.env.UPSTASH_REDIS_PASSWORD,
  },
});

// Process cleanup jobs
cleanupQueue.process(async (job) => {
  const { userId, cleanupType, dryRun } = job.data;
  
  // Update progress
  job.progress(10);
  
  const result = await executeCleanup(userId, cleanupType, dryRun);
  
  job.progress(100);
  
  return result;
});

// Handle failures
cleanupQueue.on('failed', async (job, err) => {
  await logFailedCleanup(job.data.userId, job.data.cleanupType, err);
});
```

### Authentication Flow (OAuth 2.0)

```typescript
// lib/auth.ts
export const authOptions = {
  providers: [
    {
      id: 'microsoft-entra',
      name: 'Microsoft Entra ID',
      type: 'oauth',
      wellKnown: 'https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration',
      clientId: process.env.MICROSOFT_CLIENT_ID,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'openid profile email offline_access Mail.ReadWrite Mail.ReadWrite.Shared User.Read',
        },
      },
      profile: async (profile) => {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    },
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
      }
      
      // Refresh token if needed
      if (Date.now() >= token.expiresAt * 1000) {
        return refreshAccessToken(token);
      }
      
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.sub;
      session.accessToken = token.accessToken;
      return session;
    },
  },
};
```

### Rate Limiting

```typescript
// middleware/rateLimit.ts
import { Ratelimit } from '@upstash/ratelimit';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 h'), // 10 requests per hour per user
});

export async function withRateLimit(userId: string, fn: () => Promise<any>) {
  const { success } = await ratelimit.limit(userId);
  
  if (!success) {
    throw new Error('Rate limit exceeded');
  }
  
  return fn();
}
```

---

## AUTHENTICATION & SECURITY

### OAuth 2.0 Flow

1. **Initiate Login**
   - User clicks "Sign in with Microsoft"
   - Frontend redirects to `/api/auth/login`

2. **Authorization Code Grant**
   - Backend generates auth URL
   - Redirects to Microsoft Entra ID login
   - User grants permissions

3. **Token Exchange**
   - Microsoft redirects to callback URL
   - Backend exchanges code for tokens
   - Stores access + refresh tokens securely

4. **Session Management**
   - JWT token issued to frontend
   - Access token stored in httpOnly cookie (secure)
   - Refresh token stored securely in database

### Token Encryption

```typescript
// lib/encryption.ts
import nacl from 'tweetnacl';
import { encodeBase64, decodeBase64 } from 'tweetnacl-util';

const encryptionKey = nacl.utils.makeKey();

export function encryptToken(token: string): string {
  const nonce = nacl.randomBytes(nacl.secretbox.nonceLength);
  const encrypted = nacl.secretbox(
    Buffer.from(token),
    nonce,
    encryptionKey
  );
  
  return encodeBase64(nonce) + ':' + encodeBase64(encrypted);
}

export function decryptToken(encrypted: string): string {
  const [nonceb64, encryptedb64] = encrypted.split(':');
  const nonce = decodeBase64(nonceb64);
  const encrypted_bytes = decodeBase64(encryptedb64);
  
  const decrypted = nacl.secretbox.open(encrypted_bytes, nonce, encryptionKey);
  return Buffer.from(decrypted).toString();
}
```

### Data Security

- **Encryption at Rest:** Database encryption via Supabase
- **Encryption in Transit:** TLS 1.3 for all connections
- **Token Storage:** httpOnly, Secure, SameSite cookies
- **CORS:** Whitelist allowed origins only
- **CSRF Protection:** Double-submit cookie pattern
- **SQL Injection:** Parameterized queries (Supabase client)
- **XSS Protection:** Content Security Policy headers

### Permissions & Access Control

```typescript
// middleware/auth.ts
export async function withAuth(handler: Handler) {
  return async (req: Request) => {
    const session = await getSession();
    
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    return handler(req, session);
  };
}

export async function withSubscription(tier: string) {
  return async (handler: Handler) => {
    return withAuth(async (req, session) => {
      const user = await getUser(session.user.id);
      
      if (!hasAccess(user.tier, tier)) {
        return Response.json({ error: 'Forbidden' }, { status: 403 });
      }
      
      return handler(req, session);
    });
  };
}
```

---

## CLEANUP ENGINE

### Email Detection Algorithm

**Bounce Detection Confidence:** 95%+ accuracy
```
- Pattern matching: from, subject, body
- Scoring: 0.0-1.0 confidence score
- Threshold: >0.85 = delete
```

**Duplicate Detection:** 99%+ accuracy
```
- Hash-based comparison
- Body similarity analysis
- Sender + subject + date matching
```

**Spam Detection:** 85%+ accuracy
```
- Blacklist checking
- Phishing indicators
- Marketing language patterns
- Link analysis
- Sender reputation
```

**Inactive Newsletter:** 90%+ accuracy
```
- Category-based identification
- Last interaction date analysis
- Unsubscribe link checking
```

### Cleanup Phases

1. **Detection Phase** (5-30 seconds)
   - Query emails from server
   - Apply detection algorithms
   - Cache results

2. **Preview Phase** (1-2 seconds)
   - Return sample of emails
   - Show statistics
   - Get user confirmation

3. **Deletion Phase** (10-60 seconds)
   - Batch delete via Graph API
   - Handle failures gracefully
   - Log results

4. **Recovery Phase** (optional)
   - Store deleted email metadata
   - Allow 30-day recovery window
   - Soft-delete initially

---

## DEPLOYMENT GUIDE

### Prerequisites
- GitHub account
- Vercel account
- Supabase account
- Microsoft Entra ID tenant
- Stripe account (for payments)

### 1. Environment Setup

**Create `.env.local`:**
```bash
# Database
DATABASE_URL=postgresql://...
SUPABASE_URL=https://...
SUPABASE_ANON_KEY=...

# Authentication
MICROSOFT_CLIENT_ID=...
MICROSOFT_CLIENT_SECRET=...
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=... (generate with: openssl rand -base64 32)

# Microsoft Graph
MICROSOFT_API_TENANT_ID=...

# Payments
STRIPE_PUBLIC_KEY=...
STRIPE_SECRET_KEY=...
STRIPE_WEBHOOK_SECRET=...

# Job Queue
UPSTASH_REDIS_HOST=...
UPSTASH_REDIS_PORT=...
UPSTASH_REDIS_PASSWORD=...

# Monitoring
SENTRY_DSN=...
SENTRY_ENVIRONMENT=production

# Email
SENDGRID_API_KEY=... (or RESEND_API_KEY)
```

### 2. Database Setup

```bash
# Create Supabase project
# Run migrations
supabase migration up

# Enable Row Level Security
# Create RLS policies for users
```

### 3. Microsoft Entra ID Configuration

1. Register application in Azure AD
2. Create client secret
3. Add redirect URIs:
   - `https://your-domain.com/api/auth/callback/microsoft-entra`
4. Grant permissions:
   - Mail.ReadWrite
   - Mail.ReadWrite.Shared
   - User.Read
   - offline_access

### 4. Stripe Setup

1. Create Stripe account
2. Create products:
   - Free tier (no product)
   - Pro tier (£9.99/month)
   - Enterprise tier (custom)
3. Configure webhook:
   - URL: `https://your-domain.com/api/webhooks/stripe`
   - Events: customer.subscription.updated, invoice.payment_failed

### 5. Deployment to Vercel

```bash
# Create Vercel project
vercel link

# Set environment variables
vercel env pull

# Deploy
vercel deploy --prod
```

### 6. Production Checklist

- [ ] Verify all environment variables
- [ ] Test OAuth flow end-to-end
- [ ] Verify database connectivity
- [ ] Test payment flow with test card
- [ ] Configure custom domain
- [ ] Enable CORS headers
- [ ] Set security headers
- [ ] Configure monitoring/alerts
- [ ] Backup database
- [ ] Create support email
- [ ] Verify email notifications
- [ ] Load test API endpoints
- [ ] Security audit

---

## TESTING STRATEGY

### Unit Tests

**Example: Bounce Detection**
```typescript
describe('detectBounceEmails', () => {
  it('should detect bounce emails from mailer-daemon', async () => {
    const emails = await detectBounceEmails(mockAccessToken);
    expect(emails.length).toBeGreaterThan(0);
    expect(emails[0].reason).toBe('bounce_detected');
  });
});
```

### Integration Tests

**Example: Cleanup Flow**
```typescript
describe('Cleanup Flow', () => {
  it('should execute full cleanup with preview', async () => {
    // Create test user
    // Get preview
    // Execute cleanup
    // Verify emails deleted
    // Check audit log
  });
});
```

### E2E Tests

**Using Playwright:**
```typescript
test('user can cleanup bounces', async ({ page }) => {
  // Login
  // Navigate to cleanup
  // Select bounce type
  // Get preview
  // Execute
  // Verify success message
});
```

### Performance Tests

- API response time: <500ms (p95)
- Cleanup execution: <2min for 500 emails
- Page load time: <2s
- Database query time: <100ms

---

## SUCCESS METRICS

### User Adoption
- **Metric:** Monthly Active Users (MAU)
- **Target:** 5,000 MAU by month 12

### Engagement
- **Metric:** Cleanups per user per month
- **Target:** 2 cleanups/month average

### Revenue
- **Metric:** Monthly Recurring Revenue (MRR)
- **Target:** £5,000 MRR by month 12

### Retention
- **Metric:** Monthly Churn Rate
- **Target:** <5% monthly churn for Pro tier

### Product Quality
- **Metric:** Uptime
- **Target:** 99.95% uptime SLA

- **Metric:** Email deletion accuracy
- **Target:** 0.1% false positive rate (wrong emails deleted)

- **Metric:** Bug resolution time
- **Target:** <24 hours for critical bugs

---

## APPENDIX

### Helpful Commands

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Format code
npm run format

# Lint code
npm run lint

# Database migrations
supabase migration up

# Seed database
npm run seed
```

### Resources

- [Microsoft Graph API Docs](https://docs.microsoft.com/graph)
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Stripe API Reference](https://stripe.com/docs/api)
- [NextAuth.js Documentation](https://next-auth.js.org)

### Support Contacts

For development questions:
- GitHub Issues: [repository-url]
- Email: support@inboxclean.app
- Slack: [workspace-url]

---

**End of Build Specification**

Document Version: 1.0
Last Updated: January 26, 2026
Ready for Development: ✅
