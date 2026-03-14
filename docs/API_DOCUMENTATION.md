# KUCCPS Career Hub - API Documentation

## Base URL

- **Development**: `http://localhost:5000/api`
- **Production**: `https://api.kuccpscareerhub.dev/api`

## Authentication

Currently using OTP-based authentication. Include OTP verification status in request headers if required.

## Response Format

All responses follow this format:

```json
{
  "success": true/false,
  "data": { /* Response data */ },
  "error": "Error message if applicable",
  "timestamp": "ISO 8601 timestamp"
}
```

---

## Authentication Endpoints

### Request OTP

**Endpoint**: `POST /auth/request-otp`

**Request Body**:
```json
{
  "student_id": "string",
  "phone_number": "string"
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "OTP sent to +254712****",
  "identifier": "STU001",
  "expiry_minutes": 5
}
```

**Error Responses**:
- 400: Missing required fields
- 500: SMS sending failed

---

### Verify OTP

**Endpoint**: `POST /auth/verify-otp`

**Request Body**:
```json
{
  "student_id": "string",
  "otp_code": "string"
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "OTP verified successfully"
}
```

**Error Responses**:
- 400: Invalid OTP or expired
- 429: Too many attempts

---

## Placement Analysis Endpoints

### Analyze Student Placement

**Endpoint**: `POST /placement/analyze`

**Description**: Main endpoint for analyzing student eligibility for courses

**Request Body**:
```json
{
  "student_id": "STU001",
  "name": "John Doe",
  "subjects": ["Mathematics", "Physics", "Chemistry", "Biology", "English", "Kiswahili", "History", "Geography"],
  "grades": {
    "Mathematics": "A",
    "Physics": "B+",
    "Chemistry": "B",
    "Biology": "B-",
    "English": "A-",
    "Kiswahili": "C+",
    "History": "C",
    "Geography": "C+"
  }
}
```

**Response** (200):
```json
{
  "success": true,
  "student_data": {
    "student_id": "STU001",
    "name": "John Doe",
    "subjects": [...],
    "grades": {...},
    "mean_points": 8.5,
    "subject_count": 8
  },
  "eligibility": {
    "mean_points": 8.5,
    "eligible_programme_levels": ["Degree"],
    "eligible_programmes": ["BSc Computer Science", "BSc Engineering"],
    "ineligible_programmes": [...]
  },
  "recommendation": {
    "recommendation": "Congratulations! You qualify for degree programmes...",
    "eligible_count": 15,
    "mean_points": 8.5,
    "next_steps": [...]
  }
}
```

**Eligibility Levels by Mean Grade**:
- **A (8.5+)**: Degree, Diploma, Certificate, Artisan
- **B (6.5-7.4)**: Diploma, Certificate, Artisan
- **C (4.5-5.4)**: Certificate, Artisan
- **D (1-3.4)**: Artisan only

---

### Generate Placement Report

**Endpoint**: `POST /placement/report`

**Request Body**:
```json
{
  "student_id": "STU001",
  "name": "John Doe",
  "subject_count": 8,
  "eligibility": {
    "mean_points": 8.5,
    "eligible_programme_levels": ["Degree"],
    "eligible_programmes": [...],
    "programme_analysis": [...]
  }
}
```

**Response** (200):
```json
{
  "success": true,
  "report": {
    "header": {
      "title": "KUCCPS Career Hub - Placement Advisory Report",
      "disclaimer": "...",
      "date": "25 February 2026"
    },
    "student_info": {...},
    "academic_analysis": {...},
    "recommendations": [...],
    "next_steps": [...],
    "footer": {...}
  }
}
```

---

### Download PDF Report

**Endpoint**: `POST /placement/report/download`

**Request Body**:
```json
{
  "report": {
    "header": {...},
    "student_info": {...},
    ...
  }
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "PDF report generation ready",
  "file_path": "placement_advisory_report.pdf"
}
```

---

## Course Endpoints

### Get All Courses

**Endpoint**: `GET /courses`

**Query Parameters**: None

