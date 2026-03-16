@echo off
REM 🚀 KUCCPS Career Hub - Vercel Deployment (Fixed)

echo 🎯 KUCCPS Career Hub - Vercel Deployment (Builds Removed)
echo =============================================================

echo.
echo 🚀 Step 1: Deploy Backend to Vercel
echo ------------------------------------

cd backend

echo 🚀 Deploying backend...
vercel --prod

echo.
echo 🎨 Step 2: Deploy Frontend to Vercel
echo -------------------------------------

cd ../frontend

echo 🚀 Deploying frontend...
vercel --prod

echo.
echo ✅ DEPLOYMENT COMPLETE!
echo ====================
echo.
echo 🔗 Your URLs:
echo    Backend:  Will be shown above
echo    Frontend: Will be shown above
echo.
echo 🎉 Builds sections removed - deployment should work now!
echo.
echo 🌐 Your application should be available at the frontend URL
echo.
pause
