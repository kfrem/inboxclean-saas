# QUICK START GUIDE FOR DEVELOPERS

**Version:** 1.0  
**Last Updated:** January 26, 2026  
**Estimated Setup Time:** 30-60 minutes  
**First Coding Session:** 2-4 hours

---

## 🚀 FIVE-MINUTE SETUP CHECKLIST

Before diving into code:

- [ ] **1 min** - Fork GitHub repository
- [ ] **1 min** - Clone to local machine
- [ ] **1 min** - Copy `.env.example` → `.env.local`
- [ ] **1 min** - Run `npm install`
- [ ] **1 min** - Run `npm run dev`
- [ ] **Visit** http://localhost:3000

**Done?** You should see the app running locally!

---

## 📋 FIRST DAY DEVELOPER SETUP

### Step 1: Clone Repository (5 min)

```bash
# Clone the repo
git clone https://github.com/your-username/inboxclean.git
cd inboxclean

# Install dependencies
npm install
# or
pnpm install
```

### Step 2: Create Development Environment (10 min)

```bash
# Copy example env file
cp .env.example .env.local

# Create Supabase project
# 1. Go to https://supabase.com
# 2. Create new project
# 3. Copy credentials to .env.local
```

**Minimum `.env.local` for development:**
```bash
# Database (from Supabase)
DATABASE_URL=postgresql://[user]:[password]@[host]:5432/[database]
SUPABASE_URL=https://[project].supabase.co
SUPABASE_ANON_KEY=[your-key]

# Auth (temporary - mock values ok for MVP)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=dev-secret-key-change-in-production

# Microsoft (optional for MVP - use mock data)
MICROSOFT_CLIENT_ID=mock-client-id
MICROSOFT_CLIENT_SECRET=mock-client-secret

# Job Queue (optional for MVP)
UPSTASH_REDIS_URL=redis://localhost:6379
```

### Step 3: Setup Database (10 min)

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref [your-project-ref]

# Run migrations
supabase migration up

# Or manually create tables using schema from BUILD_SPEC.md
```

### Step 4: Start Development Server (5 min)

```bash
# Start Next.js dev server
npm run dev

# Visit http://localhost:3000
# You should see the landing page
```

### Step 5: Verify Setup (5 min)

- [ ] Visit http://localhost:3000 - see landing page
- [ ] Check console for errors - should be clean
- [ ] Verify database connection - check in Supabase dashboard
- [ ] Test API health endpoint: http://localhost:3000/api/health

**Stuck?** See [Troubleshooting](#troubleshooting) section below.

---

## 📁 PROJECT FOLDER STRUCTURE EXPLAINED

### Core Directories

```
src/
├── app/
│   ├── (auth)/              ← Login, signup, auth pages
│   │   ├── login/page.tsx   ← Microsoft login page
│   │   ├── callback/page.ts ← OAuth callback handler
│   │   └── signup/page.tsx  ← User onboarding
│   │
│   ├── (dashboard)/         ← Protected user pages (require login)
│   │   ├── page.tsx         ← Main dashboard/home
│   │   ├── cleanup/page.tsx ← Cleanup interface (MAIN FEATURE)
│   │   ├── rules/page.tsx   ← Rule manager
│   │   └── settings/page.tsx ← User settings/billing
│   │
│   ├── api/                 ← Backend API routes
│   │   ├── auth/            ← Authentication endpoints
│   │   ├── cleanup/         ← Cleanup engine endpoints
│   │   ├── rules/           ← Rule management endpoints
│   │   └── webhooks/        ← Stripe/external webhooks
│   │
│   └── layout.tsx           ← Root layout
│
├── components/              ← Reusable React components
│   ├── cleanup/             ← Cleanup feature components
│   ├── rules/               ← Rules feature components
│   ├── dashboard/           ← Dashboard components
│   ├── layout/              ← Header, sidebar, nav
│   └── common/              ← Buttons, modals, etc.
│
├── lib/                     ← Utility functions
│   ├── api.ts               ← API client helpers
│   ├── auth.ts              ← Auth utilities
│   └── validation.ts        ← Form validation schemas
│
├── hooks/                   ← Custom React hooks
│   ├── useAuth.ts           ← Auth hook
│   ├── useCleanup.ts        ← Cleanup hook
│   └── useDashboard.ts      ← Dashboard data hook
│
└── types/                   ← TypeScript types
    └── index.ts             ← Shared types
