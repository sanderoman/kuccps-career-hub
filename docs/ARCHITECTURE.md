# KUCCPS Career Hub - System Architecture

## Overview

The KUCCPS Career Hub is a full-stack web application designed to provide career advisory services to Kenya KCSE candidates. It analyzes student grades against KUCCPS placement criteria and provides personalized eligibility analysis.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    STUDENTS (KCSE Candidates)               │
└────────────────────────────┬────────────────────────────────┘
                             │ HTTPS
                             ▼
              ┌──────────────────────────────┐
              │   FRONTEND LAYER (React)     │
              │  • Grade Input Form          │
              │  • Results Display           │
              │  • PDF Download              │
              │  • Responsive UI             │
              └──────────────┬───────────────┘
                             │ REST API
                             ▼
          ┌────────────────────────────────────┐
          │  APPLICATION SERVER LAYER (Flask)  │
          │  Core Business Logic               │
          └──┬────────┬────────┬────────┬─────┘
             │        │        │        │
      ┌──────▼──┐ ┌──▼────┐ ┌──▼────┐ ┌──▼──────────┐
      │Grade    │ │Cluster│ │Eligi- │ │OTP & PDF   │
      │Converter│ │Calc.  │ │bility │ │Services    │
      └────────┘ └───────┘ └───────┘ └────────────┘
             │
      ┌──────▼──────────────────────────────┐
      │    DATA ACCESS LAYER                │
      │    • Models                         │
      │    • Database Queries               │
      │    • Caching Layer (Optional)       │
      └──────┬───────────────────────────────┘
             │
      ┌──────▼──────────────────────────────┐
      │    PERSISTENCE LAYER                │
      │    PostgreSQL Database              │
      │    • Students Table                 │
      │    • Grades Table                   │
      │    • Courses Table                  │
      │    • Institutions Table             │
      │    • OTP Codes Table                │
      └──────────────────────────────────────┘
```

## Component Architecture

### Backend (Flask)

#### Core Modules

1. **Grade Converter Module** (`modules/grade_converter.py`)
   - Converts KCSE letter grades (A-E) to KUCCPS numerical points (12-1)
   - Calculates mean grade from all subjects
   - Determines eligibility category based on mean

2. **Cluster Calculator Module** (`modules/cluster_calculator.py`)
   - Identifies cluster subjects for each course
   - Calculates cluster scores for student eligibility
   - Analyzes programme fit based on subject combinations

3. **Eligibility Engine Module** (`modules/eligibility_engine.py`)
   - Core logic for determining programme eligibility
   - Compares student scores with KUCCPS 2024 cutoff points
   - Generates eligibility reports
   - Provides personalized recommendations

4. **OTP Authentication Module** (`modules/otp_authentication.py`)
   - Generates 6-digit OTP codes
   - Manages OTP storage and expiry
   - Verifies OTP codes with attempt limiting
   - Integrates with SMS gateways

5. **PDF Generator Module** (`modules/pdf_generator.py`)
   - Formats placement analysis data for PDF export
   - Generates downloadable advisory reports
   - Creates human-readable recommendations

#### API Routes

```
/api/auth
├── POST /request-otp              # Request OTP for student
├── POST /verify-otp               # Verify OTP code
└── GET  /health                   # Health check

/api/placement
├── POST /analyze                  # Analyze student eligibility
├── POST /report                   # Generate placement report
├── POST /report/download          # Download PDF report
└── GET  /health                   # Health check

/api/courses
├── GET  /                         # Get all courses
├── GET  /<course_code>            # Get specific course
├── GET  /search                   # Search courses
├── GET  /by-institution/<code>    # Get courses by institution
└── GET  /health                   # Health check

