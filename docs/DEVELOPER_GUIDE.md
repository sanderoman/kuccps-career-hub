# Course Recommendation Engine - Developer Documentation

## Architecture Overview

The **Advanced KUCCPS Course Recommendation System** is built with a modular architecture consisting of:

```
┌─────────────────────────────────────────────────┐
│         ResultsPage (Frontend Entry Point)      │
└────────────────┬────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────┐
│  AdvancedCourseResults (UI Component)            │
│  - Interest filtering                           │
│  - Level-based tabs                             │
│  - Match percentage visualization               │
└────────────────┬────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────┐
│  courseRecommendationEngine.js (Logic Layer)     │
│  - Database query execution                     │
│  - Cluster score calculation                    │
│  - Grade comparison & matching                  │
│  - Ranking & sorting algorithms                 │
└─────────────────────────────────────────────────┘
```

---

## File Structure

```
frontend/
├── src/
│   ├── pages/
│   │   └── ResultsPage.js ..................... Main results display page
│   │
│   ├── components/
│   │   ├── AdvancedCourseResults.jsx ......... Course display & filtering
│   │   └── ThemeToggle.jsx ................... Dark mode switcher
│   │
│   └── services/
│       └── courseRecommendationEngine.js .... Core recommendation logic
│
└── docs/
    ├── AI_RECOMMENDATION_ENGINE_GUIDE.md .... User guide
    └── DEVELOPER_GUIDE.md ................... This file
```

---

## Core Components

### 1. **courseRecommendationEngine.js**

The heart of the recommendation system.

#### Key Functions:

```javascript
// Main entry point - generates all recommendations
export const generateCourseRecommendations(studentData, studentInterests = [])

// Helper functions imported internally:
- gradePoints (Map) ............. Grade → point conversion
- gradeHierarchy (Map) .......... Grade comparison values
- calculateClusterPoints() ...... Score calculation
- meetsGradeRequirement() ....... Grade eligibility check
- meetsClusterRequirement() ..... Cluster score eligibility
- filterByInterests() ........... Interest-based filtering
```

#### Database Structure:

```javascript
KUCCPSProgrammesDatabase = [
  {
    id: 1,
    name: "Bachelor of Science in Civil Engineering",
    level: "Degree",                    // "Degree" | "Diploma" | "Certificate"
    institution: "University of Nairobi",
    institutionType: "University",      // "University" | "TVET" | "College"
    minimumRequirement: "B",            // Grade string
    clusterSubjects: ["Math", "Physics", "Chemistry"],
    careField: "Engineering",           // Career field for filtering
    interests: ["Engineering", "Science"],
    clusterScoreMinimum: 34
  },
  // ... 1000+ more programmes
]
```

#### Algorithm Flow:

```javascript
STEP 1: Parse Input
├─ Extract student grades
├─ Extract student interests
└─ Get mean grade

STEP 2: Iterate All Programmes
├─ For each programme in database:
│  ├─ Check mean grade requirement
│  ├─ Check cluster subject scores
│  ├─ If qualified:
│  │  ├─ Calculate match percentage
│  │  └─ Add to appropriate level array
│  └─ Else skip

STEP 3: Apply Interest Filters
├─ If no interests: return all
└─ Else: filter programmes by interest match

STEP 4: Sort Results
├─ Sort by level (Degree > Diploma > Certificate)
├─ Sort by match percentage (highest first)
└─ Return organized results

STEP 5: Generate Summary Statistics
├─ Total matches count
├─ Count by level
└─ Return in structured object
```

---

### 2. **AdvancedCourseResults.jsx**

Advanced UI component for displaying recommendations.

#### Component Props:

```javascript
<AdvancedCourseResults 
  studentData={{ 
    name: "John Doe",
    meanGrade: "C+",
    grades: {
      English: "C",
      Mathematics: "C+",
      Biology: "B-",
      Chemistry: "C",
      Physics: "D+",
      // ... more subjects
    }
  }} 
/>
```

#### State Management:

```javascript
const [selectedInterests, setSelectedInterests] = useState([])
const [filterLevel, setFilterLevel] = useState('all')  // 'all' | 'degree' | 'diploma' | 'certificate'
```

#### Key Features:

1. **Interest Selection**
   - 20+ career interests available
   - Multi-select support
   - Real-time filtering
   - Clear all button

2. **Level-Based Filtering**
   - All Programmes tab
   - Degree Programmes tab
   - Diploma Programmes tab
   - Certificate Programmes tab

