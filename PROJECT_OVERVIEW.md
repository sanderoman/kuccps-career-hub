# Project Overview

## KUCCPS Career Hub

**An independent career advisory tool for Kenya KCSE students**

### Quick Facts

- **Purpose**: Help KCSE candidates understand placement eligibility
- **Disclaimer**: Not affiliated with KUCCPS (Kenya Universities and Colleges Central Placement Service)
- **Status**: Development
- **Version**: 1.0.0

### Directory Structure

```
kuccps/
├── backend/                  # Flask API Server
│   ├── modules/             # Core business logic
│   ├── routes/              # API endpoints
│   ├── utils/               # Utility functions
│   ├── app.py               # Application entry point
│   ├── config.py            # Configuration
│   └── requirements.txt      # Dependencies
│
├── frontend/                 # React Web Application
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── App.js           # Main component
│   │   └── index.js         # Entry point
│   ├── public/              # Static files
│   └── package.json         # Dependencies
│
├── database/                 # PostgreSQL Database
│   ├── schema.sql           # Database schema
│   ├── seed_data.sql        # Initial data
│   └── migrations/          # Database migrations
│
├── docs/                     # Documentation
│   ├── ARCHITECTURE.md       # System architecture
│   ├── API_DOCUMENTATION.md  # API reference
│   ├── GETTING_STARTED.md    # Quick start guide
│   └── BACKEND_MODULES.md    # Module documentation
│
├── .github/
│   └── COPILOT_INSTRUCTIONS.md
│
├── .env.example              # Environment variables template
├── .gitignore               # Git ignore rules
├── README.md                # Project readme
├── setup.sh                 # Linux/Mac setup script
├── setup.bat                # Windows setup script
└── LICENSE                  # MIT License
```

### Key Components

#### Backend Modules

1. **Grade Converter** - Converts KCSE grades to KUCCPS points
2. **Cluster Calculator** - Analyzes subject combinations
3. **Eligibility Engine** - Determines programme eligibility
4. **OTP Authentication** - SMS verification
5. **PDF Generator** - Creates advisory reports

#### API Endpoints

```
POST   /api/auth/request-otp
POST   /api/auth/verify-otp
POST   /api/placement/analyze
POST   /api/placement/report
POST   /api/placement/report/download
GET    /api/courses
GET    /api/institutions
```

#### Frontend Pages

1. **Grade Input** - Student enters their KCSE results
2. **Results** - Displays eligibility analysis
3. **Report** - Shows placement advisory details

### Technology Stack

- **Frontend**: React 18, Tailwind CSS, Axios
- **Backend**: Flask, SQLAlchemy, PostgreSQL
- **Database**: PostgreSQL 12+
- **SMS**: Twilio / Africa's Talking
- **Deployment**: Vercel, Render, AWS

### Getting Started

```bash
# Clone repository
git clone https://github.com/your-repo/kuccps-career-hub.git
cd kuccps-career-hub

# Run setup script (Unix/Linux/Mac)
bash setup.sh

# Or on Windows
setup.bat

# Start services
# Terminal 1: Backend
cd backend && python app.py

# Terminal 2: Frontend
cd frontend && npm start

# Visit http://localhost:3000
```

### Key Features

✅ KCSE Grade to KUCCPS Points Conversion
✅ Mean Grade Calculation
✅ Cluster Subject Analysis
✅ Eligibility Determination
✅ Course Comparison
✅ Institution Search
✅ OTP Verification
✅ PDF Report Generation
✅ Responsive Web Design
✅ Placement Recommendations

### Architecture Highlights

- **Modular Design** - Separate concerns (grades, clusters, eligibility)
- **RESTful API** - Clean endpoint design
- **Database First** - Proper schema with migrations
- **Security** - OTP verification, input validation, HTTPS
- **Scalability** - Horizontal scaling support with caching

### Development Workflow

1. **Local Development**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000
   - Database: localhost:5432

2. **Testing**
   - Unit tests for modules
   - Integration tests for API
   - E2E tests for frontend

3. **Deployment**
   - Frontend to Vercel/Netlify
   - Backend to Render/AWS
   - Database to AWS RDS

### Important Notes

⚠️ **Legal Disclaimer**: This system is an independent career advisory tool and is NOT affiliated with KUCCPS. Always verify information with official sources before making decisions.

### Documentation

- [Architecture Overview](docs/ARCHITECTURE.md)
- [API Reference](docs/API_DOCUMENTATION.md)
- [Getting Started Guide](docs/GETTING_STARTED.md)
- [Backend Modules](docs/BACKEND_MODULES.md)

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write tests
5. Submit pull request

### License

MIT License - See LICENSE file for details

### Support

- 📧 Email: support@kuccpscareerhub.dev
- 🐛 Issues: GitHub Issues
- 💬 Discussions: GitHub Discussions

---

**Last Updated**: February 2026
**Version**: 1.0.0
**Status**: Development
