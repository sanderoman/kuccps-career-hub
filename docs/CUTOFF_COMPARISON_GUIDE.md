# Institutional Cutoff Comparison Feature Documentation

## Overview

The KUCCPS Career Hub now enables students to comprehensively compare their cluster points against official institutional cutoff points across ALL Kenya public and private higher learning institutions. This feature implementation aligns with official KUCCPS placement standards and provides:

1. **Public/Private Institution Filtering** - Access all public AND private institutions
2. **Programme-Level Cutoff Comparison** - Different logic for universities vs technical colleges
3. **Visual Gap Analysis** - Clear visualization of student cluster score vs institutional cutoffs
4. **Detailed Eligibility Breakdown** - Organized by programme level (Degree, Diploma, Certificate)

### Additional UI Enhancements

Before the core comparison steps, the web interface now includes:

- A **search bar** that opens Google results for any query (quick external lookup)
- A **highlight panel** showing pictures and names of the top 5 public and top 5 private Kenyan universities
- A floating **personal assistant chatbot** trained with basic KUCCPS-related responses
- Footer contact information with a **WhatsApp support line (0743315353)**

These additions aim to make the portal more engaging and provide ancillary support to users.

1. **Public/Private Institution Filtering** - Access all public AND private institutions
2. **Programme-Level Cutoff Comparison** - Different logic for universities vs technical colleges
3. **Visual Gap Analysis** - Clear visualization of student cluster score vs institutional cutoffs
4. **Detailed Eligibility Breakdown** - Organized by programme level (Degree, Diploma, Certificate)

## Key Features

### 1. Institutional Coverage (Public & Private)

#### Public Universities
- University of Nairobi
- Kenyatta University
- Moi University
- Jomo Kenyatta University of Agriculture and Technology
- And others (code: 1101-1115)

#### Private Universities
- Strathmore University
- Kenya Methodist University
- Catholic University of Eastern Africa
- And others (code: 1201-1210)

#### Public Technical Colleges
- Kenya Technical Trainer College
- Nairobi Institute of Technology
- Mombasa Technical College
- And others (code: 2101-2110)

#### Private Technical Colleges
- Inoorero University (Technical)
- And others (code: 2201-2204)

#### Public Diploma Colleges
- Kenya Institute of Mass Communication
- Public colleges (code: 3101-3104)

#### Private Diploma Colleges
- Private diploma colleges (code: 3201-3203)

### 2. Cutoff Comparison Logic

#### For University Degree Programmes
```
Student Eligibility = Student Cluster Score >= Institutional Cutoff Point

Key Fields:
- cluster_score_cutoff_2024: Official 2024 cutoff points
- cluster_score_cutoff_2025: Official 2025 cutoff points
- mean_grade_required_letter: Grade threshold (e.g., C+)

Example:
- Programme: BSc Computer Science (University of Nairobi)
- 2024 Cutoff: 28 points
- 2025 Cutoff: 29 points
- Student Score: 30 points
- Eligibility: ✓ Eligible (exceeds both 2024 and 2025 cutoffs)
- Gap: +2 (2025), +1 (2024)
```

#### For Diploma/Certificate Programmes
```
Student Eligibility = Student Cluster Score >= Minimum Cluster Score

Key Fields:
- cluster_score_cutoff_2024: Technical college standard (not year-specific)
- cluster_score_minimum: Minimum cluster score for programme
- cluster_subjects: Required subjects for the programme (e.g., Math, English, Physics, Chemistry)

Example:
- Programme: Diploma in Mechanical Engineering (Kenya Technical Trainer College)
- Minimum Cluster Score: 24 points
- Required Subjects: Math, Physics, English, Chemistry
- Student Score: 26 points
- Eligibility: ✓ Eligible (exceeds minimum)
- Gap: +2 (20% above requirement)
```

### 3. Cluster Score Calculation

```
Cluster Score = Sum of all KCSE subject grade points

KCSE Grade-to-Point Conversion:
A   = 12 points
A-  = 11 points
B+  = 10 points
B   = 9 points
B-  = 8 points
C+  = 7 points
C   = 6 points
C-  = 5 points
D+  = 4 points
D   = 3 points
D-  = 2 points
E   = 1 point

Example:
Student Grades: English (A), Math (B+), Physics (B), Chemistry (B), Biology (C+), History (C)
Cluster Score = 12 + 10 + 9 + 9 + 7 + 6 = 53 points
```

## API Endpoints

### Institution Filtering & Retrieval

#### Get All Institutions (with filter options)
```
GET /api/institutions
Query Parameters:
  - ownership: 'Public' or 'Private' (optional)
  - type: 'University', 'Technical College', or 'Diploma College' (optional)

Response:
{
  "success": true,
  "total_institutions": 45,
  "filter_applied": {
    "ownership": "Public",
    "type": "University"
  },
  "institutions": [
    {
      "code": "1101",
      "name": "University of Nairobi",
      "type": "University",
      "ownership": "Public",
      "location": "Nairobi",
      "county": "Nairobi",
      "is_accredited": true
    }
  ]
}
```

