# 🚀 GO LIVE GUIDE - From MVP to Production

**Your roadmap to launch InboxClean SaaS and start selling!**

---

## 🎯 Overview: The 7 Steps to Launch

```
1. Deploy to Vercel (Make it live online)        ← EASIEST FIRST
2. Set up Database (Supabase PostgreSQL)
3. Configure Authentication (Microsoft OAuth)
4. Set up Payments (Stripe)
5. Test Everything (QA Testing)
6. Custom Domain (youromain.com)
7. Launch & Monitor
```

---

# 📍 STEP 1: Deploy to Vercel (EASIEST - DO THIS FIRST)

**What:** Vercel makes your website live on the internet  
**Why:** Anyone can access it from their browser  
**Cost:** Free tier includes 100GB bandwidth/month (perfect to start)

## How to Deploy:

### 1.1: Go to Vercel
- Website: https://vercel.com
- Click "Sign up"
- Choose "Continue with GitHub"
- Authorize Vercel to connect to your GitHub

### 1.2: Import Your Project
- Click "New Project"
- Find your `inboxclean-saas` repository
- Click "Import"

### 1.3: Configure Environment Variables
You'll see a form asking for environment variables. Add these:

```
NEXTAUTH_SECRET=your-random-secret-here
NEXTAUTH_URL=https://your-deployment.vercel.app
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-key
MICROSOFT_ENTRA_ID_CLIENT_ID=your-azure-app-id
MICROSOFT_ENTRA_ID_CLIENT_SECRET=your-azure-secret
STRIPE_SECRET_KEY=your-stripe-secret
STRIPE_PUBLISHABLE_KEY=your-stripe-public
```