3. **Programme Cards**
   - Programme name & institution
   - Match percentage indicator (color-coded)
   - Required subjects list
   - Career field classification
   - Cluster score comparison bar

4. **Summary Statistics**
   - Mean grade display
   - Total matches count
   - Breakdown by level
   - Qualification level indicator

---

### 3. **ResultsPage.js**

Main page component integrating everything.

#### Flow:

```javascript
1. Load student data from localStorage
2. If no data → redirect to entry page
3. Display loading state
4. Render header with theme toggle
5. Display student summary card
6. Render AdvancedCourseResults component
7. Show action buttons (New Analysis, WhatsApp Support)
```

#### Key Functions:

```javascript
handleNewAnalysis() {
  - Clear localStorage
  - Redirect to entry page
  - Reset application state
}
```

---

## Grade System

### Grade Points Mapping:

```javascript
const gradePoints = {
  'A': 12,   'A-': 11,  'B+': 10,
  'B': 9,    'B-': 8,   'C+': 7,
  'C': 6,    'C-': 5,   'D+': 4,
  'D': 3,    'D-': 2,   'E': 1
}
```

### Grade Hierarchy (for comparison):

```javascript
const gradeHierarchy = {
  'A': 12,   ... (same as above)
}

// Used for: if (studentGrade >= minimumGrade)
// Returns true if student's grade is equal or better
```

### Cluster Score Calculation:

```javascript
function calculateClusterPoints(grades, clusterSubjects) {
  // Sum points from 4 required subjects
  let totalPoints = 0
  
  for (let subject of clusterSubjects) {
    totalPoints += gradePoints[grades[subject]]
  }
  
  return totalPoints  // Max: 48 (12*4)
}

// Example:
// Student: Math=C+(7) + Physics=D+(4) + Chemistry=C+(7) + Biology=B-(8)
// Cluster Score: 7+4+7+8 = 26 points
```

---

## Data Flow Diagram

```
┌─────────────────────┐
│  Student Enters     │
│  KCSE Grades        │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  EntryPage saves    │
│  to localStorage    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  navigate to        │
│  ResultsPage        │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────────────────────────────────┐
│  Load studentData from localStorage             │
└──────────┬──────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────┐
│  Pass to AdvancedCourseResults component        │
└──────────┬──────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────┐
│  generateCourseRecommendations(studentData)     │
│  ├─ Compare mean grade                          │
│  ├─ Calculate cluster scores                    │
│  ├─ Filter by interests                         │
│  └─ Sort & organize                             │
└──────────┬──────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────┐
│  Return organized recommendations:              │
│  {                                              │
│    degrees: [...],      ← Bachelors first       │
│    diplomas: [...],     ← Mid-level options     │
│    certificates: [...], ← Foundation options    │
│    summary: {...}       ← Statistics            │
│  }                                              │
└──────────┬──────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────┐
│  Render UI with filtering capabilities:         │
│  - Select interests                             │
│  - Filter by level                              │
│  - View match percentages                       │
│  - Review programme details                     │
└─────────────────────────────────────────────────┘
```

---

## Example: Step-by-Step Recommendation

### Input:
```javascript
studentData = {
  name: "Jane Smith",
  meanGrade: "B-",
  grades: {
    English: "C",
    Mathematics: "B",
    Physics: "B-",
    Chemistry: "B",
    Biology: "A-",
    CRE: "C+",
    History: "C-"
  }
}

studentInterests = ["Health", "Science"]
```

### Processing:

**Step 1:** Check Mean Grade
- Student has "B-" (grade point 8)
- Qualifies for: B-, C+, C, C-, D+, D, D-, E
- Degree programmes with B- or lower available

**Step 2:** Check Degree Programme - "Bachelor of Science in Nursing"
- Required: Biology, Chemistry, Physics, Mathematics
- Student's scores: A-(12), B(9), B-(8), B(9) = 38 points
- Required: 32 points minimum
- ✅ QUALIFIES (38 ≥ 32)
- Match: 119% (exceeds requirement)

**Step 3:** Apply Interest Filter
- "Health" interest matches "Health Sciences" careField
- Programme kept in results

**Step 4:** Check Diploma - "Diploma in Nursing"
- Required: C-
- Student has B- ✅ Better than requirement
- ✅ QUALIFIES

**Step 5:** Return Results
```javascript
{
  summary: {
    meanGrade: "B-",
    totalMatches: 18,
    degreeCount: 5,
    diplomaCount: 8,
    certificateCount: 5
  },
  degrees: [
    {
      name: "Bachelor of Science in Nursing",
      matchPercentage: 119,
      clusterScore: 38,
      ...
    },
    // ... other degree programmes
  ],
  diplomas: [...],
  certificates: [...]
}
```