#### Get All PUBLIC Institutions
```
GET /api/institutions/public

Response includes:
- All public universities (code: 1101-1115)
- All public technical colleges (code: 2101-2110)
- All public diploma colleges (code: 3101-3104)
- Breakdown by type
```

#### Get All PRIVATE Institutions
```
GET /api/institutions/private

Response includes:
- All private universities (code: 1201-1210)
- All private technical colleges (code: 2201-2204)
- All private diploma colleges (code: 3201-3203)
- Breakdown by type
```

#### Search Institutions by Ownership
```
GET /api/institutions/by-ownership/{ownership}
Example: GET /api/institutions/by-ownership/Public
```

#### Get Universities (with optional ownership filter)
```
GET /api/institutions/universities?ownership=Public

Returns breakdown:
{
  "total_universities": 25,
  "public_universities": 15,
  "private_universities": 10,
  "by_ownership": {
    "public": [...],
    "private": [...]
  }
}
```

#### Get Technical Colleges
```
GET /api/institutions/technical-colleges?ownership=Private
```

#### Get Institution Statistics
```
GET /api/institutions/stats

Response:
{
  "total_institutions": 45,
  "by_ownership": {
    "public": 30,
    "private": 15
  },
  "by_type": {
    "universities": 25,
    "technical_colleges": 14,
    "diploma_colleges": 6
  },
  "by_ownership_and_type": {
    "public_universities": 15,
    "private_universities": 10,
    ...
  }
}
```

### Placement Comparison

#### Analyze Placement Eligibility
```
POST /api/placement/analyze

Request:
{
  "student_id": "STU001",
  "name": "John Doe",
  "subjects": {
    "English": "A",
    "Math": "B+",
    "Physics": "B",
    "Chemistry": "B",
    "Biology": "C+",
    "History": "C"
  }
}

Response Includes:
{
  "cluster_score": 53,
  "placement_comparison": {
    "eligible_programmes": [
      {
        "code": "1040123",
        "name": "BSc Computer Science",
        "institution_code": "1101",
        "institution_name": "University of Nairobi",
        "programme_level": "Degree",
        "cluster_score_cutoff_2024": 28,
        "cluster_score_cutoff_2025": 29,
        "cluster_subjects": ["Math", "Physics", "Chemistry", "English"]
      }
    ],
    "ineligible_programmes": [
      {
        "code": "2040456",
        "name": "Diploma in Advanced Engineering",
        "gap": "Below by 5 points"
      }
    ],
    "placement_summary": "Based on your cluster score..."
  }
}
```

#### Compare Specific Programme
```
POST /api/placement/compare-programmes

Request:
{
  "cluster_score": 53,
  "filters": {
    "ownership": "Public",
    "level": "Degree"
  }
}

Response:
{
  "comparable_programmes": [
    {
      "code": "1040123",
      "comparison_result": "ELIGIBLE",
      "gap_2024": 25,
      "gap_2025": 24
    }
  ]
}
```

#### Get Programme Details
```
GET /api/placement/programme/{programme_code}

Example: GET /api/placement/programme/1040123

Response:
{
  "code": "1040123",
  "name": "BSc Computer Science",
  "institution_code": "1101",
  "programme_level": "Degree",
  "cluster_score_cutoff_2024": 28,
  "cluster_score_cutoff_2025": 29,
  "cluster_score_minimum": 24,
  "mean_grade_required_letter": "C+",
  "duration_years": 4,
  "intake_capacity": 150,
  "description": "4-year degree programme...",
  "cluster_subjects": ["Math", "Physics", "Chemistry", "English"],
  "explanation": {
    "cutoff_2024": "Official KUCCPS 2024 cutoff requiring 28 cluster points...",
    "cutoff_2025": "Projected 2025 cutoff requiring 29 cluster points..."
  }
}
```

## Frontend Components

### 1. GradeInputForm
- Allows students to input KCSE results
- Collects subject names and grades
- Calculates cluster score automatically
- Triggers placement analysis

### 2. InstitutionFilter
- Displays all public and private institutions
- Filters by ownership (Public/Private/All)
- Filters by type (University/Technical/Diploma/All)
- Shows institution count by category
- Navigable institution list with details

### 3. PlacementComparisonResults
- Displays detailed cutoff comparison results
- Organized by programme level (tabs)
- Visual gap indicator showing:
  - Student cluster score vs cutoff 2024/2025
  - Colour-coded eligibility (green = eligible, red = ineligible)
  - Gap calculation (+/- points from cutoff)
- Programme details including:
  - Institution name and type
  - Ownership (Public/Private badge)
  - Cluster subject requirements
  - Required mean grade
- Download PDF advisory report

