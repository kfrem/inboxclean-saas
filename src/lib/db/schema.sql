-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  avatar_url TEXT,
  microsoft_id VARCHAR(255) UNIQUE NOT NULL,
  microsoft_email VARCHAR(255) NOT NULL,
  tier VARCHAR(50) DEFAULT 'free',
  subscription_id VARCHAR(255),
  status VARCHAR(50) DEFAULT 'active',
  last_cleanup_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  stripe_subscription_id VARCHAR(255) UNIQUE,
  stripe_customer_id VARCHAR(255),
  plan_id VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL,
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

-- Create cleanup_history table
CREATE TABLE IF NOT EXISTS cleanup_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  cleanup_type VARCHAR(50) NOT NULL,
  status VARCHAR(50) DEFAULT 'completed',
  emails_found INTEGER,
  emails_deleted INTEGER,
  emails_failed INTEGER,
  storage_freed_mb DECIMAL(10, 2),
  execution_time_seconds INTEGER,
  error_message TEXT,
  preview_tokens TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create cleanup_rules table
CREATE TABLE IF NOT EXISTS cleanup_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  rule_type VARCHAR(50) NOT NULL,
  conditions JSONB NOT NULL,
  actions JSONB NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  run_schedule VARCHAR(50),
  last_run_at TIMESTAMP,
  next_run_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create email_cache table
CREATE TABLE IF NOT EXISTS email_cache (
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

-- Create audit_log table
CREATE TABLE IF NOT EXISTS audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  action VARCHAR(100) NOT NULL,
  resource_type VARCHAR(50),
  resource_id VARCHAR(255),
  changes JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create api_keys table
CREATE TABLE IF NOT EXISTS api_keys (
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

-- Create access_tokens table
CREATE TABLE IF NOT EXISTS access_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  microsoft_access_token TEXT NOT NULL,
  microsoft_refresh_token TEXT NOT NULL,
  token_expires_at TIMESTAMP NOT NULL,
  scopes TEXT[] NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  data JSONB,
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create recovery_bin table
CREATE TABLE IF NOT EXISTS recovery_bin (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  cleanup_history_id UUID REFERENCES cleanup_history(id) ON DELETE CASCADE,
  message_id VARCHAR(255) NOT NULL,
  from_address VARCHAR(255),
  subject TEXT,
  received_date TIMESTAMP,
  folder_original VARCHAR(255),
  message_json JSONB,
  deleted_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP DEFAULT (NOW() + INTERVAL '30 days')
);

-- Create indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_microsoft_id ON users(microsoft_id);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_stripe_subscription_id ON subscriptions(stripe_subscription_id);
CREATE INDEX idx_cleanup_history_user_id ON cleanup_history(user_id);
CREATE INDEX idx_cleanup_history_created_at ON cleanup_history(created_at DESC);
CREATE INDEX idx_cleanup_rules_user_id ON cleanup_rules(user_id);
CREATE INDEX idx_cleanup_rules_is_active ON cleanup_rules(is_active);
CREATE INDEX idx_email_cache_user_id ON email_cache(user_id);
CREATE INDEX idx_email_cache_expires_at ON email_cache(expires_at);
CREATE INDEX idx_audit_log_user_id ON audit_log(user_id);
CREATE INDEX idx_audit_log_action ON audit_log(action);
CREATE INDEX idx_api_keys_user_id ON api_keys(user_id);
CREATE INDEX idx_access_tokens_user_id ON access_tokens(user_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_recovery_bin_user_id ON recovery_bin(user_id);
CREATE INDEX idx_recovery_bin_expires_at ON recovery_bin(expires_at);

-- Enable RLS policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE cleanup_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE cleanup_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE access_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE recovery_bin ENABLE ROW LEVEL SECURITY;
