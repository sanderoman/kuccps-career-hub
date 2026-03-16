@echo off
REM 🚀 KUCCPS Career Hub - Vercel Deployment Script (Windows)

echo 🎯 KUCCPS Career Hub - Vercel Deployment
echo =========================================

REM Check if Vercel CLI is installed
where vercel >nul 2>nul
if %errorlevel% neq 0 (
    echo 📦 Installing Vercel CLI...
    npm install -g vercel
)

echo.
echo 🚀 Step 1: Deploy Backend to Vercel
echo ------------------------------------

cd backend

echo 🚀 Deploying backend to Vercel...
vercel --prod

echo.
echo 🎨 Step 2: Deploy Frontend to Vercel
echo -------------------------------------

cd ..\frontend

echo 🚀 Deploying frontend to Vercel...
vercel --prod

echo.
echo ✅ DEPLOYMENT COMPLETE!
echo ====================
echo.
echo 🔗 Your URLs:
echo    Backend: https://kuccps-api.vercel.app
echo    Frontend: https://kuccps-career-hub.vercel.app
echo.
echo 🧪 Test Commands:
echo    curl https://kuccps-api.vercel.app/
echo    curl https://kuccps-api.vercel.app/api/health
echo.
echo 🌐 Visit your application: https://kuccps-career-hub.vercel.app
echo.
echo 🎉 404 Error should be completely resolved!
pause
