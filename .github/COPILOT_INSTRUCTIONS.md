# KUCCPS Career Hub - AI Assistant Instructions

**Project Type:** Full-stack Web Application (KUCCPS Placement Advisory System)  
**Tech Stack:** React (Frontend), Flask (Backend), PostgreSQL (Database)  
**Purpose:** Career advisory tool for KCSE students to explore university/college placement eligibility

## Project Overview

This application helps Kenya KCSE candidates understand their placement eligibility across KUCCPS programmes using official placement algorithms.

### Key Architecture Components

- **Frontend:** React.js with responsive UI for KCSE input and results visualization
- **Backend:** Flask API with business logic for grade conversion, cluster calculation, and eligibility determination
- **Database:** PostgreSQL with KUCCPS cutoff data, course information, and institution details
- **Security:** OTP verification, session management, HTTPS encryption

### Important Legal Notice

"This system is an independent career advisory tool and is not affiliated with KUCCPS."

## Folder Structure

```
kuccps/
├── .github/
│   └── COPILOT_INSTRUCTIONS.md
├── backend/
│   ├── app.py
│   ├── config.py
│   ├── requirements.txt
│   ├── modules/
│   ├── routes/
│   └── utils/
├── frontend/
│   ├── package.json
│   ├── src/
│   └── public/
├── database/
│   ├── schema.sql
│   ├── seed_data.sql
│   └── migrations/
├── docs/
│   ├── ARCHITECTURE.md
│   └── API_DOCUMENTATION.md
└── README.md
```

## Next Steps

1. Set up backend Flask environment
2. Set up frontend React project
3. Create database schema
4. Implement core modules (grade conversion, cluster calculator, eligibility engine)
5. Build API endpoints
6. Develop frontend pages
7. Configure OTP service
8. Testing and deployment

## Development Guidelines

- Follow PEP 8 for Python code
- Use React functional components with hooks
- Keep business logic in backend, UI logic in frontend
- Maintain security best practices for student data
- Document all API endpoints clearly
- Use environment variables for sensitive data
