#!/bin/bash
# 🚀 KUCCPS Career Hub - Complete 404 Fix Deployment Script

echo "🎯 KUCCPS Career Hub - 404 Fix Deployment"
echo "=========================================="

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "📦 Installing Railway CLI..."
    npm install -g @railway/cli
fi

# Check if Wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "📦 Installing Wrangler CLI..."
    npm install -g wrangler
fi

echo ""
echo "🚀 Step 1: Deploy Backend to Railway"
echo "------------------------------------"

# Navigate to backend directory
cd backend

# Login to Railway (if not already logged in)
echo "🔐 Checking Railway login status..."
if ! railway whoami &> /dev/null; then
    echo "🔑 Please login to Railway:"
    railway login
fi

# Deploy backend
echo "🚀 Deploying backend to Railway..."
railway up --service-name kuccps-api

# Get the deployed URL
BACKEND_URL=$(railway domains --service-name kuccps-api | head -n 1 | tr -d '\r\n')
echo "✅ Backend deployed to: https://$BACKEND_URL"

# Test backend
echo "🧪 Testing backend deployment..."
sleep 5
curl -s "https://$BACKEND_URL/" | head -c 200
echo ""
curl -s "https://$BACKEND_URL/api/health" | head -c 100
echo ""

echo ""
echo "🎨 Step 2: Update Frontend Configuration"
echo "--------------------------------------"

cd ../frontend

# Update frontend API URL
echo "REACT_APP_API_URL=https://$BACKEND_URL/api" > .env.production
echo "REACT_APP_ENV=production" >> .env.production

echo "✅ Frontend API URL updated to: https://$BACKEND_URL/api"

echo ""
echo "🏗️ Step 3: Build Frontend"
echo "------------------------"

# Install dependencies
echo "📦 Installing frontend dependencies..."
npm install

# Build frontend
echo "🔨 Building frontend..."
npm run build

echo ""
echo "🌐 Step 4: Deploy Frontend to Cloudflare Pages"
echo "-------------------------------------------"

# Deploy to Cloudflare Pages
echo "🚀 Deploying frontend to Cloudflare Pages..."
wrangler pages deploy build --project-name kuccps-career-hub

echo ""
echo "✅ DEPLOYMENT COMPLETE!"
echo "===================="
echo ""
echo "🔗 Your URLs:"
echo "   Backend API: https://$BACKEND_URL"
echo "   Frontend:   https://kuccps-career-hub.pages.dev"
echo ""
echo "🧪 Test Commands:"
echo "   curl https://$BACKEND_URL/"
echo "   curl https://$BACKEND_URL/api/health"
echo ""
echo "🌐 Visit your application: https://kuccps-career-hub.pages.dev"
echo ""
echo "🎉 404 Error should be completely resolved!"