### 4. App Component (Updated)
- 3-step workflow:
  1. Enter Grades (GradeInputForm)
  2. Select Institutions (InstitutionFilter)
  3. View Results (PlacementComparisonResults)
- Navigation between steps
- Maintains state across all components

## Database Schema

### kuccps_institutions Table
```sql
CREATE TABLE kuccps_institutions (
  code VARCHAR(10) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50), -- University, Technical College, Diploma College
  ownership VARCHAR(20), -- Public, Private
  location VARCHAR(100),
  county VARCHAR(100),
  website VARCHAR(255),
  established INT,
  contact_email VARCHAR(100),
  contact_phone VARCHAR(20),
  is_accredited BOOLEAN DEFAULT true,
  total_courses INT
);
```

### kuccps_courses Table
```sql
CREATE TABLE kuccps_courses (
  code VARCHAR(20) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  institution_code VARCHAR(10),
  programme_level VARCHAR(30), -- Degree, Diploma, Certificate
  cluster_score_cutoff_2024 INT, -- Official cutoff for 2024
  cluster_score_cutoff_2025 INT, -- Official cutoff for 2025
  cluster_score_minimum INT, -- Minimum for all technical programmes
  mean_grade_required_letter VARCHAR(3), -- C+, C, D+, etc.
  duration_years INT,
  intake_capacity INT,
  is_active BOOLEAN,
  description TEXT,
  cluster_subjects_count INT,
  FOREIGN KEY (institution_code) REFERENCES kuccps_institutions(code)
);
```

### cluster_subjects Table
```sql
CREATE TABLE cluster_subjects (
  id SERIAL PRIMARY KEY,
  course_code VARCHAR(20),
  subject_name VARCHAR(100),
  FOREIGN KEY (course_code) REFERENCES kuccps_courses(code)
);
```

## Usage Workflow

### For Students
1. **Enter KCSE Results**
   - Visit KUCCPS Career Hub
   - Input student ID, name
   - Enter KCSE subject grades

2. **View Cluster Score**
   - System calculates cluster score automatically
   - Displays mean grade category (e.g., Degree, Diploma, Certificate)

3. **Filter Institutions**
   - Choose between Public/Private institutions
   - Filter by type (University/Technical/Diploma)
   - View institutional distribution

4. **Review Cutoff Comparisons**
   - See eligible programmes organized by level
   - View exact cutoff points for each programme
   - See gap analysis (positive/negative from cutoff)
   - Identify which subjects are required

5. **Download Report**
   - Generate PDF advisory report
   - Download with all comparison details
   - Print or share with guidance counselors

## Data Validation

### Cluster Score Range
- Minimum: 12 points (all E grades)
- Maximum: 96 points (all A grades)

### Eligibility Thresholds
- **Degree Programmes**: Cluster score >= 2024/2025 cutoff (typically 24-35 points + C+ mean grade)
- **Diploma Programmes**: Cluster score >= minimum cutoff (typically 20-28 points + C mean grade)
- **Certificate Programmes**: Cluster score >= minimum cutoff (typically 12-20 points + D+ mean grade)

## Error Handling

### Invalid Cluster Score
```json
{
  "error": "Invalid cluster score",
  "message": "Cluster score must be between 12 and 96 points",
  "received": -5
}
```

### Institution Not Found
```json
{
  "error": "Institution not found",
  "code": "9999",
  "status": 404
}
```

### Programme Not Found
```json
{
  "error": "Programme not found",
  "code": "INVALID_CODE",
  "status": 404
}
```

## Testing Data

### Sample Student A (High Achiever)
```
Grades: A, A, B+, B, B-, C+
Cluster Score: 43 points
Eligible: All university degree programmes, most diplomas
```

### Sample Student B (Average)
```
Grades: B+, B, C+, C, C-, D+
Cluster Score: 29 points
Eligible: Most university degree programmes, all diplomas
```

### Sample Student C (Lower Tier)
```
Grades: C+, C, C-, D+, D, D-
Cluster Score: 18 points
Ineligible: Degree programmes
Eligible: Some diplomas, certificate programmes
```

## Performance Considerations

- Institutional data cached locally on frontend (45 institutions)
- Comparison calculations run client-side for real-time feedback
- API requests batched for institutional filtering
- PDF generation queued on backend to prevent timeout

## Future Enhancements

1. **County-Based Filtering** - Filter by student's home county
2. **Competitive Analysis** - Show historical branch cutoff data
3. **Career Mapping** - Link programmes to specific career paths
4. **SMS Notifications** - Alert students when cutoff changes
5. **Mobile App** - Native iOS/Android applications
6. **Integration** - Direct KUCCPS API integration (when available)

## Support & Documentation

- **API Documentation**: See `API_DOCUMENTATION.md`
- **Architecture**: See `ARCHITECTURE.md`
- **Backend Modules**: See `BACKEND_MODULES.md`
- **Getting Started**: See `GETTING_STARTED.md`
