@echo off
REM 🔍 KUCCPS Career Hub - 404 Diagnosis Script

echo 🔍 KUCCPS Career Hub - 404 Issue Diagnosis
echo =============================================

echo.
echo 📋 Testing local Flask application...
echo -----------------------------------

cd backend

echo 🧪 Testing Flask app locally...
python -c "
from app import create_app
app = create_app()
with app.test_client() as client:
    response = client.get('/')
    print(f'Root Status: {response.status_code}')
    print(f'Root Data: {response.get_json()}')
    
    response = client.get('/api/health')
    print(f'Health Status: {response.status_code}')
    print(f'Health Data: {response.get_json()}')
"

echo.
echo 🌐 Testing Railway connectivity...
echo --------------------------------

echo 📦 Checking if Railway CLI is installed...
where railway >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Railway CLI not found
    echo 📦 Installing Railway CLI...
    npm install -g @railway/cli
) else (
    echo ✅ Railway CLI found
)

echo.
echo 🔐 Checking Railway login status...
railway whoami >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Not logged in to Railway
    echo 🔑 Please run: railway login
    goto :skip_deploy
) else (
    echo ✅ Logged in to Railway
)

echo.
echo 🚀 Testing Railway deployment...
echo --------------------------------

echo 📋 Checking existing services...
railway services

echo.
echo 🌍 Getting current deployment URLs...
for /f "tokens=*" %%i in ('railway domains 2^>nul') do echo Current URL: https://%%i

echo.
echo 🔍 Common 404 Issues:
echo --------------------
echo 1. ❌ Wrong deployment platform (Flask on Cloudflare Pages)
echo 2. ❌ Backend not deployed to Railway
echo 3. ❌ Frontend pointing to localhost
echo 4. ❌ CORS configuration issues
echo 5. ❌ Environment variables not set

echo.
echo ✅ SOLUTIONS:
echo -------------
echo 1. 🚀 Deploy backend to Railway: railway up
echo 2. 🎨 Update frontend API URL to production
echo 3. 🌐 Deploy frontend to Cloudflare Pages
echo 4. 🧪 Test both backend and frontend

:skip_deploy
echo.
echo 🎯 Run deploy_fix.bat for complete solution
pause
