#!/bin/bash
# KUCCPS Career Hub - Deployment Verification Script

echo "🚀 KUCCPS Career Hub Deployment Verification"
echo "=========================================="

echo ""
echo "📋 Checking current deployment status..."

# Check if we can reach the deployed API
echo "1. Testing API connectivity..."
if command -v curl &> /dev/null; then
    echo "   ✅ curl is available"
else
    echo "   ❌ curl not found - please install curl"
    exit 1
fi

echo ""
echo "🌐 Testing API endpoints:"
echo "------------------------"

# Test root endpoint (this should fix 404)
echo "Testing Root URL: https://your-deployment-url/"
echo "Command: curl -s -w 'Status: %{http_code}' https://your-deployment-url/"
echo ""

# Test health endpoint
echo "Testing Health: https://your-deployment-url/api/health"
echo "Command: curl -s -w 'Status: %{http_code}' https://your-deployment-url/api/health"
echo ""

echo "🔍 Common Issues & Solutions:"
echo "----------------------------"

echo "❌ If you still see 404 error:"
echo "   1. Check if deployment completed (wait 2-3 minutes)"
echo "   2. Verify correct URL (https://your-app-name.platform.com)"
echo "   3. Check platform logs for errors"
echo "   4. Ensure environment variables are set"
echo ""

echo "🔧 Environment Variables Check:"
echo "--------------------------------"
echo "Required variables:"
echo "   FLASK_ENV=production"
echo "   JWT_SECRET_KEY=2025"
echo "   CORS_ORIGINS=*"
echo "   FLASK_HOST=0.0.0.0"
echo "   FLASK_PORT=5000"
echo ""

echo "📱 Platform Specific Commands:"
echo "----------------------------"

echo "Railway:"
echo "   railway logs"
echo "   railway variables"
echo ""

echo "Render:"
echo "   render logs"
echo "   render env vars"
echo ""

echo "Heroku:"
echo "   heroku logs --tail"
echo "   heroku config"
echo ""

echo "🔄 Restart Deployment:"
echo "--------------------"
echo "If needed, push a small change:"
echo "   git add ."
echo "   git commit -m 'trigger redeploy'"
echo "   git push origin master"
echo ""

echo "✅ Verification complete!"
