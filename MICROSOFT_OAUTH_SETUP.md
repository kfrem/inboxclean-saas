# 🔐 MICROSOFT LOGIN (OAUTH) - COMPLETE SETUP GUIDE

**Let users sign in with their Microsoft/Office 365 account!**

---

## 🎯 What We're Doing

Imagine users don't need to create yet another password. Instead, they click:
- "Sign in with Microsoft"
- Their Microsoft/Outlook account login opens
- They're logged into InboxClean automatically ✅

**This is OAuth authentication.**

---

## 📋 Overview of Steps

```
1. Create/Use Microsoft Account (free)
2. Go to Azure Portal
3. Register your app
4. Get credentials (Client ID & Secret)
5. Add credentials to Vercel
6. Test login
```

---

# ✅ STEP 1: Create a Microsoft Account (If Needed)

**Do you have an Outlook.com or Microsoft account?**

- **YES:** Skip to Step 2
- **NO:** Create free at: https://outlook.com

Click "Create account" and follow the steps.

---

# ✅ STEP 2: Go to Azure Portal

**Link:** https://portal.azure.com

1. **Click the link above** (or copy-paste into browser)

2. **Sign in** with your Microsoft account
   - Use email like: yourname@outlook.com
   - Or Microsoft/corporate account

3. **If first time:**
   - It might ask about billing
   - Click "Start free" or "Free trial"
   - Microsoft gives you $200 free credit (don't worry, this setup costs $0!)

4. **You'll see the Azure Portal dashboard** (lots of options, don't panic!)

**After this step:** You're in Azure Portal ✅

---

# ✅ STEP 3: Find App Registrations

**What you'll see:**
- A big blue dashboard with many options
- A search bar at the top

**What to do:**

1. **Look at the top of the page** for a search bar
   - It says "Search resources, services, and docs"

2. **Click the search bar**

3. **Type:** `App registrations`
   - You should see "App registrations" appear below

4. **Click "App registrations"** from the dropdown

**You'll now see:**
- A page that says "App registrations"
- A button that says "New registration"
- An empty list (no apps yet)

**After this step:** You found App Registrations ✅

---

# ✅ STEP 4: Register a New Application

**What to do:**

1. **Click the blue "New registration" button**

2. **You'll see a form with these fields:**

---

### Field 1: Name

**What to type:**
```
InboxClean
```

(Just the app name - keep it simple)

---

### Field 2: Supported Account Types

**What to select:**
```
Accounts in any organizational directory (Any Azure AD directory - Multitenant) and personal Microsoft accounts (e.g. Skype, Xbox)
```

(Click this radio button - it lets anyone with a Microsoft account use your app)

---

### Field 3: Redirect URI

**This is IMPORTANT!** It's where users return after logging in.

**What to do:**

1. **In the "Redirect URI" section, select the dropdown**
   - It says "Select a platform"

2. **Choose: "Web"**

3. **In the URL field that appears, type your Vercel URL:**
   ```
   https://inboxclean-saas.vercel.app/api/auth/callback/azure-ad
   ```

   (Replace `inboxclean-saas` with your actual Vercel project name)

---

### Step 5: Register

1. **Scroll down and click the blue "Register" button**

2. **Wait a moment** while Azure creates your app

3. **You'll see a page showing your app details** ✅

**After this step:** Your app is registered! ✅

---

# ✅ STEP 5: Get Your Credentials

**What you'll see:**
- Your app's overview page
- Important info like "Application (client) ID"

### Part A: Get Client ID

**What to do:**

