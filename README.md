# KUCCPS Career Hub

> An independent career advisory tool designed to help Kenya KCSE candidates understand their placement eligibility across KUCCPS universities and colleges.

**⚠️ Disclaimer:** This system is an independent career advisory tool and is **not affiliated with KUCCPS** (Kenya Universities and Colleges Central Placement Service).

## Features

✅ KCSE Grade Input & Conversion  
✅ Mean Grade Calculation  
✅ Cluster Subject Analysis  
✅ Programme Eligibility Determination  
✅ KUCCPS 2024 Cutoff Comparison  
✅ OTP Verification for Security  
✅ PDF Placement Advisory Report Generation  
✅ Institution & Programme Database  
✅ Google-powered search bar for quick queries  
✅ In-app personal assistant chatbot  
✅ WhatsApp support line (0743315353)  
✅ Top 5 public/private university highlights on homepage  

## System Architecture

```
Students (KCSE Candidates)
         ↓ HTTPS
    Frontend UI (React)
         ↓ REST API
  Backend Logic (Flask)
         ↓
   PostgreSQL Database
```

### Core Modules

1. **Grade Conversion Module** - Converts KCSE grades to KUCCPS points (12-1 scale)
2. **Mean Grade Calculator** - Computes overall mean from all 8 subjects
3. **Cluster Calculator** - Identifies and scores cluster subjects for each course
4. **Eligibility Engine** - Determines programme eligibility (Degree/Diploma/Certificate/Artisan)
5. **Placement Comparator** - Compares student scores against KUCCPS 2024 cutoff points
6. **OTP Authentication** - SMS-based verification for security
7. **PDF Generator** - Creates downloadable placement advisory reports

## Technology Stack

### Backend
- **Framework:** Flask (Python)
- **Database:** PostgreSQL
- **Authentication:** OTP (SMS via Africa's Talking / Twilio)
- **PDF Generation:** ReportLab / pdfkit

### Frontend
- **Library:** React.js
- **Styling:** CSS3 / Tailwind CSS
- **State Management:** React Hooks
- **HTTP Client:** Axios

### Infrastructure
- **Frontend Hosting:** Vercel / Netlify
- **Backend Hosting:** Render / AWS
- **SSL/TLS:** Cloudflare

## Quick Start

### Prerequisites
- Python 3.8+
- Node.js 14+
- PostgreSQL 12+

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
python app.py
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

### Database Setup
```bash
psql -U postgres -d kuccps_career_hub -f database/schema.sql
psql -U postgres -d kuccps_career_hub -f database/seed_data.sql
```

## Project Structure

```
kuccps/
├── backend/              # Flask API application
├── frontend/             # React web application
├── database/             # SQL schemas and migrations
├── docs/                 # Technical documentation
└── README.md            # This file
```

## KUCCPS Logic

### Grade Eligibility

| Mean Grade | Eligible For |
|-----------|--------------|
| C+ and above | Degree, Diploma, Certificate, Artisan |
| C Plain to C- | Diploma, Certificate, Artisan |
| D+ and below | Certificate & Artisan only |

### Data Structure

- **Programme Code:** e.g., 1040123 (BSc Computer Science)
- **Institution Code:** e.g., 1101 (University of Nairobi)
- **Programme Level:** Degree / Diploma / Certificate / Artisan
- **Cluster Subjects:** 4 subjects based on programme requirements

## Security Features

🔐 OTP Verification  
🔐 Session Token Authentication  
🔐 HTTPS Encryption  
🔐 Input Validation  
🔐 Rate Limiting  
🔐 Student Data Privacy  

## API Documentation

See [API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md) for detailed endpoint specifications.

## Contributing

This is a development project. Follow these guidelines:
- Use descriptive commit messages
- Follow PEP 8 (Python) and ESLint (JavaScript) standards
- Write tests for new features
- Document API changes

## License

MIT License - See LICENSE file

## Support

For issues or questions about this advisory tool:
- 📧 Email: support@kuccpscareerhub.dev
- � WhatsApp: 0743315353 (use link https://wa.me/254743315353)
- �📋 Issues: GitHub Issues

---

**Last Updated:** February 2026  
**Version:** 1.0.0 (Development)
