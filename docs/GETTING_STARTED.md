# Getting Started with KUCCPS Career Hub

## Quick Start Guide

Complete setup of the KUCCPS Career Hub from development to deployment.

## Prerequisites

- **Python 3.8+** - For backend
- **Node.js 14+** - For frontend
- **PostgreSQL 12+** - For database
- **Git** - For version control
- **pip** - Python package manager
- **npm** - Node package manager

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/your-repo/kuccps-career-hub.git
cd kuccps-career-hub
```

### 2. Setup Environment Variables

Copy configuration templates:

```bash
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Update `.env` files with your actual values.

### 3. Setup Database

#### Create PostgreSQL Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE kuccps_career_hub;

# Exit PostgreSQL
\q
```

#### Load Database Schema

```bash
# Load schema
psql -U postgres -d kuccps_career_hub -f database/schema.sql

# Load sample data
psql -U postgres -d kuccps_career_hub -f database/seed_data.sql
```

#### Verify Database

```bash
psql -U postgres -d kuccps_career_hub

# List tables
\dt

# Check record counts
SELECT COUNT(*) FROM kuccps_institutions;
SELECT COUNT(*) FROM kuccps_courses;

\q
```

### 4. Setup Backend (Flask)

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Linux/Mac:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Update .env with database connection
# DATABASE_URL=postgresql://user:password@localhost:5432/kuccps_career_hub

# Run Flask application
python app.py
```

Backend should now be running at `http://localhost:5000`

### 5. Setup Frontend (React)

In a new terminal:

```bash
# Navigate to frontend
cd frontend

# Create .env file
cp .env.example .env

# Update .env with API URL
# REACT_APP_API_URL=http://localhost:5000/api

# Install dependencies
npm install

# Start React application
npm start
```

Frontend should now be running at `http://localhost:3000`

### 6. Verify Installation

Open your browser and visit:

```
Frontend: http://localhost:3000
Backend API: http://localhost:5000/api/health
```

You should see:
- React interface with input form
- API health check response

---

## Development Workflow

### Normal Development Day

```bash
# Terminal 1 - Backend
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
python app.py

# Terminal 2 - Frontend
cd frontend
npm start

# Terminal 3 - Database (if needed)
psql -U postgres -d kuccps_career_hub
```

### Making Changes

#### Backend Changes
1. Modify Python files in `backend/`
2. Flask dev server auto-reloads
3. Test with Postman or curl

#### Frontend Changes
1. Modify React files in `frontend/src/`
2. React dev server auto-reloads
3. Browser updates automatically

#### Database Changes
1. Modify SQL files in `database/`
2. Recreate database: `psql -d kuccps_career_hub -f database/schema.sql`
3. Reseed data: `psql -d kuccps_career_hub -f database/seed_data.sql`

---

## Testing the Application

### Manual Testing Steps

1. **Open Frontend**
   - Go to `http://localhost:3000`

2. **Enter Student Information**
   - Student ID: `STU001`
   - Name: `John Mbugua`
   - Select all 8 subjects
   - Enter grades for each

3. **Submit for Analysis**
   - Click "Analyze Eligibility"
   - Wait for results

4. **View Results**
   - Should see eligible programmes
   - Should see recommendations
   - Should see PDF download button

5. **Download Report**
   - Click "Download Advisory Report (PDF)"
   - PDF should generate

### API Testing with curl

```bash
# Test health check
curl http://localhost:5000/api/health

# Test placement analysis
curl -X POST http://localhost:5000/api/placement/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "student_id": "STU001",
    "name": "Test Student",
    "subjects": ["Mathematics", "Physics"],
    "grades": {"Mathematics": "A", "Physics": "B+"}
  }'
```

### Testing with Postman

1. Download [Postman](https://www.postman.com/downloads/)
2. Import API from `docs/API_DOCUMENTATION.md`
3. Test each endpoint
4. Create test collection

---

## Troubleshooting

### Database Connection Issues

```bash
# Check PostgreSQL is running
psql -U postgres -c "SELECT version();"

# Check database exists
psql -U postgres -l

# Test connection with full URL
psql "postgresql://user:password@localhost:5432/kuccps_career_hub"
```

### Backend Won't Start

```bash
# Check Python version
python --version  # Should be 3.8+

# Check virtual environment activated
which python  # Should show venv path

# Reinstall dependencies
pip install -r requirements.txt --force-reinstall

# Check port 5000 is free
lsof -i :5000  # On Mac/Linux
netstat -ano | findstr :5000  # On Windows
```

### Frontend Won't Start

```bash
# Check Node version
node --version  # Should be 14+

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check port 3000 is free
lsof -i :3000  # On Mac/Linux
```

### CORS Errors

If you see CORS issues:
1. Check backend `.env` CORS_ORIGINS setting
2. Ensure frontend API URL matches backend location
3. Check browser console for specific errors

---

## Deployment

### Prepare for Production

1. **Update Environment Variables**
   ```bash
   # Set production values
   FLASK_ENV=production
   REACT_APP_ENV=production
   DATABASE_URL=<production_db_url>
   ```

2. **Build Frontend**
   ```bash
   cd frontend
   npm run build
   ```

3. **Collect Static Files**
   ```bash
   cd backend
   # Configure to serve built frontend
   ```

### Deploy Backend

**Option 1: Render**
```bash
# Create render.yaml
# Push to GitHub
git push origin main
```

**Option 2: AWS**
```bash
# Use AWS Elastic Beanstalk or EC2
# Configure with RDS PostgreSQL
```

### Deploy Frontend

**Option 1: Vercel**
```bash
npm install -g vercel
vercel --prod
```

**Option 2: Netlify**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Configure Database

```bash
# Create production database on AWS RDS
# Run migrations and seed data
psql -h <rds-endpoint> -d kuccps_career_hub -f database/schema.sql
```

---

## Documentation

- **Architecture**: See [ARCHITECTURE.md](../docs/ARCHITECTURE.md)
- **API Reference**: See [API_DOCUMENTATION.md](../docs/API_DOCUMENTATION.md)
- **Database Schema**: See [database/schema.sql](../database/schema.sql)

---

## Support

For issues or questions:
- Create GitHub Issue
- Email: support@kuccpscareerhub.dev
- Check existing documentation

---

## Next Steps

1. ✅ Install and setup locally
2. ✅ Test with sample data
3. ✅ Read API documentation
4. ✅ Modify and extend functionality
5. ✅ Deploy to production

---

## Security Notes

⚠️ **Before going live:**

1. Change all default passwords
2. Update JWT secrets
3. Enable HTTPS/SSL
4. Configure CORS properly
5. Set up database backups
6. Enable rate limiting
7. Add logging and monitoring
8. Review security checklist

---

## Version Information

- **Created**: February 2026
- **Last Updated**: February 2026
- **Status**: Development
- **License**: MIT
