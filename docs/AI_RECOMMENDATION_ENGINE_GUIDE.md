# Advanced AI KUCCPS Course Recommendation Engine

## Overview

Your KUCCPS Career Hub has been upgraded with an **advanced AI-powered course recommendation system** that intelligently matches students with hundreds of programmes based on:

- ✅ **Mean Grade Analysis** - Automatic qualification level determination
- ✅ **Subject Cluster Scoring** - Precision-matched subject requirements  
- ✅ **Interest-Based Filtering** - Personalized programme recommendations
- ✅ **Qualification Hierarchy** - Degree → Diploma → Certificate prioritization
- ✅ **Match Percentage Calculation** - Visual indicators of programme fit

---

## How It Works

### 1. **Mean Grade & Qualification Level**

When you enter your KCSE results, the system automatically determines your qualification level:

- **Grade A- and above** → **Degree Programmes** Available
- **Grade C and above** → **Diploma Programmes** Available  
- **Grade D and above** → **Certificate Programmes** Available

### 2. **Subject Cluster Matching**

Each programme requires specific subject clusters. The system:

1. Identifies required subjects for each programme
2. Calculates your cluster score from your grades in those subjects
3. Compares your score against programme requirements
4. Shows match percentage (how well your grades align)

**Grade Points System:**
```
A = 12 points      |  C+ = 7 points   |  D- = 2 points
A- = 11 points     |  C = 6 points    |  E = 1 point
B+ = 10 points     |  C- = 5 points   |
B = 9 points       |  D+ = 4 points   |
B- = 8 points      |  D = 3 points    |
```

### 3. **Interest-Based Filtering**

Select from 20+ career interests to narrow down programmes:

- **Engineering** - Civil, Electrical, Mechanical
- **ICT** - Computer Science, Software Engineering, Cyber Security
- **Health Sciences** - Medicine, Nursing, Pharmacy
- **Business** - Commerce, Accountancy, Economics
- **Education** - Science Teaching, Arts Teaching
- **Law** - Bachelor of Laws, Legal Studies
- **Psychology** - Behavioral Sciences, Human Development
- **And 12+ more...**

### 4. **Qualification Hierarchy**

Programmes are always displayed in order of qualification level:

1. **Degree Programmes** (Highest Level) - Bachelors (4 years)
2. **Diploma Programmes** (Mid Level) - 2-3 years specialized training
3. **Certificate Programmes** (Foundation Level) - 1-2 years focused skills

---

## Key Features

### 📊 Summary Statistics

- **Mean Grade** - Your overall KCSE performance
- **Total Matches** - How many programmes you qualify for
- **Degree Count** - Number of bachelor's degree options
- **Diploma Count** - Number of diploma options
- **Certificate Count** - Number of certificate options

### 📈 Match Percentage Indicator

Each programme shows a **"Match Percentage"** which indicates:

- **100% Match** 🟢 - Your grades exceed programme requirements perfectly
- **80-100% Match** 🔵 - Strong alignment with programme needs
- **60-80% Match** 🟠 - Good fit, but some subjects are at minimum
- **Below 60% Match** 🔴 - Meets minimum requirement but room for improvement

### 🎯 Programme Cards Display

For each matched programme, you'll see:

- **Programme Name** - Official course title
- **Institution** - University, TVET, or College offering it
- **Institution Type** - Classification of the institution
- **Minimum Requirement** - Lowest grade needed
- **Required Subjects** - Specific subject cluster needed
- **Career Field** - Industry classification (ICT, Health, etc.)
- **Cluster Score Bar** - Visual representation of your fit
- **Your Score vs Required** - Numerical comparison

---

## Example: How Recommendations Work

### Student Data:
```
Name: JOHN DOE
Mean Grade: C+
English: C
Kiswahili: C-
Mathematics: C+
Biology: B-
Chemistry: C
Physics: D+
```

### Recommendations Generated:

#### ✅ DEGREE PROGRAMMES (Eligible)
1. **Bachelor of Science in Nursing**
   - Institution: Kenyatta University
   - Cluster: Biology, Chemistry, Physics, Mathematics
   - Your Score: 28 / 28 required (100% Match)
   - Status: ✓ FULLY QUALIFIED

2. **Bachelor of Science in Environmental Science**
   - Institution: Maseno University
   - Cluster: Biology, Chemistry, Mathematics, Geography  
   - Your Score: 25 / 26 required (96% Match)
   - Status: ✓ QUALIFIED

#### ✅ DIPLOMA PROGRAMMES (Eligible)
1. **Diploma in Medical Laboratory Sciences**
   - Institution: KMTC
   - Cluster: Biology, Chemistry, Physics
   - Your Score: 26 / 24 required (108% Match)
   - Status: ✓ WELL-QUALIFIED

#### ✅ CERTIFICATE PROGRAMMES (Eligible + Fallback Options)
1. **Certificate in Business Management**
   - Institution: Technical University of Kenya
   - Your Score: 22 / 20 required (110% Match)
   - Status: ✓ EXCELLENT FIT

---

## Using Interest Filters

### How to Use

1. **View Available Interests** - 20+ career fields shown
2. **Click to Select** - Interest buttons highlight in red when selected
3. **Auto-Filter Results** - Programmes update instantly
4. **Select Multiple** - Combine interests (e.g., "Health" + "Science")
5. **Clear Filters** - "Clear Filters" button removes all selections

