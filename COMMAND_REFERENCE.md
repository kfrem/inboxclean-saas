# 🎮 DEVELOPER COMMAND REFERENCE

Quick reference for common development tasks.

---

## 🚀 GETTING STARTED

```bash
# 1. Copy environment template
cp .env.example .env.local

# 2. Install all dependencies
npm install
# or
pnpm install

# 3. Start development server
npm run dev
# Visit http://localhost:3000

# 4. Stop development server
# Press Ctrl+C in terminal
```

---

## 🧪 DEVELOPMENT SERVER

```bash
# Start development with hot reload
npm run dev

# Start production build locally
npm run build
npm run start

# Check for TypeScript errors
npm run type-check

# Lint code for issues
npm run lint

# Format code with Prettier
npm run format
```

---

## 📊 DATABASE COMMANDS

```bash
# Push schema to Supabase
npm run db:push

# Pull latest schema from Supabase
npm run db:pull

# Run migrations
npm run db:migrate

# Seed database with test data
npm run seed
```

---

## 🧪 TESTING

```bash
# Run all tests
npm test

# Run tests in watch mode (re-run on file change)
npm test -- --watch

# Run tests with coverage report
npm run test:coverage

# Run specific test file
npm test cleanup.test.ts
```

---

## 🔍 CODE QUALITY

```bash
# Check for all errors
npm run lint

# Auto-fix linting issues
npm run lint -- --fix

# Format all code
npm run format

# Check TypeScript types
npm run type-check

# All three together
npm run lint && npm run type-check && npm run format
```

---

## 📁 PROJECT STRUCTURE NAVIGATION

```bash
# Go to frontend
cd src/app

# Go to backend APIs
cd src/app/api

# Go to utilities
cd src/lib

# Go to components
cd src/components

# Go to types
cd src/types
```

---

## 🐛 DEBUGGING

```bash
# View all environment variables
echo $DATABASE_URL
echo $SUPABASE_URL

# Test API endpoint
curl http://localhost:3000/api/health

# Check Node version
node --version

# Check npm version
npm --version

# Clear npm cache
npm cache clean --force

# Reinstall everything
rm -rf node_modules package-lock.json
npm install
```

---

## 📦 DEPENDENCY MANAGEMENT

```bash
# Install new package
npm install package-name

# Install dev dependency
npm install --save-dev package-name

# Update all packages
npm update

# Check outdated packages
npm outdated

# Remove unused packages
npm prune
```

---

## 🌐 BROWSER DEBUGGING

```
Development:
http://localhost:3000              → Main app
http://localhost:3000/login        → Login page
http://localhost:3000/api/health   → Health check

React DevTools:
- Install browser extension
- F12 → Components tab

Network Inspection:
- F12 → Network tab
- See all API calls
```

---

## 🎨 COMMON CODE CHANGES

### Add a New Page
```bash
# Create page in app
src/app/(dashboard)/new-page/page.tsx
```

### Add a New Component
```bash
# Create component
src/components/MyComponent.tsx
```

### Add a New API Endpoint
```bash
# Create route
src/app/api/feature/action/route.ts
```

### Add a New Type
```bash
# Add to types/index.ts
export interface MyType { ... }
```

### Add Validation
```bash
# Add to lib/validation.ts
export const mySchema = z.object({ ... })
```

---

## 🚀 BUILD & DEPLOYMENT

```bash
# Build for production
npm run build

# Check build output
npm run start

# Create production bundle analysis
npm install --save-dev @next/bundle-analyzer
# Then configure in next.config.js

# Deploy to Vercel
# Option 1: Git push (auto-deploys)
git add .
git commit -m "Your message"
git push origin main

# Option 2: Vercel CLI
npm i -g vercel
vercel
```

---

## 🔑 ENVIRONMENT VARIABLES

```bash
# View specific variable
echo $SUPABASE_URL

# Set temporarily
export MY_VAR=value

# In .env.local (persistent)
SUPABASE_URL=https://...
SUPABASE_ANON_KEY=...
```

---

## 🐙 GIT COMMANDS

