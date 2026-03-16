@echo off
REM 🚀 KUCCPS Career Hub - Final Vercel Deployment

echo 🎯 KUCCPS Career Hub - Final Vercel Deployment
echo ===============================================

echo.
echo 🚀 Step 1: Deploy Backend to Vercel
echo ------------------------------------

cd backend

echo 🗑️ Removing old vercel.json if exists...
if exist vercel.json del vercel.json

echo 🚀 Deploying backend...
vercel --prod

echo.
echo 🎨 Step 2: Deploy Frontend to Vercel
echo -------------------------------------

cd ..\frontend

echo 🚀 Deploying frontend...
vercel --prod

echo.
echo ✅ DEPLOYMENT COMPLETE!
echo ====================
echo.
echo 🔗 Your URLs:
echo    Backend:  Will be shown after deployment
echo    Frontend: Will be shown after deployment
echo.
echo 🎉 Check the deployment output above for your URLs!
echo.
echo 🌐 Your application should be available at the frontend URL
echo.
echo 🎉 404 Error should be completely resolved!
pause