### Example Filtering:

**Selected Interests: Health + Science**

Results will show only programmes in:
- Medicine, Nursing, Pharmacy (Health)
- Related to scientific subjects (Biology, Chemistry)

---

## Database Coverage

### Total Programmes: 1000+

**Broken Down By:**
- 🎓 **Degree Programmes**: 200+ Bachelor's degrees
- 📖 **Diploma Programmes**: 500+ Diploma options
- 🏆 **Certificate Programmes**: 300+ Certificate options

**Institutions Covered:**
- ✓ All Kenyan Public Universities
- ✓ Private Universities (USIU, Strathmore, etc.)
- ✓ TVET Institutions (TUK, KMTC, etc.)
- ✓ Accredited Colleges

**Career Fields:**
- Engineering (Civil, Electrical, Mechanical, etc.)
- ICT (Computer Science, Software, Cyber Security)
- Health Sciences (Medicine, Nursing, Pharmacy)
- Business (Commerce, Accountancy, Economics)
- Education (Science, Arts, Mathematics teaching)
- Law & Social Sciences
- Agriculture & Environmental Sciences
- And 10+ more specialized fields

---

## Technical Details

### The Recommendation Algorithm

```javascript
1. Parse student grades and calculate mean
2. Retrieve all 1000+ programmes from database
3. For each programme:
   a. Check if student meets minimum grade requirement
   b. Extract required subject cluster
   c. Calculate cluster score from student's grades
   d. Compare cluster score to programme requirement
   e. If student qualifies, add to results
4. Calculate match percentage for each qualified programme
5. Sort by:
   - Level (Degree > Diploma > Certificate)
   - Interest alignment (if filters selected)
   - Match percentage (highest first)
6. Return organized results by level
```

### Grade Comparison Logic

Students qualify for a programme if:
- ✓ Their mean grade ≥ programme's minimum requirement
- ✓ Their cluster subject score ≥ required cluster points
- ✓ All required subjects are available in their subjects taken

---

## Smart Features

### 🎨 Dark Mode

All recommendations display beautifully in both:
- **Light Mode** - Professional white theme with red accents
- **Dark Mode** - Eye-friendly dark blue-gray with KUCCPS red

Toggle with the theme button in the top-right corner.

### 📱 Responsive Design

- **Desktop** - Full-width card layout with 3+ column grids
- **Tablet** - Optimized 2-column layout
- **Mobile** - Single column, touch-optimized buttons

### ⚡ Real-Time Filtering

- Interest filters apply instantly
- Programme level tabs update in real-time
- No page reload required
- Smooth animations and transitions

---

## Pro Tips for Best Results

### 1. **For Degree Programmes**
- Ensure you have grades in key cluster subjects
- Physics + Mathematics critical for Engineering
- Biology + Chemistry critical for Health Sciences
- English important for most programmes

### 2. **Use Interest Filters**
- Start broad (e.g., "Science")
- Narrow down to specific career (e.g., "Medicine")
- Review both degree AND diploma options

### 3. **Check Match Percentage**
- Green (100%) = Safe choice, well-qualified
- Blue/Orange (80-90%) = Good option, meets requirements
- Try next qualification level if struggling

### 4. **Explore All Levels**
- Even if you qualify for degrees, explore diplomas
- Diplomas are faster (2-3 years vs 4)
- Different career trajectories possible
- Consider your career timeline

### 5. **Contact Institutions**
- Use WhatsApp button for real-time support
- Verify admission requirements with institutions
- Ask about scholarship opportunities
- Confirm application deadlines

---

## What's Next?

After getting your recommendations:

1. **Research** - Learn more about recommended programmes
2. **Visit Websites** - Check institution official pages
3. **Contact Admissions** - Get specific requirements
4. **Prepare Documents** - Birth certificate, ID, transcripts
5. **Submit Applications** - Apply before deadlines
6. **Follow Up** - Track application status

---

## Advanced Features (Coming Soon)

🚀 **Planned Enhancements:**
- PDF report generation with detailed analysis
- Scholarship matching (based on grades + field)
- Institution comparison tool
- Career progression paths
- Alumni network connections
- Direct application integration
- Video testimonials from students

---

## Support

**Need Help?**

- 📞 **Phone**: 0743315353
- 💬 **WhatsApp**: Available 24/7 (Click "Get Support" button)
- 📧 **Email**: Via WhatsApp
- 🌐 **Website**: Coming soon

**Important Disclaimer:**
This tool is an independent career advisory system and is **NOT affiliated** with KUCCPS (Kenya Universities and Colleges Central Placement Service). Always verify recommendations with official KUCCPS channels before making decisions.

---

## Data Accuracy

The recommendation engine is based on:
- ✅ Official 2024 KUCCPS cutoff points
- ✅ Current university cluster requirements
- ✅ TVET institution admission criteria
- ✅ Real subject combinations from applications

**Last Updated**: March 2026

---

## Questions? Feedback?

Your suggestions help us improve the system:
- What programmes did you find helpful?
- What information would you like to see?
- Any bugs or issues?

**Contact via WhatsApp**: 0743315353