```

### Key Files to Know

| File | Purpose | Edit Frequency |
|------|---------|-----------------|
| `app/(dashboard)/cleanup/page.tsx` | Main cleanup UI | Frequently |
| `app/api/cleanup/execute/route.ts` | Cleanup engine | Frequently |
| `components/cleanup/CleanupForm.tsx` | Cleanup form UI | Frequently |
| `lib/validation.ts` | Form validation rules | Sometimes |
| `next.config.js` | Next.js configuration | Rarely |
| `.env.local` | Environment variables | Setup only |

---

## 🔑 KEY FILES TO UNDERSTAND FIRST

### 1. Authentication (`app/api/auth/callback/route.ts`)
**What it does:** Handles Microsoft OAuth callback  
**Why understand it:** Login flow is critical  
**What to know:**
- Exchanges auth code for access tokens
- Creates/updates user in database
- Starts user session

**Status:** ✅ Mostly complete in template

### 2. Cleanup Engine (`app/api/cleanup/execute/route.ts`)
**What it does:** Main email cleanup logic  
**Why understand it:** Core business logic  
**What to know:**
- Queries emails from Microsoft Graph API
- Detects bounce/spam/duplicate emails
- Deletes matching emails
- Logs results to database

**Status:** 🔨 Needs implementation - See [Phase 1 Tasks](#phase-1-tasks)

### 3. Frontend Cleanup Form (`components/cleanup/CleanupForm.tsx`)
**What it does:** User interface for cleanup  
**Why understand it:** Users interact with this  
**What to know:**
- Form validation with React Hook Form
- Sends data to cleanup API
- Shows loading state
- Handles errors

**Status:** 🔨 Needs implementation - See [Phase 1 Tasks](#phase-1-tasks)

### 4. Database Schema (`lib/db/schema.ts`)
**What it does:** Database table definitions  
**Why understand it:** All data flows through this  
**What to know:**
- 10 tables for complete app
- User, subscription, cleanup history, rules
- Relationships between tables

**Status:** 📋 Ready to implement - Reference BUILD_SPEC.md

### 5. API Routes Structure (`app/api/`)
**What it does:** All backend endpoints  
**Why understand it:** Build new features here  
**What to know:**
- Pattern: `app/api/[feature]/[action]/route.ts`
- Each route needs authentication
- Returns JSON responses

**Status:** ✅ Structure ready, needs endpoints

---

## 📅 FOUR-PHASE DEVELOPMENT TIMELINE

### Phase 1: MVP (Weeks 1-4)
**Goal:** Get core features working, deploy to production

**Tasks:**
- [ ] Authentication flow
- [ ] Basic cleanup detection
- [ ] Dashboard with stats
- [ ] Cleanup history
- [ ] Undo functionality
- [ ] Basic error handling

**Deliverable:** Live app users can login and cleanup bounces

**Estimated Hours:** 40-50 hours

---

### Phase 2: Enhanced Features (Weeks 5-8)
**Goal:** Add advanced features for retention

**Tasks:**
- [ ] Duplicate detection
- [ ] Spam detection
- [ ] Custom rules engine
- [ ] Scheduled cleanup
- [ ] Advanced dashboard
- [ ] Email categories

**Deliverable:** Power users have advanced options

**Estimated Hours:** 30-40 hours

---

### Phase 3: Monetization (Weeks 9-12)
**Goal:** Start generating revenue

**Tasks:**
- [ ] Stripe integration
- [ ] Payment processing
- [ ] Billing dashboard
- [ ] Audit logging
- [ ] Team management
- [ ] Public API
- [ ] UI polish

**Deliverable:** Free and paid tiers both working

**Estimated Hours:** 25-35 hours

---

### Phase 4: Launch (Weeks 13-16)
**Goal:** Production hardening and go live

**Tasks:**
- [ ] Security audit
- [ ] Performance testing
- [ ] Monitoring setup
- [ ] Documentation
- [ ] Marketing materials
- [ ] Customer support setup

**Deliverable:** Production-ready system, public launch

**Estimated Hours:** 20-25 hours

---

## 💻 COMMON DEVELOPMENT TASKS

### Task 1: Add a New Cleanup Detection Type

**Scenario:** You want to add "large email" detection

**Steps:**

1. **Add detection function** (`lib/cleanup-engine.ts`)
```typescript
async function detectLargeEmails(accessToken: string) {
  const emails = await getAllMessages(accessToken);
  const largeEmails = [];
  
  for (const email of emails) {
    if (email.size > 10 * 1024 * 1024) { // > 10MB
      largeEmails.push({
        id: email.id,
        reason: 'large_email',
        size_mb: email.size / 1024 / 1024,
      });
    }
  }
  
  return largeEmails;
}
```

2. **Update cleanup endpoint** (`app/api/cleanup/execute/route.ts`)
```typescript
case 'large_emails':
  emailsToDelete = await detectLargeEmails(accessToken);
  break;
