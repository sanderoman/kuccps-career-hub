# KUCCPS Career Hub - Project README

## 🎯 Project Overview

KUCCPS Career Hub is an independent placement advisory tool for KCSE students, providing comprehensive course and institution information with placement analysis.

## 🚀 Quick Start

### Prerequisites
- Python 3.9+
- Node.js 18+
- Railway CLI (for deployment)
- Wrangler CLI (for Cloudflare Pages)

### Local Development

#### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
python app.py
```

#### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env.local
npm start
```

## 🌐 Deployment

### Option 1: Railway + Cloudflare Pages (Recommended)
```bash
# Deploy Backend
cd backend
railway login
railway up --service-name kuccps-api

# Deploy Frontend
cd frontend
npm run build
wrangler pages deploy build --project-name kuccps-career-hub
```

### Option 2: Vercel
```bash
# Deploy Backend
cd backend
vercel --prod

# Deploy Frontend
cd frontend
vercel --prod
```

### Option 3: Docker
```bash
docker-compose up -d
```

## 📁 Project Structure

```
kuccps/
├── backend/                 # Flask API
│   ├── app.py              # Main application
│   ├── routes/             # API routes
│   ├── modules/            # Business logic
│   ├── requirements.txt    # Python dependencies
│   └── Dockerfile          # Docker configuration
├── frontend/               # React App
│   ├── src/                # React components
│   ├── public/             # Static assets
│   ├── package.json        # Node dependencies
│   └── Dockerfile          # Docker configuration
├── docker-compose.yml      # Docker Compose setup
└── README.md               # This file
```

## 🔧 Environment Variables

### Backend (.env)
```
FLASK_ENV=production
JWT_SECRET_KEY=2025
CORS_ORIGINS=*
DATABASE_URL=sqlite:///kuccps_career_hub.db
```

### Frontend (.env)
```
REACT_APP_API_URL=https://your-backend-url/api
REACT_APP_ENV=production
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
python test_routes.py
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📊 API Endpoints

- `GET /` - API information
- `GET /api/health` - Health check
- `GET /api/auth/health` - Auth service health
- `POST /api/auth/request-otp` - Request OTP
- `POST /api/auth/verify-otp` - Verify OTP
- `GET /api/courses` - Get all courses
- `GET /api/institutions` - Get all institutions
- `POST /api/placement/analyze` - Analyze placement

## 🚨 Troubleshooting

### Common Issues
1. **404 Errors**: Check deployment platform compatibility
2. **CORS Issues**: Verify CORS_ORIGINS configuration
3. **Database Issues**: Check DATABASE_URL format
4. **Environment Variables**: Ensure all required variables are set

### Support
- Check deployment logs
- Verify environment variables
- Test API endpoints individually
- Check network connectivity

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request