```bash
# Clone repository
git clone <url>

# Create new branch
git checkout -b feature-name

# Stage changes
git add .

# Commit changes
git commit -m "Feature: description"

# Push to GitHub
git push origin feature-name

# Create Pull Request
# Go to GitHub and click "Compare & pull request"

# Merge to main
# After PR approved, click "Merge pull request"

# Delete branch
git branch -d feature-name
```

---

## 🆘 COMMON ISSUES & FIXES

### Node modules error
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port 3000 already in use
```bash
# Find process on port 3000
lsof -i :3000

# Kill process
kill -9 <PID>

# Or use different port
npm run dev -- -p 3001
```

### TypeScript errors
```bash
npm run type-check
# Fix errors shown
```

### Build fails
```bash
npm run build
# Read error message carefully
# Usually something in src/ needs fixing
```

### Database connection error
```bash
# Check .env.local has correct values
echo $SUPABASE_URL
echo $DATABASE_URL

# Test connection with curl
# Go to Supabase dashboard → SQL Editor
# Run: SELECT 1
```

---

## 📚 USEFUL SHORTCUTS

### VS Code Shortcuts
```
Ctrl+Shift+P     → Command palette
Ctrl+/           → Toggle comment
Ctrl+Alt+Arrow   → Multi-cursor
Ctrl+D           → Select word
Ctrl+H           → Find & replace
F2               → Rename symbol
Ctrl+Shift+O     → Go to symbol
```

### Terminal Shortcuts
```
Up/Down Arrow    → Previous/next command
Ctrl+A           → Go to start of line
Ctrl+E           → Go to end of line
Ctrl+R           → Search history
!!               → Repeat last command
```

---

## 🎯 QUICK TASK TEMPLATES

### Adding a Feature
```bash
# 1. Create branch
git checkout -b feature/my-feature

# 2. Create file(s)
# Edit src/app/api/my-feature/route.ts
# Edit src/components/MyFeature.tsx

# 3. Test locally
npm run dev
# http://localhost:3000

# 4. Run checks
npm run type-check
npm run lint
npm test

# 5. Commit
git add .
git commit -m "Feature: add my feature"
git push origin feature/my-feature

# 6. Create PR on GitHub
```

### Fixing a Bug
```bash
# 1. Create bug fix branch
git checkout -b fix/bug-description

# 2. Reproduce bug
# Test locally to confirm

# 3. Fix code
# Edit relevant file(s)

# 4. Test fix
npm run dev

# 5. Commit
git add .
git commit -m "Fix: resolve bug description"
git push origin fix/bug-description

# 6. Create PR
```

---

## 📊 MONITORING DEVELOPMENT

```bash
# Check file sizes
du -sh .

# Count lines of code
find src -name "*.ts" -o -name "*.tsx" | xargs wc -l

# Check npm script speed
npm run lint -- --profile

# Monitor performance
npm run dev -- --experimental-turbopack
```

---

## 🔐 SECURITY CHECKS

```bash
# Scan for vulnerabilities
npm audit

# Fix known vulnerabilities
npm audit fix

# Check environment variables are not leaked
grep -r "password\|secret\|token" src/

# Review .env.local (should have real values)
cat .env.local

# Ensure .env.local is in .gitignore
cat .gitignore | grep env
```

---

## 💡 PRO TIPS

1. **Use VS Code terminal** - Integrated terminal is convenient
2. **Enable autosave** - File → Preferences → Autosave
3. **Use extensions** - ES7+, Tailwind, Prettier, Thunder Client
4. **Keep docs updated** - Update README when structure changes
5. **Commit frequently** - Small commits are easier to review
6. **Test before push** - Run `npm run type-check && npm run lint && npm test`
7. **Branch naming** - Use `feature/`, `fix/`, `docs/` prefixes
8. **Clear commit messages** - "Add feature" vs "feat: add bounce detection"

---

## 🚀 YOU'RE ALL SET!

Save this file and reference it whenever you need to run a command.

**Most common:**
```bash
npm run dev          # Start coding
npm run type-check   # Check types
npm run lint         # Check code
npm test             # Run tests
```

---

**Happy coding! 🎉**
