#!/bin/bash

# Simple Deployment Helper
echo "🚀 Starting US Paper Cup Factory Setup..."

# 1. Check for .env file
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Let's create it!"
    echo "Paste your keys (Right Click to Paste, then Enter):"
    
    read -p "STRIPE_SECRET_KEY: " STRIPE_KEY
    read -p "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: " STRIPE_PUB_KEY
    read -p "AUTH_SECRET (any random string): " AUTH_SEC
    read -p "GOOGLE_CLIENT_ID: " GOOGLE_ID
    read -p "GOOGLE_CLIENT_SECRET: " GOOGLE_SEC
    
    echo "Creating .env file..."
    cat <<EOT >> .env
NODE_ENV=production
STRIPE_SECRET_KEY=$STRIPE_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=$STRIPE_PUB_KEY
AUTH_SECRET=$AUTH_SEC
GOOGLE_CLIENT_ID=$GOOGLE_ID
GOOGLE_CLIENT_SECRET=$GOOGLE_SEC
DATABASE_URL="file:/app/prisma/dev.db"
EOT
    echo "✅ .env created!"
else
    echo "✅ .env file found."
fi

# 2. Check Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker not found. Please install Docker first."
    exit 1
fi

# 3. Pull and Run
echo "📦 Building and Starting Container..."
echo "This might take 2-3 minutes..."
docker compose up -d --build

echo ""
echo "🎉 DEPLOYMENT COMPLETE!"
echo "Your site should be live at: http://$(curl -s ifconfig.me):3000"