/api/institutions
├── GET  /                         # Get all institutions
├── GET  /<code>                   # Get specific institution
├── GET  /search                   # Search institutions
├── GET  /by-type/<type>           # Get by institution type
├── GET  /by-location/<location>   # Get by location
└── GET  /health                   # Health check
```

### Frontend (React)

#### Component Structure

```
App.js (Main Container)
├── Header (Navigation & Title)
├── GradeInputForm (Controlled Component)
│   ├── Student Info Input
│   ├── Subject Selection (Checkboxes)
│   ├── Grade Selection (Dropdowns)
│   └── Submit Button
├── ResultsDisplay (Results Container)
│   ├── Student Summary Card
│   ├── Recommendation Card
│   ├── Eligible Programmes Grid
│   ├── Ineligible Programmes Grid
│   ├── Next Steps List
│   └── Download PDF Button
└── Footer
```

#### Services Layer

- **api.js** - Centralized API communication
  - `placementService` - Placement analysis endpoints
  - `authService` - Authentication endpoints

### Database Schema

#### Core Tables

1. **kcse_grades_points** - Grade to points conversion reference
2. **kuccps_institutions** - Institution information
3. **kuccps_courses** - Course/Programme details
4. **cluster_subjects** - Cluster subject requirements
5. **students** - Student information
6. **student_grades** - Student subject grades
7. **otp_codes** - OTP verification codes
8. **placement_analysis** - Analysis results storage
9. **user_sessions** - Session management

## Data Flow

### Placement Analysis Flow

```
1. Student Input (Frontend)
   ├── Student ID, Name
   ├── Select subjects
   └── Enter grades for each subject
        ▼
2. Grade Conversion (Backend)
   ├── Convert letter grades to points
   ├── Calculate mean grade
   └── Determine eligibility category
        ▼
3. Cluster Analysis (Backend)
   ├── Identify cluster subjects for each course
   ├── Calculate cluster scores
   └── Match against KUCCPS 2024 cutoff
        ▼
4. Eligibility Determination (Backend)
   ├── Check mean grade eligibility
   ├── Filter eligible programmes
   └── Generate recommendations
        ▼
5. Report Generation (Backend)
   ├── Format analysis data
   ├── Create PDF document
   └── Return to frontend
        ▼
6. Results Display (Frontend)
   ├── Show eligible programmes
   ├── Display recommendations
   ├── Offer PDF download
   └── Suggest next steps
```

## Security Architecture

### Authentication & Authorization

- **OTP Verification** - SMS-based student verification
- **Session Management** - Token-based session tracking
- **Rate Limiting** - Prevent brute force attacks

### Data Protection

- **HTTPS Encryption** - All communication encrypted
- **Input Validation** - Server-side validation of all inputs
- **SQL Injection Prevention** - Parameterized queries
- **CORS Configuration** - Restricted cross-origin requests

### Privacy

- **Data Minimization** - Only collect necessary data
- **Secure Storage** - Encrypted database fields
- **Audit Logging** - Track sensitive operations
- **GDPR Compliance** - Right to deletion implemented

## Deployment Architecture

### Development Environment

```
Frontend: React Dev Server (localhost:3000)
Backend: Flask Dev Server (localhost:5000)
Database: PostgreSQL Local (localhost:5432)
```

### Production Environment

```
Frontend: Vercel / Netlify
  ├── CDN Distribution
  └── Automatic HTTPS

Backend: Render / AWS EC2
  ├── Auto-scaling
  └── Load balancing

Database: AWS RDS PostgreSQL
  ├── Automated backups
  ├── Multi-AZ replication
  └── Read replicas

Storage: AWS S3
  └── PDF reports

DNS: Cloudflare
  ├── DDoS Protection
  ├── SSL/TLS
  └── Caching
```

## Technology Stack

### Backend
- **Framework**: Flask 2.3+
- **Database**: PostgreSQL 12+
- **ORM**: SQLAlchemy
- **SMS Gateway**: Twilio / Africa's Talking API
- **PDF Generation**: ReportLab
- **Authentication**: JWT Tokens

### Frontend
- **Library**: React 18+
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Charting**: Recharts (optional)
- **State Management**: React Hooks

### DevOps
- **Version Control**: Git
- **CI/CD**: GitHub Actions / GitLab CI
- **Containerization**: Docker
- **Logging**: ELK Stack (optional)
- **Monitoring**: New Relic / DataDog

## Scalability Considerations

1. **Database Optimization**
   - Indexing on frequently queried columns
   - Query optimization for bulk operations
   - Connection pooling with PgBouncer

2. **Caching Strategy**
   - Redis for session storage
   - Course/Institution data caching
   - API response caching

3. **Load Distribution**
   - Backend load balancing
   - Database read replicas
   - Static asset CDN

4. **Performance**
   - API pagination
   - Lazy loading on frontend
   - Image optimization
   - Minification & bundling

## Legal Disclaimer

⚠️ **Important**: This system is an independent career advisory tool and is **NOT affiliated with KUCCPS** (Kenya Universities and Colleges Central Placement Service). Users should verify information with official KUCCPS sources before making educational decisions.
