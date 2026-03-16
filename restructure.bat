@echo off
REM 🧹 KUCCPS Career Hub - Restructure Project

echo 🎯 Restructuring project for proper Vercel deployment...
echo =====================================================

echo 🗑️ Removing unnecessary backend folder...
if exist backend (
    rmdir /s /q backend
    echo ✅ Backend folder removed
)

echo 📁 Creating API folder...
if not exist api mkdir api

echo 📝 Moving API files to api folder...
if exist api\index.ts del api\index.ts
echo export default async function handler(req, res) { > api\index.ts
echo   res.status(200).json({ >> api\index.ts
echo     message: 'KUCCPS Career Hub API', >> api\index.ts
echo     version: '1.0.0', >> api\index.ts
echo     endpoints: { >> api\index.ts
echo       health: '/api/health', >> api\index.ts
echo       auth: '/api/auth', >> api\index.ts
echo       placement: '/api/placement', >> api\index.ts
echo       courses: '/api/courses', >> api\index.ts
echo       institutions: '/api/institutions' >> api\index.ts
echo     } >> api\index.ts
echo   }); >> api\index.ts
echo   }; >> api\index.ts
echo   ✅ API serverless function created

echo 🗑️ Removing unnecessary frontend files...
if exist frontend\src\App.js del frontend\src\App.js
if exist frontend\src\index.js del frontend\src\index.js
if exist frontend\public\index.html del frontend\public\index.html

echo 📝 Moving frontend files to correct structure...
if not exist frontend\src\components mkdir frontend\src\components
xcopy /e /i /y frontend\src\pages\* frontend\src\components\
xcopy /e /i /y frontend\src\context\* frontend\src\context\
xcopy /e /i /y frontend\src\services\* frontend\src\services\
del frontend\src\pages\* /q

echo ✅ Frontend restructured

echo 📁 Creating package.json for root...
echo { > package.json
echo   "name": "kuccps-career-hub", >> package.json
echo   "version": "1.0.0", >> package.json
echo   "private": true, >> package.json
echo   "scripts": { >> package.json
echo     "dev": "cd frontend ^&^& npm run dev", >> package.json
echo     "build": "cd frontend ^&^& npm run build", >> package.json
echo     "preview": "cd frontend ^&^& npm run preview" >> package.json
echo   } >> package.json
echo   ✅ Root package.json created

echo.
echo ✅ PROJECT RESTRUCTURED FOR VERCEL DEPLOYMENT!
echo.
echo 📁 New Structure:
echo    kuccps-career-hub/
echo    ├── frontend/
echo    │   ├── vite.config.ts
echo    │   ├── package.json
echo    │   ├── index.html
echo    │   └── src/
echo    │       ├── main.tsx
echo    │       └── App.tsx
echo    │           └── components/
echo    │               └── pages/
echo    │                   └── context/
echo    │                       └── services/
echo    └── api/
echo        └── index.ts
echo.
echo 🚀 Ready for Vercel deployment!
echo.
pause