```

3. **Update form validation** (`lib/validation.ts`)
```typescript
cleanup_type: z.enum([
  'bounces',
  'duplicates',
  'spam',
  'inactive_newsletters',
  'large_emails', // ← ADD THIS
])
```

4. **Test it**
```bash
npm test -- cleanup.test.ts
```

---

### Task 2: Fix a Bug in Cleanup

**Scenario:** Cleanup is too slow (taking 5 minutes for 500 emails)

**Diagnosis Steps:**

1. **Check error logs**
```bash
# View Sentry errors (or local logs)
console.log('Cleanup started for', emailCount, 'emails');
```

2. **Identify bottleneck**
```typescript
// Check if it's the detection or deletion phase
const start = Date.now();
const emailsToDelete = await detectBounces(accessToken); // Measure this
console.log('Detection took', Date.now() - start, 'ms');

const start2 = Date.now();
const results = await deleteEmails(accessToken, emailsToDelete); // Measure this
console.log('Deletion took', Date.now() - start2, 'ms');
```

3. **Optimize**
```typescript
// If detection is slow - add pagination
// If deletion is slow - batch requests better
const batchSize = 50; // Try larger batches

// If API is slow - add caching
const cache = new Map();
```

4. **Test fix**
```bash
npm run dev
# Test with similar email count
# Measure time again
```

---

### Task 3: Add Error Handling

**Scenario:** Cleanup throws error "Access token expired"

**Solution:**

1. **Add try-catch**
```typescript
try {
  const result = await executeCleanup(userId, cleanupType, dryRun);
  return Response.json(result);
} catch (error) {
  if (error.message.includes('token expired')) {
    // Refresh token and retry
    await refreshAccessToken(userId);
    return executeCleanup(userId, cleanupType, dryRun);
  }
  
  return Response.json(
    { error: 'Cleanup failed: ' + error.message },
    { status: 500 }
  );
}
```

2. **Log error for debugging**
```typescript
import Sentry from '@sentry/nextjs';

catch (error) {
  Sentry.captureException(error, {
    tags: {
      feature: 'cleanup',
      cleanup_type: cleanupType,
    },
  });
}
```

3. **Show user-friendly message**
```typescript
// On frontend (hooks/useCleanup.ts)
onError: (error) => {
  toast.error('Cleanup failed. Please try again or contact support.');
  console.error('Cleanup error:', error); // For debugging
}
```

---

### Task 4: Create a New Dashboard Stat

**Scenario:** Add "Storage Freed This Month" stat to dashboard

**Steps:**

1. **Add database query** (`lib/db.ts`)
```typescript
async function getStorageFreedThisMonth(userId: string) {
  const result = await db
    .from('cleanup_history')
    .select('storage_freed_mb')
    .eq('user_id', userId)
    .gte('created_at', getMonthStart())
    .lte('created_at', new Date());
  
  return result.data.reduce((sum, r) => sum + r.storage_freed_mb, 0);
}
```

2. **Add API endpoint** (`app/api/dashboard/stats/route.ts`)
```typescript
const storageThisMonth = await getStorageFreedThisMonth(userId);

return Response.json({
  ...existingStats,
  storage_freed_this_month_mb: storageThisMonth,
});
```

3. **Update frontend** (`components/dashboard/StatsCard.tsx`)
```typescript
<StatsCard
  label="Storage Freed This Month"
  value={`${stats.storage_freed_this_month_mb}MB`}
  icon={<SaveIcon />}
/>
```

4. **Test**
```bash
npm run dev
# Visit dashboard
# Should see new stat
```

---

## 🧪 TESTING GUIDELINES

### Running Tests

```bash
# Run all tests
npm test

# Run specific file
npm test -- cleanup.test.ts

# Run with coverage
npm test -- --coverage

# Watch mode (re-run on changes)
npm test -- --watch
```

### Writing a Simple Test

```typescript
// components/cleanup/CleanupForm.test.tsx
import { render, screen, userEvent } from '@testing-library/react';
import { CleanupForm } from './CleanupForm';

describe('CleanupForm', () => {
  it('submits form with selected cleanup type', async () => {
    const onSubmit = jest.fn();
    
    render(<CleanupForm onSubmit={onSubmit} />);
    
    // Select cleanup type
    const select = screen.getByDisplayValue('Select cleanup type');
    await userEvent.selectOption(select, 'bounces');
    
    // Click submit
    const button = screen.getByText('Preview Cleanup');
    await userEvent.click(button);
    
    // Verify submission
    expect(onSubmit).toHaveBeenCalledWith({
      cleanup_type: 'bounces',
    });
  });
});
```

### Testing an API Route

```typescript
// app/api/cleanup/execute/route.test.ts
import { POST } from './route';

