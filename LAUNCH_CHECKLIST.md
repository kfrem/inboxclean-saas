# 🚀 MVP Launch Checklist

## Pre-Launch Setup (Do These First)

### External Services
- [ ] **Supabase Project**
  - [ ] Create project at supabase.com
  - [ ] Copy Project URL and API keys
  - [ ] Run SQL schema from `src/lib/db/schema.sql`
  - [ ] Create OAuth app integration

- [ ] **Microsoft Azure AD**
  - [ ] Register application at portal.azure.com
  - [ ] Copy Client ID
  - [ ] Create Client Secret
  - [ ] Copy Tenant ID
  - [ ] Add redirect URLs:
    - Dev: `http://localhost:3000/api/auth/callback/azure-ad`
    - Prod: `https://yourdomain.com/api/auth/callback/azure-ad`

- [ ] **Generate Secrets**
  - [ ] Run `openssl rand -base64 32` for NEXTAUTH_SECRET
  - [ ] Generate a secure string for database encryption

### Local Environment
- [ ] Create `.env.local` file in root with:
  ```
  NEXTAUTH_SECRET=<your-generated-secret>
  NEXTAUTH_URL=http://localhost:3000
  AZURE_AD_CLIENT_ID=<from-azure>
  AZURE_AD_CLIENT_SECRET=<from-azure>
  AZURE_AD_TENANT_ID=<from-azure>
  DATABASE_URL=<from-supabase>
  NEXT_PUBLIC_SUPABASE_URL=<from-supabase>
  NEXT_PUBLIC_SUPABASE_ANON_KEY=<from-supabase>
  ```

- [ ] Run `npm install`
- [ ] Verify TypeScript compiles: `npm run type-check`
- [ ] Run dev server: `npm run dev`

### Database
- [ ] Log into Supabase console
- [ ] Go to SQL Editor
- [ ] Copy entire contents of `src/lib/db/schema.sql`
- [ ] Paste and execute
- [ ] Verify all 10 tables created:
  - users
  - subscriptions
  - cleanup_history
  - cleanup_rules
  - email_cache
  - audit_log
  - api_keys
  - access_tokens
  - notifications
  - recovery_bin

- [ ] Enable Row Level Security (RLS) on tables:
  - [ ] Run RLS setup script (if included)
  - [ ] Or manually enable per table

### Testing Locally
- [ ] Start dev server: `npm run dev`
- [ ] Visit http://localhost:3000
- [ ] [ ] Click "Sign In"
- [ ] [ ] Authenticate with Microsoft account
- [ ] [ ] Should redirect to dashboard
- [ ] [ ] Dashboard loads stats
- [ ] [ ] Can see cleanup form
- [ ] [ ] Select cleanup type
- [ ] [ ] Click "Preview Cleanup" (may return demo data)
- [ ] [ ] See preview results
- [ ] [ ] View cleanup history page
- [ ] [ ] Check TypeScript errors: `npm run type-check`
- [ ] [ ] Check linting: `npm run lint`

## Production Deployment

### Prepare Repository
- [ ] Create GitHub repository
- [ ] Push code to GitHub
- [ ] Create `.env.production` with prod credentials

### Vercel Deployment
- [ ] Create Vercel account
- [ ] Import GitHub repository into Vercel
- [ ] Configure environment variables in Vercel:
  - NEXTAUTH_SECRET
  - NEXTAUTH_URL=https://your-domain.com
  - AZURE_AD_CLIENT_ID
  - AZURE_AD_CLIENT_SECRET
  - AZURE_AD_TENANT_ID
  - DATABASE_URL
  - NEXT_PUBLIC_SUPABASE_URL
  - NEXT_PUBLIC_SUPABASE_ANON_KEY

- [ ] Update Azure AD redirect URI to prod domain
- [ ] Deploy to Vercel
- [ ] Test production deployment

### Custom Domain
- [ ] Purchase domain (optional)
- [ ] Configure DNS with Vercel instructions
- [ ] Enable HTTPS
- [ ] Test with custom domain

## Feature Testing

### Authentication Flow
- [ ] Login with Microsoft
- [ ] Logout works
- [ ] Session persists on page refresh
- [ ] Protected routes redirect to login
- [ ] Credentials stored securely

### Dashboard
- [ ] Stats load correctly
- [ ] Numbers are reasonable
- [ ] Loading states work

### Cleanup Workflow
- [ ] Can select all 5 cleanup types
- [ ] Preview button works
- [ ] Shows email count
- [ ] Shows storage calculation
- [ ] Confidence score displays
- [ ] Execute button triggers cleanup
- [ ] Success message appears

### History Page
- [ ] Lists past cleanups
- [ ] Shows correct icons
- [ ] Displays dates correctly
- [ ] Shows storage freed
- [ ] Pagination works (if added)

## Performance & Quality

- [ ] Page load time < 3 seconds
- [ ] No console errors
- [ ] No console warnings (besides expected NextAuth ones)
- [ ] TypeScript strict mode enabled
- [ ] All types properly defined
- [ ] Error boundaries in place

## Security Checklist

- [ ] NEXTAUTH_SECRET is strong (32+ chars, random)
- [ ] No credentials in code
- [ ] Environment variables not committed
- [ ] HTTPS enabled on prod
- [ ] OAuth scopes limited to needed permissions
- [ ] Database has RLS enabled
- [ ] API routes check for authentication
- [ ] CORS configured appropriately
- [ ] Rate limiting on sensitive endpoints

## Monitoring & Analytics

- [ ] Sentry configured (optional)
- [ ] Error tracking enabled
- [ ] Vercel Analytics enabled
- [ ] User sessions trackable
- [ ] Database connections healthy

## Documentation

- [ ] README.md complete
- [ ] API documentation updated
- [ ] Database schema documented
- [ ] Environment variables documented
- [ ] Deployment instructions clear
- [ ] Support/contact info provided

## Final Checks

- [ ] All features working on prod
- [ ] Error handling tested (simulate failures)
- [ ] Loading states work
- [ ] Mobile responsive (test on phone)
- [ ] Accessibility basics (tab navigation, alt text)
- [ ] All links work
- [ ] Forms validate correctly
- [ ] Ready to invite beta testers

## Post-Launch

- [ ] Send MVP to beta testers
- [ ] Collect feedback
- [ ] Monitor error logs
- [ ] Track usage metrics
- [ ] Plan Phase 2 features
- [ ] Schedule feedback review meeting

---

## Estimated Time
- **Setup:** 1-2 hours
- **Local Testing:** 30-60 minutes
- **Deploy to Prod:** 30 minutes
- **Total:** 2-3.5 hours

## Support Resources
- [Build Spec](OUTLOOK_CLEANUP_BUILD_SPEC.md) - Full specification
- [Quick Start](QUICK_START_FOR_DEVELOPERS.md) - Developer setup guide
- [GitHub Docs](https://docs.github.com) - GitHub deployment help
- [Vercel Docs](https://vercel.com/docs) - Vercel deployment guide
- [Supabase Docs](https://supabase.com/docs) - Database help
- [NextAuth Docs](https://next-auth.js.org) - Authentication help

**Good luck! You've got this! 🎉**