(We'll fill these in the next steps)

### 1.4: Deploy
- Click "Deploy"
- Wait 2-3 minutes
- **You're live!** 🎉

Your app will be at: `https://inboxclean-saas.vercel.app` (or similar)

---

# 💾 STEP 2: Set Up Database (Supabase)

**What:** Where all your user data, email cleanup history, etc. gets stored  
**Why:** You need a real database so user data persists  
**Cost:** Free tier = 500MB storage (great for starting)

## How to Set Up:

### 2.1: Create Supabase Account
- Go to: https://supabase.com
- Click "Start your project"
- Sign up with GitHub (easiest)

### 2.2: Create a New Project
- Click "New project"
- Fill in:
  ```
  Project name: inboxclean
  Database password: (create a strong password)
  Region: Choose closest to you
  ```
- Click "Create new project"
- Wait 2-3 minutes

### 2.3: Get Your Database Credentials
Once created, go to Settings (bottom left):
- Click "API"
- You'll see:
  - `Project URL` (use for NEXT_PUBLIC_SUPABASE_URL)
  - `anon public` key (use for NEXT_PUBLIC_SUPABASE_ANON_KEY)

**Copy these and save them!** You'll need them for Vercel in Step 1.3.

### 2.4: Create Database Tables
- Go to the "SQL Editor" (left menu)
- Click "New query"
- Paste this file into Supabase: `src/lib/db/schema.sql`
- Click "Run" (▶️)
- All tables are now created! ✅

---

# 🔐 STEP 3: Set Up Authentication (Microsoft Entra ID)

**What:** Lets users sign in with their Microsoft/Office 365 account  
**Why:** Users can authenticate securely  
**Cost:** Free

## How to Set Up:

### 3.1: Go to Azure Portal
- Website: https://portal.azure.com
- Sign in with your Microsoft account
- If you don't have one, create free at https://azure.microsoft.com/free/

### 3.2: Register an Application
- In the search bar, type: `App registrations`
- Click "New registration"
- Fill in:
  ```
  Name: InboxClean
  Supported account types: Accounts in any organizational directory
  Redirect URI: Web
  ```
- For the Redirect URI, add: `https://your-vercel-domain.vercel.app/api/auth/callback/azure-ad`
  - (Replace with your actual Vercel URL from Step 1)

### 3.3: Get Your Credentials
- Go to "Overview"
- Copy:
  - `Application (client) ID` → MICROSOFT_ENTRA_ID_CLIENT_ID
  - Go to "Certificates & secrets" → "New client secret"
  - Copy the secret value → MICROSOFT_ENTRA_ID_CLIENT_SECRET

**Save these!** Add them to Vercel in Step 1.3.

---

# 💳 STEP 4: Set Up Payments (Stripe)

**What:** Processes credit card payments from customers  
**Why:** You need this to actually sell your product  
**Cost:** Stripe charges 2.9% + $0.30 per transaction (only when you sell!)

## How to Set Up:

### 4.1: Create Stripe Account
- Go to: https://stripe.com
- Click "Start now"
- Sign up with email or Google
- Fill in business info

### 4.2: Get Your API Keys
- Go to "Developers" (left menu)
- Click "API keys"
- You'll see:
  - `Publishable key` → STRIPE_PUBLISHABLE_KEY
  - `Secret key` → STRIPE_SECRET_KEY

**Copy both!** Add them to Vercel in Step 1.3.

### 4.3: Create Products
This is where you define what you're selling:

**In Stripe Dashboard:**
- Go to "Products"
- Click "Add product"

**Create 3 plans:**

**Plan 1: Starter**
```
Name: Starter Plan
Price: $9.99/month
Description: Up to 1,000 email cleanups per month
```

**Plan 2: Professional**
```
Name: Professional Plan
Price: $29.99/month
Description: Up to 50,000 cleanups, priority support
```

**Plan 3: Enterprise**
```
Name: Enterprise Plan
Price: $99.99/month
Description: Unlimited cleanups, dedicated support
```

Copy each product ID and save them.

---

# ✅ STEP 5: Test Everything (QA Testing)

Before telling the world, test it!

### 5.1: Test User Registration
1. Go to your Vercel URL
2. Click "Sign in with Microsoft"
3. Use a test Microsoft account (create free at outlook.com)
4. Should be able to log in ✅

### 5.2: Test Cleanup Functionality
1. Go to Dashboard
2. Select a cleanup type
3. Click "Preview"
4. Should show emails to delete
5. Click "Execute"
6. Should complete successfully ✅

### 5.3: Test Payments
1. Go to pricing page
2. Try to buy a plan
3. Use Stripe test card: `4242 4242 4242 4242`
4. Expiry: Any future date
5. CVC: Any 3 digits
6. Should complete ✅

### 5.4: Test History Page
1. After cleanup, go to "History"
2. Should see your past cleanups ✅

---

# 🌐 STEP 6: Custom Domain (Optional but Recommended)

**What:** Instead of `inboxclean-saas.vercel.app`, use `inboxclean.com`  
**Why:** Looks professional  
**Cost:** Domain = $10-15/year (GoDaddy, Namecheap, etc.)

## How to Set Up:

### 6.1: Buy a Domain
- Go to: https://namecheap.com (or Godaddy, Google Domains, etc.)
- Search for your domain (e.g., `inboxclean.com`)
- Buy for 1 year minimum

### 6.2: Connect to Vercel
- In Vercel, go to Settings → Domains
- Click "Add domain"
- Type your domain: `inboxclean.com`
- Vercel will give you DNS records
- Go to your domain registrar and add those DNS records
- Wait 24-48 hours for DNS to update
- Your app is now at: `https://inboxclean.com` ✅

---

# 🎯 STEP 7: Launch & Monitor

### 7.1: Update Vercel Environment Variables
After you have all credentials from Steps 2-4:
- Go to Vercel Settings
- Click "Environment Variables"
- Add all variables from Step 1.3:
  - NEXTAUTH_SECRET
  - NEXTAUTH_URL
  - SUPABASE credentials
  - MICROSOFT credentials
  - STRIPE credentials
- Redeploy: Click "Deployments" → Last deployment → "Redeploy"

### 7.2: Test Everything Again
- Visit your live URL
- Sign in
- Test cleanup
- Test payments
- Test history

### 7.3: Tell People About It!
- Launch announcement
- Share GitHub link
- Share live app link
- Get beta testers
- Collect feedback

### 7.4: Monitor & Track
**Add analytics to track:**
- How many people sign up
- How many use it
- Payment success rate
- Bugs/errors

Tools:
- Vercel Analytics (built-in, free)
- Stripe Dashboard (see sales)
- Supabase Dashboard (see database usage)

---

# 💰 PRICING STRATEGY

Based on your market research:

```
Starter: $9.99/month
- Up to 1,000 cleanups
- Basic analytics
- Email support
- Perfect for: Personal users, Gmail users

Professional: $29.99/month
- Up to 50,000 cleanups
- Advanced analytics
- Priority email support
- 1-hour response time
- Perfect for: Small businesses

Enterprise: $99.99/month (custom)
- Unlimited cleanups
- API access
- Dedicated account manager
- Phone support
- Perfect for: Large corporations
```

---

# 📊 EXPECTED COSTS (Monthly)

| Service | Free Tier | Paid Tier | When to Upgrade |
|---------|-----------|-----------|-----------------|
| **Vercel** | $0 (100GB) | $20+ | 1TB+ bandwidth |
| **Supabase** | $0 (500MB) | $25+ | 1GB+ storage |
| **Stripe** | $0 | 2.9% + $0.30 | When you get sales |
| **Domain** | - | $1/month | When launching |
| **Monitoring** | Free | - | Not needed yet |
| **TOTAL** | **$0** | **$25-50+** | After 100 customers |

**Pro tip:** Start with free tiers. Scale up only when you have paying customers!

---

# 🚦 LAUNCH CHECKLIST

Before going public, verify:

- [ ] Vercel deployment is live
- [ ] Database is working (Supabase)
- [ ] Users can sign in (Microsoft OAuth)
- [ ] Payment system works (Stripe)
- [ ] Cleanup feature works end-to-end
- [ ] History page shows past cleanups
- [ ] Error handling works (try to break it!)
- [ ] Mobile looks good (test on phone)
- [ ] No console errors (F12 → Console)
- [ ] Emails are actually deleted (test carefully!)
- [ ] User data is private (no leaks)
- [ ] Performance is good (< 3 second load time)

---

# 📞 NEXT STEPS (Do These in Order)

1. **TODAY:** Deploy to Vercel (Step 1)
2. **TODAY:** Set up Supabase (Step 2)
3. **TOMORROW:** Set up Microsoft Auth (Step 3)
4. **TOMORROW:** Set up Stripe (Step 4)
5. **THIS WEEK:** Test everything (Step 5)
6. **THIS WEEK:** Test payments with real Stripe cards
7. **NEXT WEEK:** Add custom domain (Step 6)
8. **NEXT WEEK:** Launch!

---

# 🆘 TROUBLESHOOTING

### "Vercel deployment fails"
- Check environment variables are set
- Check package.json is correct
- Check your code has no errors

### "Can't sign in with Microsoft"
- Make sure redirect URI in Azure matches Vercel URL exactly
- Make sure credentials are in Vercel env variables

### "Payments not working"
- Make sure Stripe keys are correct
- Make sure you're using test mode for testing
- Use test card: 4242 4242 4242 4242

### "Database connection error"
- Make sure Supabase URL and key are correct
- Make sure credentials are in Vercel env variables
- Check Supabase project is not paused

---

# 💡 KEY CONCEPTS

**Vercel** = Your web hosting (like a server in the cloud)  
**Supabase** = Your database (like a spreadsheet, but powerful)  
**Stripe** = Your payment processor (takes money from customers)  
**Microsoft Auth** = Login system (users can sign in with email)

---

# 🎓 FREE RESOURCES TO LEARN

- Vercel Docs: https://vercel.com/docs
- Supabase Docs: https://supabase.com/docs
- Stripe Docs: https://stripe.com/docs
- Next.js Docs: https://nextjs.org/docs

---

# 🎉 YOU'VE GOT THIS!

Your MVP is ready. Now just follow these steps and you'll be live!

**Questions? Ask me!** I can help with any step.

**Let's make InboxClean successful!** 🚀
