# 🚀 DEVELOPER ONBOARDING - START HERE

**Welcome to InboxClean SaaS!**

This document guides you through setting up and beginning development.

---

## 📋 Prerequisites

Before starting, ensure you have:

- **Node.js 18+** - [Download](https://nodejs.org)
- **npm or pnpm** - Comes with Node.js
- **Git** - For version control
- **GitHub account** - To clone the repo
- **Supabase account** - [Free tier at supabase.com](https://supabase.com)
- **Microsoft Azure account** - For OAuth setup

---

## 🔧 Initial Setup (15 minutes)

### Step 1: Clone Repository
```bash
git clone <your-repo-url>
cd inboxclean
```

### Step 2: Install Dependencies
```bash
npm install
```

Or if you prefer pnpm:
```bash
pnpm install
```

### Step 3: Create Environment File
```bash
cp .env.example .env.local
```

### Step 4: Configure Environment Variables

Open `.env.local` and fill in:

**Supabase Setup:**
1. Go to [supabase.com](https://supabase.com)
2. Create new project (free tier available)
3. Copy these values from Project Settings → API:
   - `SUPABASE_URL` → Paste into `.env.local`
   - `SUPABASE_ANON_KEY` → Paste into `.env.local`

**NextAuth Setup:**
```bash
# Generate a secure secret
openssl rand -base64 32
# Copy the output to NEXTAUTH_SECRET
```

**Microsoft OAuth Setup:**
1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to Azure Active Directory → App registrations
3. Create new app registration
4. Copy `Application (client) ID` → `MICROSOFT_CLIENT_ID`
5. Create a new client secret → `MICROSOFT_CLIENT_SECRET`
6. Add Redirect URI: `http://localhost:3000/api/auth/callback/microsoft-entra`

### Step 5: Create `.env.local` Complete Example

```bash
# Database
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here

# Auth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-from-openssl

# Microsoft OAuth
MICROSOFT_CLIENT_ID=your-client-id
MICROSOFT_CLIENT_SECRET=your-client-secret
MICROSOFT_TENANT_ID=common
```

### Step 6: Set Up Database

```bash
# Install Supabase CLI globally (optional)
npm install -g supabase

# Create database tables
# Option A: Using Supabase UI
# - Log in to Supabase
# - Go to SQL Editor
# - Copy contents of src/lib/db/schema.sql
# - Run the SQL

# Option B: Using Supabase CLI
supabase link --project-ref your-project-ref
supabase db push
```

### Step 7: Start Development Server

```bash
npm run dev
```

Then visit: **http://localhost:3000**

You should see the login page! 🎉

---

## 🗂️ Project Structure Quick Reference

```
src/
├── app/
│   ├── (auth)/            # Login pages
│   │   └── login/page.tsx
│   ├── (dashboard)/       # Protected pages (require login)
│   │   ├── page.tsx       # Main dashboard
│   │   ├── cleanup/       # Cleanup feature
│   │   ├── rules/         # Rules management
│   │   └── settings/      # User settings
│   ├── api/               # Backend API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── cleanup/       # Cleanup endpoints
│   │   ├── rules/         # Rules endpoints
│   │   └── health/        # Health check
│   ├── layout.tsx         # Root layout
│   └── providers.tsx      # Context providers
├── lib/
│   ├── auth.ts            # Authentication utilities
│   ├── cleanup-engine.ts  # Cleanup detection algorithms
│   ├── validation.ts      # Form validation (Zod)
│   ├── utils.ts           # Helper functions
│   └── db/
│       └── schema.sql     # Database schema
├── types/
│   └── index.ts           # TypeScript type definitions
└── styles/
    └── globals.css        # Global CSS
```

---

## 🔍 Testing Your Setup

After starting the dev server:

1. **Check health endpoint:**
   ```
   curl http://localhost:3000/api/health
   ```
   Should return: `{ "status": "healthy", ... }`

2. **Visit dashboard:**
   ```
   http://localhost:3000
   ```
   Should redirect to login page

3. **Check your database:**
   - Go to Supabase dashboard
   - Navigate to SQL Editor
   - Run: `SELECT COUNT(*) FROM users;`
   - Should return: `count: 0` (no users yet)

---

## 📚 Key Files to Review

Read these files to understand the architecture:

1. **[README.md](./README.md)** - Project overview
2. **[DEVELOPMENT_PROGRESS.md](./DEVELOPMENT_PROGRESS.md)** - What's done, what's next
3. **[OUTLOOK_CLEANUP_BUILD_SPEC.md](./OUTLOOK_CLEANUP_BUILD_SPEC.md)** - Complete technical spec
4. **[QUICK_START_FOR_DEVELOPERS.md](./QUICK_START_FOR_DEVELOPERS.md)** - Development patterns

---

## 🎯 Your First Task

**Goal:** Make a small code change and test it works

### Task: Update Dashboard Welcome Message

1. Open `src/app/(dashboard)/page.tsx`
2. Find the welcome message:
   ```typescript
   <h2 className="text-2xl font-bold text-gray-900 mb-2">
     Welcome to InboxClean
   </h2>
   ```
3. Change to your name:
   ```typescript
   <h2 className="text-2xl font-bold text-gray-900 mb-2">
     Welcome to InboxClean, [Your Name]! 🚀
   </h2>
   ```
4. Save the file
5. Check http://localhost:3000 in your browser
6. Your changes should appear (hot reload)

✅ You can now edit code successfully!

---

## 📖 Phase 1 Development Tasks

These are the tasks to complete Phase 1 MVP:

### Week 1-2 (Core Features)
- [ ] Microsoft Graph API integration
- [ ] Cleanup preview endpoint
- [ ] Cleanup execute endpoint
- [ ] Cleanup history retrieval
- [ ] Cleanup UI components
- [ ] Error handling & logging

### Week 3 (Dashboard & UX)
- [ ] Dashboard stats
- [ ] Cleanup history page
- [ ] Email preview list
- [ ] Undo functionality
- [ ] Mobile responsiveness

### Week 4 (Testing & Deploy)
- [ ] Write tests
- [ ] Deploy to Vercel
- [ ] Performance optimization
- [ ] Security review

See [DEVELOPMENT_PROGRESS.md](./DEVELOPMENT_PROGRESS.md) for complete checklist.

---

## 🛠️ Common Commands

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)
npm run build            # Build for production
npm run start            # Run production build locally

# Code Quality
npm run lint             # Check for errors
npm run format           # Format code with Prettier
npm run type-check       # Check TypeScript types

# Database
npm run db:push          # Push schema to Supabase
npm run db:pull          # Pull schema from Supabase
npm run db:migrate       # Run migrations

# Testing
npm test                 # Run tests
npm run test:coverage    # Run tests with coverage
```

---

## 🐛 Debugging Tips

### Issue: "Cannot find module" error
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Supabase connection failed
```bash
# Check env variables
echo $SUPABASE_URL
echo $SUPABASE_ANON_KEY

# Verify in Supabase dashboard
# Settings → API → Copy values again
```

### Issue: Microsoft OAuth not working
```bash
# Check Azure Portal registration
# - Make sure Redirect URI is: http://localhost:3000/api/auth/callback/microsoft-entra
# - Check Client ID matches MICROSOFT_CLIENT_ID
# - Check Client Secret is correct
```

### Issue: TypeScript errors
```bash
# Run type checker
npm run type-check

# Check tsconfig.json is correct
# The config in this project uses strict mode
```

---

## 📚 Learning Resources

### Required Reading
- [Next.js 15 Docs](https://nextjs.org/docs)
- [React 19 Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com)

### OAuth & Auth
- [NextAuth.js Docs](https://next-auth.js.org)
- [Microsoft Identity Platform](https://docs.microsoft.com/en-us/azure/active-directory/develop)
- [OAuth 2.0 Explained](https://www.oauth.com)

### Database
- [Supabase Docs](https://supabase.com/docs)
- [PostgreSQL Basics](https://www.postgresql.org/docs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

---

## 🤝 Getting Help

### Resources
- **GitHub Issues** - Report bugs or ask questions
- **Discord** - Join the team Slack/Discord
- **Email** - Send to support@inboxclean.app
- **Documentation** - See QUICK_START_FOR_DEVELOPERS.md

### Good Questions to Ask
- "How should I structure this component?"
- "What's the best way to handle this API call?"
- "Can you review my code?"
- "I'm stuck on this error..."

### What to Include When Asking for Help
- What you're trying to do
- What error you're seeing
- What you've already tried
- A code snippet or screenshot

---

## ✅ You're Ready!

You should now be able to:
- ✅ Start the development server
- ✅ Make code changes
- ✅ Access the Supabase database
- ✅ Understand the project structure
- ✅ Know where to find documentation

**Next Step:** Start on Week 1 tasks in [DEVELOPMENT_PROGRESS.md](./DEVELOPMENT_PROGRESS.md)

---

## 🚀 Quick Reference

| What | Where |
|------|-------|
| How do I...? | [QUICK_START_FOR_DEVELOPERS.md](./QUICK_START_FOR_DEVELOPERS.md) |
| What are the API specs? | [OUTLOOK_CLEANUP_BUILD_SPEC.md](./OUTLOOK_CLEANUP_BUILD_SPEC.md) |
| What's the tech stack? | [README.md](./README.md) |
| What's the next task? | [DEVELOPMENT_PROGRESS.md](./DEVELOPMENT_PROGRESS.md) |
| How much will it cost? | [OUTLOOK_CLEANUP_COST_BREAKDOWN.md](./OUTLOOK_CLEANUP_COST_BREAKDOWN.md) |

---

**Welcome aboard! 🎉 Let's build something awesome.**