describe('POST /api/cleanup/execute', () => {
  it('returns cleanup_id when successful', async () => {
    const req = new Request('http://localhost:3000/api/cleanup/execute', {
      method: 'POST',
      body: JSON.stringify({
        cleanup_type: 'bounces',
      }),
    });
    
    const response = await POST(req);
    const data = await response.json();
    
    expect(response.status).toBe(202);
    expect(data.cleanup_id).toBeDefined();
    expect(data.status).toBe('in_progress');
  });
});
```

---

## 🐛 MONITORING & DEBUGGING

### Local Debugging

```bash
# Enable detailed logging
DEBUG=* npm run dev

# Use VS Code debugger
# Set breakpoint (click line number)
# F5 to start debugging
# Step through code

# Check specific component
# React DevTools (browser extension)
```

### Production Debugging

```bash
# Check Sentry for errors
# https://sentry.io/[organization]/[project]/

# Check Vercel logs
# https://vercel.com → Project → Deployments

# Check database
# Supabase Dashboard → Query Editor
SELECT * FROM cleanup_history WHERE user_id = '...' LIMIT 10;
```

### Common Error Messages

| Error | Cause | Fix |
|-------|-------|-----|
| "Access token expired" | MS auth token old | Implement token refresh |
| "Rate limit exceeded" | Too many API calls | Add delays, batch requests |
| "CORS error" | Frontend can't reach API | Check API endpoint URL |
| "Database connection failed" | Bad DATABASE_URL | Verify env vars, IP whitelist |
| "Page not found" | Route doesn't exist | Check file path and naming |

---

## ⚡ PERFORMANCE OPTIMIZATION TIPS

### Frontend Performance

```typescript
// ❌ SLOW - Re-renders every keystroke
export function CleanupForm() {
  const [data, setData] = useState(initialData);
  return <input onChange={(e) => setData(e.target.value)} />;
}

// ✅ FAST - Uses React Hook Form
export function CleanupForm() {
  const form = useForm();
  return <input {...form.register('cleanup_type')} />;
}
```

### API Performance

```typescript
// ❌ SLOW - Gets all emails, then filters
async function detectBounces() {
  const allEmails = await getAllEmails(); // Thousands of calls
  return allEmails.filter(/* ... */);
}

// ✅ FAST - Filters at source
async function detectBounces() {
  const bounceEmails = await getMessages(accessToken, {
    filter: "from:mailer-daemon"
  });
  return bounceEmails;
}
```

### Database Performance

```typescript
// ❌ SLOW - N+1 query problem
const users = await db.from('users').select();
for (const user of users) {
  const cleanups = await db
    .from('cleanup_history')
    .select()
    .eq('user_id', user.id); // Query per user!
}

// ✅ FAST - Single join query
const users = await db
  .from('users')
  .select('*, cleanup_history(*)');
```

---

## 🚨 ERROR SCENARIO HANDLING

### Scenario 1: User Runs Out of Quota

**What happens:** Microsoft Graph API returns 429 (rate limited)

**How to handle:**
```typescript
if (response.status === 429) {
  const retryAfter = response.headers.get('Retry-After');
  
  // Wait and retry
  await sleep(parseInt(retryAfter) * 1000);
  return executeCleanup(userId, cleanupType, dryRun); // Retry
}
```

---

### Scenario 2: Database Goes Down

**What happens:** Supabase unavailable during cleanup

**How to handle:**
```typescript
// Queue the cleanup job
const jobId = await cleanupQueue.add({
  userId,
  cleanupType,
  dryRun,
});

// Return job ID to frontend
return Response.json({ 
  cleanup_id: jobId, 
  status: 'queued' 
}, { status: 202 });

// Job will retry automatically
```

---

### Scenario 3: User Cancels During Cleanup

**What happens:** Frontend closes before cleanup completes

**How to handle:**
```typescript
// Store cleanup state
const cleanup = await db.from('cleanup_history').insert({
  user_id: userId,
  status: 'in_progress',
  // ...
});

// If user closes browser, cleanup continues in background
// Frontend can check status via polling
setInterval(() => {
  checkCleanupStatus(cleanupId);
}, 5000);
```

---

## 📦 DEPLOYMENT CHECKLIST

### Before Pushing to Main Branch

- [ ] Run tests: `npm test`
- [ ] Check linting: `npm run lint`
- [ ] Build successfully: `npm run build`
- [ ] Test in production mode: `npm start`
- [ ] No console errors or warnings
- [ ] Try all affected features manually
- [ ] Update any related documentation

### Deployment Process

```bash
# 1. Push to GitHub
git add .
git commit -m "Feature: add large email detection"
git push origin feature/large-email-detection

