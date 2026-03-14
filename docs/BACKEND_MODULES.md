# Backend Module Documentation

## Overview

This document describes the core backend modules and their functionality.

## Grade Converter Module

**File**: `backend/modules/grade_converter.py`

### Functions

#### `convert_grade_to_points(grade: str) -> int`
Converts KCSE letter grades to KUCCPS numerical points (1-12 scale).

**Example**:
```python
from modules.grade_converter import convert_grade_to_points

points = convert_grade_to_points('A')  # Returns 12
points = convert_grade_to_points('C+')  # Returns 7
```

#### `calculate_mean_grade(grades_list: list) -> dict`
Calculates mean KUCCPS points from list of grades.

**Example**:
```python
result = calculate_mean_grade(['A', 'B+', 'B', 'C+'])
# Returns: {
#   'mean_points': 8.5,
#   'total_points': 34,
#   'subject_count': 4,
#   'category': {...}
# }
```

---

## Cluster Calculator Module

**File**: `backend/modules/cluster_calculator.py`

### Functions

#### `analyze_programme_fit(student_subjects, student_grades, programme_name) -> dict`
Analyzes how well a student's subjects fit a specific programme.

**Example**:
```python
from modules.cluster_calculator import analyze_programme_fit

result = analyze_programme_fit(
    ['Mathematics', 'Physics', 'Chemistry', 'Biology'],
    {'Mathematics': 12, 'Physics': 10, 'Chemistry': 9, 'Biology': 8},
    'Computer Science'
)
```

---

## Eligibility Engine Module

**File**: `backend/modules/eligibility_engine.py`

### Class: EligibilityEngine

Main engine for determining student eligibility.

#### Methods

**`determine_full_eligibility(student_data) -> dict`**

Comprehensive eligibility check.

**`generate_recommendation(eligibility_report) -> dict`**

Creates human-readable recommendations.

---

## OTP Authentication Module

**File**: `backend/modules/otp_authentication.py`

### Class: OTPManager

Manages OTP generation and verification.

#### Methods

**`request_otp(identifier, phone_number) -> dict`**

Main entry point for OTP requests. Generates, stores, and sends OTP.

**`verify_otp(identifier, otp_code) -> dict`**

Verifies submitted OTP code with expiry and attempt checking.

---

## PDF Generator Module

**File**: `backend/modules/pdf_generator.py`

### Class: PDFReportGenerator

Generates placement advisory reports.

#### Methods

**`generate_report_data(student_data, eligibility_report) -> dict`**

Formats data for report.

**`create_pdf_file(report_data, output_path) -> dict`**

Creates downloadable PDF document.

---

## Testing Modules

### Test Grade Conversion

```python
# test_grade_converter.py
from modules.grade_converter import convert_grade_to_points, calculate_mean_grade

def test_grade_conversion():
    assert convert_grade_to_points('A') == 12
    assert convert_grade_to_points('C+') == 7
    assert convert_grade_to_points('E') == 1

def test_mean_calculation():
    result = calculate_mean_grade(['A', 'A', 'B+', 'B'])
    assert result['mean_points'] == 10.25
```

### Run Tests

```bash
cd backend
python -m pytest tests/ -v
```

---

## Adding New Modules

1. Create Python file in `backend/modules/`
2. Document functions with docstrings
3. Add unit tests in `backend/tests/`
4. Update this documentation

---

## Module Dependencies

```
grade_converter.py (No dependencies)
    ↓
cluster_calculator.py (Depends on: grade_converter)
    ↓
eligibility_engine.py (Depends on: grade_converter, cluster_calculator)
    ↓
placement_routes.py (Depends on: eligibility_engine, pdf_generator)
```