**Response** (200):
```json
{
  "success": true,
  "total_courses": 45,
  "courses": [
    {
      "code": "1040123",
      "name": "BSc Computer Science",
      "level": "Degree",
      "institution_code": "1101",
      "min_cluster_score": 24,
      "cluster_subjects": ["Mathematics", "Physics", "Chemistry", "Computer Science"],
      "cutoff_2024": 24,
      "duration_years": 4
    },
    ...
  ]
}
```

---

### Get Specific Course

**Endpoint**: `GET /courses/<course_code>`

**Path Parameters**:
- `course_code` (string): Course code (e.g., "1040123")

**Response** (200):
```json
{
  "success": true,
  "course": {
    "code": "1040123",
    "name": "BSc Computer Science",
    ...
  }
}
```

**Error Responses**:
- 404: Course not found

---

### Search Courses

**Endpoint**: `GET /courses/search`

**Query Parameters**:
- `q` (string, optional): Search query
- `level` (string, optional): Programme level (Degree, Diploma, Certificate, Artisan)
- `institution_code` (string, optional): Filter by institution

**Example**: `GET /courses/search?q=computer&level=Degree`

**Response** (200):
```json
{
  "success": true,
  "query": {...},
  "results": [...],
  "count": 5
}
```

---

### Get Courses by Institution

**Endpoint**: `GET /courses/by-institution/<institution_code>`

**Response** (200):
```json
{
  "success": true,
  "institution_code": "1101",
  "courses": [...],
  "count": 25
}
```

---

## Institution Endpoints

### Get All Institutions

**Endpoint**: `GET /institutions`

**Response** (200):
```json
{
  "success": true,
  "total_institutions": 30,
  "institutions": [
    {
      "code": "1101",
      "name": "University of Nairobi",
      "type": "University",
      "location": "Nairobi",
      "website": "www.uonbi.ac.ke",
      "established": 1970,
      "total_courses": 150
    },
    ...
  ]
}
```

---

### Get Specific Institution

**Endpoint**: `GET /institutions/<institution_code>`

**Response** (200):
```json
{
  "success": true,
  "institution": {
    "code": "1101",
    "name": "University of Nairobi",
    ...
  }
}
```

---

### Search Institutions

**Endpoint**: `GET /institutions/search`

**Query Parameters**:
- `q` (string, optional): Search query
- `type` (string, optional): Institution type (University, College, Technical)
- `location` (string, optional): Location filter

**Response** (200):
```json
{
  "success": true,
  "query": {...},
  "results": [...],
  "count": 12
}
```

---

### Get Institutions by Type

**Endpoint**: `GET /institutions/by-type/<type>`

**Response** (200):
```json
{
  "success": true,
  "type": "University",
  "institutions": [...],
  "count": 25
}
```

---

### Get Institutions by Location

**Endpoint**: `GET /institutions/by-location/<location>`

**Response** (200):
```json
{
  "success": true,
  "location": "Nairobi",
  "institutions": [...],
  "count": 18
}
```

---

## Health Check Endpoints

### API Health

**Endpoint**: `GET /health`

**Response** (200):
```json
{
  "status": "healthy",
  "service": "KUCCPS Career Hub API"
}
```

---

## Error Handling

### Common Error Responses

**400 Bad Request**:
```json
{
  "success": false,
  "error": "student_id and phone_number are required"
}
```

**404 Not Found**:
```json
{
  "success": false,
  "error": "Resource not found"
}
```

**500 Internal Server Error**:
```json
{
  "success": false,
  "error": "Internal server error"
}
```

---

## Rate Limiting

- **Global**: 100 requests per minute per IP
- **Auth Endpoints**: 10 requests per minute for OTP requests
- **Placement Analysis**: 30 requests per minute

---

## CORS Configuration

Allowed origins (development):
- `http://localhost:3000`
- `http://localhost:3001`

Allowed origins (production):
- `https://kuccpscareerhub.vercel.app`
- `https://app.kuccpscareerhub.dev`

---

## API Versioning

Current version: **v1**

Future versions will use:
- `/api/v2/placement/analyze`
- `/api/v2/courses/...`

---

## Changelog

### Version 1.0.0 (February 2026)
- Initial release
- Auth endpoints
- Placement analysis
- Course search
- Institution search

---

## Support

For API issues or questions:
- Email: api-support@kuccpscareerhub.dev
- Status Page: https://status.kuccpscareerhub.dev
