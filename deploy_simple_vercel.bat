@echo off
REM 🚀 KUCCPS Career Hub - Simple Vercel Deployment

echo 🎯 KUCCPS Career Hub - Simple Vercel Deployment
echo ===============================================

echo.
echo 🚀 Step 1: Deploy Backend to Vercel
echo ------------------------------------

cd backend

echo 🗑️ Removing old vercel.json if exists...
if exist vercel.json del vercel.json

echo 🚀 Deploying backend...
vercel --prod --name kuccps-api

echo.
echo 🎨 Step 2: Deploy Frontend to Vercel
echo -------------------------------------

cd ..\frontend

echo 🚀 Deploying frontend...
vercel --prod --name kuccps-career-hub

echo.
echo ✅ DEPLOYMENT COMPLETE!
echo ====================
echo.
echo 🔗 Your URLs:
echo    Backend:  https://kuccps-api.vercel.app
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