---

## Adding New Programmes

### To add a programme to the database:

```javascript
// In courseRecommendationEngine.js, add to KUCCPSProgrammesDatabase:

{
  id: 999,                                    // Unique ID
  name: "Bachelor of Science in Data Science",
  level: "Degree",                            // Must be: Degree/Diploma/Certificate
  institution: "Strathmore University",
  institutionType: "University",              // University/TVET/College
  minimumRequirement: "B",                    // Grade requirement
  clusterSubjects: ["Mathematics", "Physics", "Computer Studies", "English"],
  careField: "ICT",                           // Career field for filtering
  interests: ["ICT", "Technology", "Science", "Data Science"],
  clusterScoreMinimum: 33                     // Minimum cluster score (sum of 4 subjects)
}
```

### Cluster Score Calculation for New Programmes:

```
If programme requires: Math, Physics, CS, English
And student has: Math=B(9), Physics=B-(8), CS=B+(10), English=C+(7)
clusterScoreMinimum = 9+8+10+7 = 34 (typical range 24-48)
```

---

## Performance Considerations

### Current System:
- **1000+ programmes** in memory
- **O(n) filtering** algorithm
- **Real-time interest filtering**
- **Sub-millisecond response time**

### Optimization Tips:
```javascript
// Current: Iterates all programmes
KUCCPSProgrammesDatabase.forEach(programme => {
  // ... evaluate
})

// If scaling to 10,000+ programmes, consider:
// 1. Index by level (pre-organize arrays)
// 2. Index by career field (hash map)
// 3. Lazy-load programmes as needed
// 4. Implement pagination for large result sets
```

---

## Testing Recommendations

### Unit Tests:

```javascript
// Test grade comparison
test('B- qualifies for C+ programme', () => {
  expect(meetsGradeRequirement('B-', 'C+')).toBe(true)
  expect(meetsGradeRequirement('C', 'B')).toBe(false)
})

// Test cluster calculation
test('Calculate cluster points correctly', () => {
  const grades = { Math: 'B', Physics: 'B-', Chemistry: 'C+', Biology: 'A-' }
  const subjects = ['Math', 'Physics', 'Chemistry', 'Biology']
  const score = calculateClusterPoints(grades, subjects)
  expect(score).toBe(36) // 9+8+7+12
})

// Test filtering
test('Filter by interests', () => {
  const programmes = filterByInterests(allProgrammes, ['Engineering'])
  expect(programmes.every(p => p.interests.includes('Engineering'))).toBe(true)
})
```

### Integration Tests:
```javascript
// Full scenario test
test('Success: C+ student with Science interests gets Nursing degree', () => {
  const result = generateCourseRecommendations(
    { meanGrade: 'C+', grades: {...} },
    ['Health', 'Science']
  )
  
  expect(result.degrees.length).toBeGreaterThan(0)
  expect(result.degrees.some(d => d.name.includes('Nursing'))).toBe(true)
})
```

---

## Future Enhancements

### Planned Features:

1. **Scholarship Matching**
   - Match grants based on grades + field
   - Link to funding opportunities

2. **Career Progression Paths**
   - Show progression from Certificate → Diploma → Degree
   - Timeline projections

3. **PDF Report Generation**
   - Detailed analysis document
   - Printable recommendations
   - Institution contact information

4. **Direct Application Integration**
   - Apply directly through platform
   - Track application status
   - Upload documents

5. **Alumni Network**
   - Connect with programme graduates
   - Get real experiences
   - Mentorship opportunities

6. **API for Institutions**
   - Allow institutions to update requirements
   - Real-time data synchronization
   - Automated verification

---

## Troubleshooting

### No Programmes Shown
- Check if studentData has grades for all required subjects
- Verify mean grade is correctly calculated
- Check console for errors

### Incorrect Match Percentages  
- Verify gradePoints mapping is correct
- Check cluster subject names match exactly
- Ensure clusterScoreMinimum is set appropriately

### Performance Issues
- Monitor number of programmes in database
- Check browser console for memory leaks
- Implement pagination if needed

---

## Support & Maintenance

**For bugs or enhancements:**
- Create issue with: student data, expected results, actual results
- Include browser console errors
- Provide step-by-step reproduction

**For adding new programmes:**
- Verify with official KUCCPS data
- Get cluster requirements confirmed
- Test with sample students in that range
- Update documentation

