#!/bin/bash

# InboxClean SaaS - Setup Script
# Run this after cloning to get the project ready for development

echo "🚀 InboxClean Development Environment Setup"
echo "============================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi

echo "✅ npm $(npm -v) detected"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "⚙️  Configuration Setup"
echo "====================="

# Create .env.local from .env.example if it doesn't exist
if [ ! -f .env.local ]; then
    echo "Creating .env.local from .env.example..."
    cp .env.example .env.local
    echo "✅ .env.local created"
    echo ""
    echo "⚠️  IMPORTANT: Edit .env.local with your credentials:"
    echo "   - SUPABASE_URL"
    echo "   - SUPABASE_ANON_KEY"
    echo "   - NEXTAUTH_SECRET (generate with: openssl rand -base64 32)"
    echo "   - MICROSOFT_CLIENT_ID"
    echo "   - MICROSOFT_CLIENT_SECRET"
else
    echo "✅ .env.local already exists"
fi

echo ""
echo "🗄️  Database Setup"
echo "================="
echo ""
echo "To set up your database:"
echo "1. Create a Supabase project at https://supabase.com"
echo "2. Copy your project credentials to .env.local"
echo "3. Run: npm run db:push"
echo ""

echo "🚀 Next Steps"
echo "============="
echo "1. Configure your .env.local file"
echo "2. Create your Supabase project"
echo "3. Run database migrations: npm run db:push"
echo "4. Start development: npm run dev"
echo "5. Visit http://localhost:3000"
echo ""
echo "✅ Setup complete!"
