@echo off
REM 🚀 KUCCPS Career Hub - Complete 404 Fix Deployment Script (Windows)

echo 🎯 KUCCPS Career Hub - 404 Fix Deployment
echo ==========================================

REM Check if Railway CLI is installed
where railway >nul 2>nul
if %errorlevel% neq 0 (
    echo 📦 Installing Railway CLI...
    npm install -g @railway/cli
)

REM Check if Wrangler is installed
where wrangler >nul 2>nul
if %errorlevel% neq 0 (
    echo 📦 Installing Wrangler CLI...
    npm install -g wrangler
)

echo.
echo 🚀 Step 1: Deploy Backend to Railway
echo ------------------------------------

REM Navigate to backend directory
cd backend

REM Login to Railway (if not already logged in)
echo 🔐 Checking Railway login status...
railway whoami >nul 2>nul
if %errorlevel% neq 0 (
    echo 🔑 Please login to Railway:
    railway login
)

REM Deploy backend
echo 🚀 Deploying backend to Railway...
railway up --service-name kuccps-api

REM Wait for deployment and get URL
echo ⏳ Waiting for deployment to complete...
timeout /t 30 /nobreak >nul

REM Get the actual Railway URL
echo 🔍 Getting Railway deployment URL...
for /f "tokens=*" %%i in ('railway domains --service-name kuccps-api 2^>nul') do set RAILWAY_URL=%%i

if "%RAILWAY_URL%"=="" (
    echo ⚠️  Could not auto-detect Railway URL, using default...
    set RAILWAY_URL=kuccps-api.up.railway.app
)

echo ✅ Backend deployed to: https://%RAILWAY_URL%

REM Test backend
echo 🧪 Testing backend deployment...
curl -s https://%RAILWAY_URL%/ | findstr "KUCCPS Career Hub API" >nul
if %errorlevel% equ 0 (
    echo ✅ Root endpoint working
) else (
    echo ❌ Root endpoint not responding
)

curl -s https://%RAILWAY_URL%/api/health | findstr "healthy" >nul
if %errorlevel% equ 0 (
    echo ✅ Health endpoint working
) else (
    echo ❌ Health endpoint not responding
)

echo.
echo 🎨 Step 2: Update Frontend Configuration
echo --------------------------------------

cd ..\frontend

REM Update frontend API URL
echo REACT_APP_API_URL=https://%RAILWAY_URL%/api > .env.production
echo REACT_APP_ENV=production >> .env.production

echo ✅ Frontend API URL updated to: https://%RAILWAY_URL%/api

echo.
echo 🏗️ Step 3: Build Frontend
echo ------------------------

REM Install dependencies
echo 📦 Installing frontend dependencies...
npm install

REM Build frontend
echo 🔨 Building frontend...
npm run build

echo.
echo 🌐 Step 4: Deploy Frontend to Cloudflare Pages
echo -------------------------------------------

REM Deploy to Cloudflare Pages
echo 🚀 Deploying frontend to Cloudflare Pages...
wrangler pages deploy build --project-name kuccps-career-hub

echo.
echo ✅ DEPLOYMENT COMPLETE!
echo ====================
echo.
echo 🔗 Your URLs:
echo    Backend API: https://%RAILWAY_URL%
echo    Frontend:   https://kuccps-career-hub.pages.dev
echo.
echo 🧪 Test Commands:
echo    curl https://%RAILWAY_URL%/
echo    curl https://%RAILWAY_URL%/api/health
echo.
echo 🌐 Visit your application: https://kuccps-career-hub.pages.dev
echo.
echo 🎉 404 Error should be completely resolved!
pause
