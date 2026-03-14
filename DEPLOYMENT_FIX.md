# KUCCPS Career Hub - Deployment Guide

## 🚀 Quick Deployment Fix for 404 Error

### **Problem Solved:**
✅ Added root route (`/`) to prevent 404 errors
✅ Enhanced CORS configuration for production
✅ Added production environment configuration
✅ Created deployment workflow

### **🔧 What Was Fixed:**

1. **Missing Root Route**: Added `/` endpoint that returns API info
2. **Production CORS**: Proper CORS configuration for deployment
3. **Environment Config**: Production-ready environment settings
4. **Error Handling**: Better 404 and 500 error responses

### **🌐 Test Your Deployment:**

#### **Backend API Test:**
```bash
curl https://your-deployment-url/
```

Should return:
```json
{
  "message": "KUCCPS Career Hub API",
  "version": "1.0.0",
  "endpoints": {
    "health": "/api/health",
    "auth": "/api/auth",
    "placement": "/api/placement",
    "courses": "/api/courses",
    "institutions": "/api/institutions"
  }
}
```

#### **Health Check:**
```bash
curl https://your-deployment-url/api/health
```

Should return:
```json
{
  "status": "healthy",
  "service": "KUCCPS Career Hub API"
}
```

### **🔧 Environment Variables:**

Create `.env` file in backend directory:
```env
FLASK_ENV=production
FLASK_HOST=0.0.0.0
FLASK_PORT=5000
DATABASE_URL=sqlite:///kuccps_career_hub.db
JWT_SECRET_KEY=2025
CORS_ORIGINS=*
```

### **🚀 Deployment Platforms:**

#### **Option 1: Railway**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

#### **Option 2: Render**
```bash
# Create render.yaml
services:
  - type: web
    name: kuccps-api
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: python app.py
    envVars:
      - key: FLASK_ENV
        value: production
      - key: JWT_SECRET_KEY
        value: 2025
```

#### **Option 3: Heroku**
```bash
# Install Heroku CLI
heroku create kuccps-career-hub
heroku buildpacks:set heroku/python
heroku config:set FLASK_ENV=production
heroku config:set JWT_SECRET_KEY=2025
git push heroku master
```

### **🔍 Debugging 404 Errors:**

If you still get 404 errors:

1. **Check Root Route**: Visit `https://your-domain.com/`
2. **Check API Routes**: Visit `https://your-domain.com/api/health`
3. **Verify Environment**: Ensure `FLASK_ENV=production`
4. **Check CORS**: Verify frontend domain is in CORS_ORIGINS
5. **Check Port**: Ensure port 5000 is exposed

### **📱 Frontend Configuration:**

Update your frontend `.env`:
```env
REACT_APP_API_URL=https://your-deployment-url/api
```

### **🔗 GitHub Repository:**
**https://github.com/sanderoman/kuccps-career-hub**

### **✅ Verification Checklist:**

- [ ] Backend returns JSON at root URL
- [ ] `/api/health` endpoint works
- [ ] CORS allows frontend domain
- [ ] Environment variables are set
- [ ] Frontend connects to API
- [ ] All API endpoints respond correctly

### **🆘 If Still Issues:**

1. Check deployment logs
2. Verify environment variables
3. Test individual endpoints
4. Check network configuration
5. Verify CORS settings

The 404 error should now be resolved with the root route and proper configuration! 🎉