# 2. Create Pull Request
# → Go to GitHub, create PR
# → Add description of changes
# → Wait for CI checks to pass

# 3. Merge to Main
# → GitHub Actions will run tests
# → If pass, merge to main
# → Vercel will auto-deploy

# 4. Monitor Deployment
# → Check Vercel dashboard
# → Monitor Sentry for errors
# → Check user feedback
```

### Post-Deployment

- [ ] Verify features work in production
- [ ] Check database migrations ran
- [ ] Monitor error rates (Sentry)
- [ ] Check performance (Vercel Analytics)
- [ ] Get stakeholder approval
- [ ] Update release notes

---

## ❓ TROUBLESHOOTING

### Problem: "npm install" fails

**Solution:**
```bash
# Clear cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules

# Reinstall
npm install

# Or use pnpm (faster)
pnpm install
```

---

### Problem: Database connection error

**Solution:**
```bash
# Check env variables
echo $DATABASE_URL

# Test connection
psql $DATABASE_URL -c "SELECT 1"

# Re-copy from Supabase
# → Supabase Dashboard
# → Project → Settings → Database
# → Copy connection string to .env.local
```

---

### Problem: OAuth login not working

**Solution:**
```bash
# Check environment variables
echo $MICROSOFT_CLIENT_ID
echo $NEXTAUTH_URL

# Verify Microsoft app registration
# → Azure AD Portal
# → App Registrations
# → Check Redirect URIs include: http://localhost:3000/api/auth/callback

# Check logs for error message
# → Browser DevTools
# → Network tab
# → See exact error from API
```

---

### Problem: API returns 401 Unauthorized

**Solution:**
```typescript
// Check if user is authenticated
console.log(session); // Should have user info

// Check if access token is valid
console.log(session?.accessToken);

// Verify token isn't expired
const expiresAt = session?.expiresAt;
if (Date.now() >= expiresAt * 1000) {
  // Token expired, needs refresh
}
```

---

### Problem: Cleanup is very slow

**Solution:**

1. Check which phase is slow (detection vs deletion)
2. Add console timing
3. Check Microsoft Graph API quota
4. Reduce batch size if hitting limits
5. See [Performance Optimization](#-performance-optimization-tips) section

---

## 📚 HELPFUL RESOURCES

### Official Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Microsoft Graph API](https://docs.microsoft.com/graph)

### Tutorials & Guides
- Next.js App Router Guide: https://nextjs.org/docs/app
- React Hook Form: https://react-hook-form.com
- Tailwind CSS: https://tailwindcss.com/docs
- Supabase Auth: https://supabase.com/docs/guides/auth

### Tools
- **VS Code Extensions:**
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense
  - Prettier - Code formatter
  - Thunder Client (API testing)

- **Online Tools:**
  - [Postman](https://www.postman.com) - API testing
  - [dbdiagram.io](https://dbdiagram.io) - Database visualizer
  - [JSON Formatter](https://jsonformatter.org) - Validate JSON

---

## 🤝 GETTING HELP

### When Stuck on Code

1. **Read the error message carefully** - it usually says what's wrong
2. **Google the error** - add "next.js" or "react" to search
3. **Check existing issues** - GitHub Issues might have solution
4. **Ask in Discord** - Next.js Discord community is helpful
5. **Check documentation** - API docs are usually comprehensive

### Common Questions

**Q: Where do I add a new page?**  
A: Create file in `src/app/[route]/page.tsx`

**Q: How do I fetch data from the API?**  
A: Use `useQuery` from TanStack Query

**Q: How do I style a component?**  
A: Use Tailwind classes: `<div className="bg-blue-500 text-white">`

**Q: How do I add authentication?**  
A: Use `getSession()` from NextAuth

**Q: How do I test my code?**  
A: Create `.test.ts` file, use Jest + React Testing Library

---

## 📞 PROJECT CONTACTS

| Role | Contact | Availability |
|------|---------|--------------|
| Developer Support | support@inboxclean.app | Weekdays 9-5 |
| Emergency Issues | emergency@inboxclean.app | 24/7 |
| Architecture Questions | arch@inboxclean.app | Weekdays 10-4 |

---

**You're ready to start building! 🎉**

Start with Phase 1, build one feature at a time, and reference the BUILD_SPEC.md when you need detailed specifications.

Questions? See [Troubleshooting](#troubleshooting) or reach out to the team.

Happy coding! ✨