1. **On the page, find: "Application (client) ID"**
   - It's a long string of numbers/letters
   - Example: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`

2. **Copy this entire string**
   - Click the copy icon next to it
   - Or select and Ctrl+C

3. **Paste it somewhere safe** (notepad, password manager, etc.)
   - Label it: `MICROSOFT_ENTRA_ID_CLIENT_ID`

**You now have:** Client ID ✅

---

### Part B: Get Client Secret

**What to do:**

1. **On the left sidebar, find and click: "Certificates & secrets"**
   - (Might also be called "Credentials")

2. **You'll see tabs:** "Certificates" | "Client secrets"
   - Click **"Client secrets"**

3. **Click the blue button:** "New client secret"

4. **A form appears asking:**
   - Description: Type `InboxClean OAuth Secret`
   - Expires: Choose `90 days`

5. **Click the blue "Add" button**

6. **You'll see your new secret appear**
   - It shows: "VALUE" column with a long string
   - Click the copy icon to copy it

7. **Paste it somewhere safe**
   - Label it: `MICROSOFT_ENTRA_ID_CLIENT_SECRET`

⚠️ **IMPORTANT:** Once you leave this page, you can't see the secret again!

**You now have:** Client Secret ✅

---

# ✅ STEP 6: Add Credentials to Vercel

Now you have 2 credentials:
- `MICROSOFT_ENTRA_ID_CLIENT_ID`
- `MICROSOFT_ENTRA_ID_CLIENT_SECRET`

Let's add them to Vercel so your app can use them.

### 6.1: Go to Vercel Dashboard

**Link:** https://vercel.com/dashboard

1. **Click the link** (or go to Vercel in your browser)

2. **Click your project: "inboxclean-saas"**

---

### 6.2: Go to Settings

**What you'll see:**
- Your project page with tabs at top: "Overview", "Deployments", "Settings"

**What to do:**

1. **Click the "Settings" tab**

---

### 6.3: Find Environment Variables

**What you'll see:**
- Left sidebar with options
- One option says "Environment Variables"

**What to do:**

1. **Click "Environment Variables"** in the left sidebar

---

### 6.4: Add Client ID Variable

**What to do:**

1. **You'll see a form to add a new variable**

2. **In "Name" field, type:**
   ```
   MICROSOFT_ENTRA_ID_CLIENT_ID
   ```

3. **In "Value" field, paste:**
   ```
   (your Client ID from Step 5)
   ```

4. **Click "Add" or "Save"**

5. **You should see it added to a list below**

---

### 6.5: Add Client Secret Variable

**Repeat the same process:**

1. **Click the form again for another variable**

2. **In "Name" field, type:**
   ```
   MICROSOFT_ENTRA_ID_CLIENT_SECRET
   ```

3. **In "Value" field, paste:**
   ```
   (your Client Secret from Step 5)
   ```

4. **Click "Add" or "Save"**

5. **You should see it added to the list**

---

# ✅ STEP 7: Redeploy Your App

After adding these variables, you need to redeploy.

### 7.1: Go to Deployments

1. **In Vercel, click the "Deployments" tab**

2. **Find your latest deployment** (top of the list)

3. **Click the three dots (...) menu on the right**

4. **Click "Redeploy"**

5. **Confirm when asked**

6. **Wait 2-5 minutes** for redeployment

---

# ✅ STEP 8: Test Microsoft Login

### 8.1: Go to Your App

1. **Visit your Vercel URL:**
   ```
   https://inboxclean-saas.vercel.app
   ```

2. **You should see the login page**

3. **You should see a button: "Sign in with Microsoft"** (or similar)

### 8.2: Test the Login

1. **Click "Sign in with Microsoft"**

2. **You'll be taken to Microsoft's login page**
   - This is the official Microsoft login (safe!)

3. **Enter your Microsoft email and password**
   - Example: yourname@outlook.com

4. **Microsoft asks:** "InboxClean is asking to access your account"
   - Click **"Accept"**

5. **You'll be sent back to InboxClean**

6. **You should be logged in!** ✅
   - You'll see your dashboard or profile page

**Congratulations!** Microsoft OAuth is working! 🎉

---

# 📋 CREDENTIALS SUMMARY

**Save these somewhere safe (you'll need them later):**

```
MICROSOFT_ENTRA_ID_CLIENT_ID = [your Client ID]
MICROSOFT_ENTRA_ID_CLIENT_SECRET = [your Client Secret]
NEXTAUTH_URL = https://inboxclean-saas.vercel.app
```

---

# 🔗 QUICK LINKS REFERENCE

| Step | Link |
|------|------|
| Azure Portal | https://portal.azure.com |
| App Registrations | https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade |
| Vercel Dashboard | https://vercel.com/dashboard |
| Your Live App | https://inboxclean-saas.vercel.app |

---

# 🆘 TROUBLESHOOTING

### "Can't find App Registrations"

- Use the search bar at the top
- Type "App registrations"
- Click the result

### "I don't see Certificates & secrets"

- You might be on the wrong page
- Make sure you're on your app's detail page
- Look in the left sidebar

### "Secret disappeared"

- Once you leave the page, you can't see it again
- Create a new secret by clicking "New client secret" again
- Copy it immediately this time

### "Microsoft login doesn't show"

- Make sure credentials are in Vercel environment variables
- Make sure you redeployed (new deployment created)
- Check redirect URI is exactly correct in Azure
- Clear browser cache and refresh

### "Login fails with error"

- Check Client ID and Client Secret are correct (no extra spaces)
- Check redirect URI in Azure matches your Vercel URL exactly
- Make sure your app is registered for "multitenant" accounts

---

# 📊 WHAT JUST HAPPENED

✅ Created app in Azure  
✅ Got authentication credentials  
✅ Added credentials to Vercel  
✅ Redeployed your app  
✅ Microsoft login is now working  

---

# 🎯 NEXT STEPS

After this works, you need to:

1. **Set up Supabase** (database)
   - I can help with this next
   - Stores user data, cleanup history, etc.

2. **Set up Stripe** (payments)
   - After database is set up
   - So people can buy your plans

3. **Full testing**
   - Make sure everything works together

---

# 💡 KEY CONCEPTS

**OAuth** = Login using another service (Microsoft, Google, etc.)  
**Client ID** = Public identifier (like a username)  
**Client Secret** = Private password (keep it secret!)  
**Redirect URI** = Where to send users after login  
**Azure** = Microsoft's cloud platform  

---

# 🎉 MICROSOFT LOGIN IS NOW CONFIGURED!

Your users can now sign in with their Microsoft accounts!

**Tell me when you've tested the login and I'll help with the next step!** 🚀

Questions? Ask me!
