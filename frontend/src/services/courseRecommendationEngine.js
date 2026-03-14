/**
 * Advanced KUCCPS Course Recommendation Engine
 * Supports both live API data (from scraper) and fallback local database
 * Matches students with programmes based on KCSE results, subject clusters, and interests
 */

/**
 * Fetch programmes from live API (KUCCPS scraper service)
 * Falls back to local database if API is unavailable
 */
export const fetchLiveProgrammesFromAPI = async (forceRefresh = false) => {
  try {
    const url = forceRefresh 
      ? 'http://localhost:5000/api/programmes?refresh=true'
      : 'http://localhost:5000/api/programmes';
    
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      timeout: 5000
    });

    if (!response.ok) {
      console.warn('API returned status:', response.status);
      return null;
    }

    const data = await response.json();
    
    if (data.success && data.programmes && Array.isArray(data.programmes)) {
      console.log(`✅ Fetched ${data.count} programmes from live KUCCPS API`);
      return data.programmes;
    }
  } catch (error) {
    console.warn('⚠️ Could not fetch from KUCCPS API:', error.message);
  }
  
  return null;
};

/**
 * Normalize programmes from API format to internal format
 */
const normalizeProgrammes = (apiProgrammes) => {
  return apiProgrammes.map(programme => ({
    id: programme.id || Math.abs(programme.name ? programme.name.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0) : 0),
    name: programme.name,
    level: programme.level || 'Degree',
    institution: programme.institution,
    institutionType: programme.institutionType || 'University',
    minimumRequirement: programme.requirement || programme.minimumRequirement || 'C',
    clusterSubjects: Array.isArray(programme.clusterSubjects) 
      ? programme.clusterSubjects 
      : (programme.cluster_subjects ? programme.cluster_subjects.split(',').map(s => s.trim()) : []),
    careField: programme.careField || programme.career_field || '',
    interests: programme.interests || [],
    clusterScoreMinimum: programme.clusterScoreMinimum || 26
  }));
};

// Comprehensive KUCCPS Programmes Database (Fallback)
const KUCCPSProgrammesDatabase = [
  // DEGREE PROGRAMMES - ENGINEERING
  {
    id: 1,
    name: 'Bachelor of Science in Civil Engineering',
    level: 'Degree',
    institution: 'University of Nairobi',
    institutionType: 'University',
    minimumRequirement: 'B',
    clusterSubjects: ['Mathematics', 'Physics', 'Chemistry'],
    careField: 'Engineering',
    interests: ['Engineering', 'Science'],
    clusterScoreMinimum: 34
  },
  {
    id: 2,
    name: 'Bachelor of Science in Electrical Engineering',
    level: 'Degree',
    institution: 'JKUAT',
    institutionType: 'University',
    minimumRequirement: 'B',
    clusterSubjects: ['Mathematics', 'Physics', 'Chemistry'],
    careField: 'Engineering',
    interests: ['Engineering', 'Science'],
    clusterScoreMinimum: 34
  },
  {
    id: 3,
    name: 'Bachelor of Science in Mechanical Engineering',
    level: 'Degree',
    institution: 'Moi University',
    institutionType: 'University',
    minimumRequirement: 'B-',
    clusterSubjects: ['Mathematics', 'Physics', 'Chemistry'],
    careField: 'Engineering',
    interests: ['Engineering', 'Science'],
    clusterScoreMinimum: 32
  },
  {
    id: 4,
    name: 'Bachelor of Science in Chemical Engineering',
    level: 'Degree',
    institution: 'University of Nairobi',
    institutionType: 'University',
    minimumRequirement: 'B',
    clusterSubjects: ['Mathematics', 'Chemistry', 'Physics'],
    careField: 'Engineering',
    interests: ['Engineering', 'Science'],
    clusterScoreMinimum: 34
  },

  // DEGREE PROGRAMMES - ICT
  {
    id: 5,
    name: 'Bachelor of Science in Computer Science',
    level: 'Degree',
    institution: 'University of Nairobi',
    institutionType: 'University',
    minimumRequirement: 'C+',
    clusterSubjects: ['Mathematics', 'Physics', 'Computer Studies'],
    careField: 'ICT',
    interests: ['ICT', 'Technology', 'Science'],
    clusterScoreMinimum: 28
  },
  {
    id: 6,
    name: 'Bachelor of Science in Information Technology',
    level: 'Degree',
    institution: 'JKUAT',
    institutionType: 'University',
    minimumRequirement: 'C+',
    clusterSubjects: ['Mathematics', 'Physics', 'English'],
    careField: 'ICT',
    interests: ['ICT', 'Technology'],
    clusterScoreMinimum: 28
  },
  {
    id: 7,
    name: 'Bachelor of Science in Software Engineering',
    level: 'Degree',
    institution: 'Strathmore University',
    institutionType: 'University',
    minimumRequirement: 'B-',
    clusterSubjects: ['Mathematics', 'Physics', 'Computer Studies'],
    careField: 'ICT',
    interests: ['ICT', 'Technology', 'Science'],
    clusterScoreMinimum: 32
  },
  {
    id: 8,
    name: 'Bachelor of Science in Cyber Security',
    level: 'Degree',
    institution: 'USIU-Africa',
    institutionType: 'University',
    minimumRequirement: 'C+',
    clusterSubjects: ['Mathematics', 'Physics', 'English'],
    careField: 'ICT',
    interests: ['ICT', 'Technology', 'Science'],
    clusterScoreMinimum: 28
  },

  // DEGREE PROGRAMMES - HEALTH SCIENCES
  {
    id: 9,
    name: 'Bachelor of Medicine and Surgery',
    level: 'Degree',
    institution: 'University of Nairobi',
    institutionType: 'University',
    minimumRequirement: 'A-',
    clusterSubjects: ['Biology', 'Chemistry', 'Physics'],
    careField: 'Health Sciences',
    interests: ['Health', 'Medicine', 'Science'],
    clusterScoreMinimum: 42
  },
  {
    id: 10,
    name: 'Bachelor of Science in Nursing',
    level: 'Degree',
    institution: 'Kenyatta University',
    institutionType: 'University',
    minimumRequirement: 'C+',
    clusterSubjects: ['Biology', 'Chemistry', 'English'],
    careField: 'Health Sciences',
    interests: ['Health', 'Science'],
    clusterScoreMinimum: 28
  },
  {
    id: 11,
    name: 'Bachelor of Science in Pharmacy',
    level: 'Degree',
    institution: 'University of Nairobi',
    institutionType: 'University',
    minimumRequirement: 'B+',
    clusterSubjects: ['Chemistry', 'Biology', 'Physics'],
    careField: 'Health Sciences',
    interests: ['Health', 'Science'],
    clusterScoreMinimum: 38
  },
  {
    id: 12,
    name: 'Bachelor of Science in Public Health',
    level: 'Degree',
    institution: 'Maseno University',
    institutionType: 'University',
    minimumRequirement: 'C',
    clusterSubjects: ['Biology', 'Chemistry', 'English'],
    careField: 'Health Sciences',
    interests: ['Health', 'Science'],
    clusterScoreMinimum: 26
  },

  // DEGREE PROGRAMMES - BUSINESS
  {
    id: 13,
    name: 'Bachelor of Commerce',
    level: 'Degree',
    institution: 'University of Nairobi',
    institutionType: 'University',
    minimumRequirement: 'C',
    clusterSubjects: ['Mathematics', 'English', 'Business Studies'],
    careField: 'Business',
    interests: ['Business', 'Economics'],
    clusterScoreMinimum: 26
  },
  {
    id: 14,
    name: 'Bachelor of Business Administration',
    level: 'Degree',
    institution: 'Strathmore University',
    institutionType: 'University',
    minimumRequirement: 'C+',
    clusterSubjects: ['Mathematics', 'English', 'Business Studies'],
    careField: 'Business',
    interests: ['Business', 'Management'],
    clusterScoreMinimum: 28
  },
  {
    id: 15,
    name: 'Bachelor of Science in Economics',
    level: 'Degree',
    institution: 'Kenyatta University',
    institutionType: 'University',
    minimumRequirement: 'C',
    clusterSubjects: ['Mathematics', 'English', 'History'],
    careField: 'Business',
    interests: ['Business', 'Economics', 'Science'],
    clusterScoreMinimum: 26
  },
  {
    id: 16,
    name: 'Bachelor of Science in Accountancy',
    level: 'Degree',
    institution: 'University of Nairobi',
    institutionType: 'University',
    minimumRequirement: 'C+',
    clusterSubjects: ['Mathematics', 'English', 'Business Studies'],
    careField: 'Business',
    interests: ['Business', 'Finance'],
    clusterScoreMinimum: 28
  },

  // DEGREE PROGRAMMES - EDUCATION
  {
    id: 17,
    name: 'Bachelor of Education (Science)',
    level: 'Degree',
    institution: 'Kenyatta University',
    institutionType: 'University',
    minimumRequirement: 'C',
    clusterSubjects: ['Physics', 'Chemistry', 'Biology'],
    careField: 'Education',
    interests: ['Education', 'Science', 'Teaching'],
    clusterScoreMinimum: 26
  },
  {
    id: 18,
    name: 'Bachelor of Education (Arts)',
    level: 'Degree',
    institution: 'University of Nairobi',
    institutionType: 'University',
    minimumRequirement: 'C',
    clusterSubjects: ['English', 'History', 'Geography'],
    careField: 'Education',
    interests: ['Education', 'Humanities', 'Teaching'],
    clusterScoreMinimum: 26
  },
  {
    id: 19,
    name: 'Bachelor of Education (Mathematics)',
    level: 'Degree',
    institution: 'Maseno University',
    institutionType: 'University',
    minimumRequirement: 'C+',
    clusterSubjects: ['Mathematics', 'Physics', 'Chemistry'],
    careField: 'Education',
    interests: ['Education', 'Mathematics', 'Teaching'],
    clusterScoreMinimum: 28
  },

  // DEGREE PROGRAMMES - SOCIAL SCIENCES
  {
    id: 20,
    name: 'Bachelor of Laws',
    level: 'Degree',
    institution: 'University of Nairobi',
    institutionType: 'University',
    minimumRequirement: 'B-',
    clusterSubjects: ['English', 'History', 'Geography'],
    careField: 'Law',
    interests: ['Law', 'Politics'],
    clusterScoreMinimum: 32
  },
  {
    id: 21,
    name: 'Bachelor of Arts in Psychology',
    level: 'Degree',
    institution: 'USIU-Africa',
    institutionType: 'University',
    minimumRequirement: 'C',
    clusterSubjects: ['English', 'History', 'Geography'],
    careField: 'Social Sciences',
    interests: ['Psychology', 'Humanities'],
    clusterScoreMinimum: 26
  },
  {
    id: 22,
    name: 'Bachelor of Arts in Sociology',
    level: 'Degree',
    institution: 'Kenyatta University',
    institutionType: 'University',
    minimumRequirement: 'C',
    clusterSubjects: ['English', 'History', 'Geography'],
    careField: 'Social Sciences',
    interests: ['Humanities', 'Social Sciences'],
    clusterScoreMinimum: 26
  },

  // DIPLOMA PROGRAMMES
  {
    id: 23,
    name: 'Diploma in Information Technology',
    level: 'Diploma',
    institution: 'Technical University of Kenya',
    institutionType: 'TVET',
    minimumRequirement: 'C-',
    clusterSubjects: ['Mathematics', 'Physics', 'English'],
    careField: 'ICT',
    interests: ['ICT', 'Technology'],
    clusterScoreMinimum: 24
  },
  {
    id: 24,
    name: 'Diploma in Business Management',
    level: 'Diploma',
    institution: 'Kenya Technical Training Institute',
    institutionType: 'TVET',
    minimumRequirement: 'C-',
    clusterSubjects: ['Mathematics', 'English', 'Business Studies'],
    careField: 'Business',
    interests: ['Business', 'Management'],
    clusterScoreMinimum: 24
  },
  {
    id: 25,
    name: 'Diploma in Nursing',
    level: 'Diploma',
    institution: 'KMTC',
    institutionType: 'College',
    minimumRequirement: 'C-',
    clusterSubjects: ['Biology', 'Chemistry', 'English'],
    careField: 'Health Sciences',
    interests: ['Health', 'Science'],
    clusterScoreMinimum: 24
  },
  {
    id: 26,
    name: 'Diploma in Medical Laboratory Sciences',
    level: 'Diploma',
    institution: 'KMTC',
    institutionType: 'College',
    minimumRequirement: 'C',
    clusterSubjects: ['Biology', 'Chemistry', 'Physics'],
    careField: 'Health Sciences',
    interests: ['Health', 'Science'],
    clusterScoreMinimum: 26
  },
  {
    id: 27,
    name: 'Diploma in Electrician',
    level: 'Diploma',
    institution: 'Technical University of Kenya',
    institutionType: 'TVET',
    minimumRequirement: 'C-',
    clusterSubjects: ['Mathematics', 'Physics', 'Chemistry'],
    careField: 'Engineering',
    interests: ['Engineering', 'Science'],
    clusterScoreMinimum: 24
  },
  {
    id: 28,
    name: 'Diploma in Hospitality Management',
    level: 'Diploma',
    institution: 'Kenya Tourism Board Institute',
    institutionType: 'College',
    minimumRequirement: 'C-',
    clusterSubjects: ['English', 'Business Studies', 'Geography'],
    careField: 'Hospitality',
    interests: ['Business', 'Hospitality'],
    clusterScoreMinimum: 24
  },

  // CERTIFICATE PROGRAMMES
  {
    id: 29,
    name: 'Certificate in Plumbing',
    level: 'Certificate',
    institution: 'Technical University of Kenya',
    institutionType: 'TVET',
    minimumRequirement: 'D',
    clusterSubjects: ['Mathematics', 'Physics', 'English'],
    careField: 'Engineering',
    interests: ['Engineering', 'Trade'],
    clusterScoreMinimum: 20
  },
  {
    id: 30,
    name: 'Certificate in Masonry',
    level: 'Certificate',
    institution: 'Kenya Technical Training Institute',
    institutionType: 'TVET',
    minimumRequirement: 'D+',
    clusterSubjects: ['Mathematics', 'Physics', 'English'],
    careField: 'Engineering',
    interests: ['Engineering', 'Trade'],
    clusterScoreMinimum: 22
  },
  {
    id: 31,
    name: 'Certificate in Tailoring',
    level: 'Certificate',
    institution: 'Kenya Technical Training Institute',
    institutionType: 'TVET',
    minimumRequirement: 'D',
    clusterSubjects: ['English', 'Business Studies', 'Art & Design'],
    careField: 'Design',
    interests: ['Design', 'Fashion'],
    clusterScoreMinimum: 20
  },
];

// Grade points mapping
const gradePoints = {
  'A': 12, 'A-': 11, 'B+': 10, 'B': 9, 'B-': 8,
  'C+': 7, 'C': 6, 'C-': 5, 'D+': 4, 'D': 3, 'D-': 2, 'E': 1
};

// Grade hierarchy for comparison
const gradeHierarchy = {
  'A': 12, 'A-': 11, 'B+': 10, 'B': 9, 'B-': 8,
  'C+': 7, 'C': 6, 'C-': 5, 'D+': 4, 'D': 3, 'D-': 2, 'E': 1
};

/**
 * Calculate cluster points for a specific cluster
 * @param {Object} grades - Student grades object
 * @param {Array} clusterSubjects - Array of subject names in the cluster
 * @returns {number} Total cluster points
 */
const calculateClusterPoints = (grades, clusterSubjects) => {
  return clusterSubjects.reduce((sum, subject) => {
    return sum + (gradePoints[grades[subject]] || 0);
  }, 0);
};

/**
 * Check if student meets minimum grade requirement
 * @param {string} studentGrade - Student's mean grade
 * @param {string} minimumRequired - Minimum required grade
 * @returns {boolean}
 */
const meetsGradeRequirement = (studentGrade, minimumRequired) => {
  return gradeHierarchy[studentGrade] >= gradeHierarchy[minimumRequired];
};

/**
 * Check if student meets cluster requirements
 * @param {Object} grades - Student grades
 * @param {Array} clusterSubjects - Required cluster subjects
 * @param {number} minimumClusterScore - Minimum cluster score needed
 * @returns {boolean}
 */
const meetsClusterRequirement = (grades, clusterSubjects, minimumClusterScore) => {
  const clusterScore = calculateClusterPoints(grades, clusterSubjects);
  return clusterScore >= minimumClusterScore;
};

/**
 * Filter programmes by interests
 * @param {Array} programmes - Array of programmes
 * @param {Array} studentInterests - Array of student interests
 * @returns {Array} Filtered programmes
 */
const filterByInterests = (programmes, studentInterests) => {
  if (!studentInterests || studentInterests.length === 0) {
    return programmes;
  }

  return programmes.filter(programme =>
    programme.interests.some(interest =>
      studentInterests.includes(interest)
    )
  );
};

/**
 * Main recommendation engine function - Enhanced with API support
 * @param {Object} studentData - Student's grades and preferences
 * @param {Array} studentInterests - Student's career interests
 * @param {Boolean} useLiveAPI - Whether to try fetching from live API
 * @returns {Promise<Object>} Organized recommendations
 */
export const generateCourseRecommendations = async (studentData, studentInterests = [], useLiveAPI = true) => {
  try {
    const { meanGrade, grades } = studentData || {};

    let programmesToEvaluate = KUCCPSProgrammesDatabase;
    let dataSource = 'local';

    // Try to fetch live programmes from API if enabled
    if (useLiveAPI) {
      console.log('🔄 Attempting to fetch programmes from live KUCCPS API...');
      const liveProgrammes = await fetchLiveProgrammesFromAPI();
      if (liveProgrammes && liveProgrammes.length > 0) {
        programmesToEvaluate = normalizeProgrammes(liveProgrammes);
        dataSource = 'live';
        console.log(`✅ Using ${programmesToEvaluate.length} programmes from live API`);
      } else {
        console.log('⚠️ Live API unavailable, falling back to local database');
      }
    }

  const degreeProgrammes = [];
  const diplomaProgrammes = [];
  const certificateProgrammes = [];

  // Iterate through all programmes
  programmesToEvaluate.forEach(programme => {
    // Check if student qualifies based on mean grade
    const meetsRequirement = meetsGradeRequirement(meanGrade, programme.minimumRequirement);
    
    // For cluster matching, be flexible with missing subjects
    let meetsCluster = true;
    if (programme.clusterSubjects && programme.clusterSubjects.length > 0) {
      const studentHasRequiredSubjects = programme.clusterSubjects.some(
        subject => subject in grades
      );
      
      if (studentHasRequiredSubjects) {
        meetsCluster = meetsClusterRequirement(grades, programme.clusterSubjects, programme.clusterScoreMinimum);
      }
    }

    if (meetsRequirement && meetsCluster) {
      // Add cluster score to programme object
      const clusterScore = programme.clusterSubjects 
        ? calculateClusterPoints(grades, programme.clusterSubjects)
        : 0;
        
      const programmeCopy = {
        ...programme,
        clusterScore,
        matchPercentage: programme.clusterScoreMinimum > 0
          ? Math.min(150, Math.round((clusterScore / programme.clusterScoreMinimum) * 100))
          : 100,
        dataSource
      };

      // Sort by qualification level
      if (programme.level === 'Degree' || programme.level?.includes('Bachelor')) {
        degreeProgrammes.push(programmeCopy);
      } else if (programme.level === 'Diploma') {
        diplomaProgrammes.push(programmeCopy);
      } else if (programme.level === 'Certificate' || programme.level?.includes('Certificate')) {
        certificateProgrammes.push(programmeCopy);
      }
    }
  });

  // Filter by interests if provided
  let filteredDegrees = filterByInterests(degreeProgrammes, studentInterests);
  let filteredDiplomas = filterByInterests(diplomaProgrammes, studentInterests);
  let filteredCertificates = filterByInterests(certificateProgrammes, studentInterests);

  // Sort by match percentage (highest first)
  filteredDegrees.sort((a, b) => b.matchPercentage - a.matchPercentage);
  filteredDiplomas.sort((a, b) => b.matchPercentage - a.matchPercentage);
  filteredCertificates.sort((a, b) => b.matchPercentage - a.matchPercentage);

    return {
      summary: {
        meanGrade,
        totalMatches: filteredDegrees.length + filteredDiplomas.length + filteredCertificates.length,
        degreeCount: filteredDegrees.length,
        diplomaCount: filteredDiplomas.length,
        certificateCount: filteredCertificates.length,
        dataSource: dataSource === 'live' ? '🔴 LIVE KUCCPS API' : '📦 Local Database'
      },
      degrees: filteredDegrees,
      diplomas: filteredDiplomas,
      certificates: filteredCertificates,
      allProgrammes: [...filteredDegrees, ...filteredDiplomas, ...filteredCertificates]
    };
  } catch (err) {
    console.error('🔥 generateCourseRecommendations failed:', err);
    // Return safe default structure so callers don't break
    return {
      summary: {
        meanGrade: studentData?.meanGrade || 'N/A',
        totalMatches: 0,
        degreeCount: 0,
        diplomaCount: 0,
        certificateCount: 0,
        dataSource: '❌ Error'
      },
      degrees: [],
      diplomas: [],
      certificates: [],
      allProgrammes: []
    };
  }
};

export const generateCourseRecommendations_Sync = (studentData, studentInterests = []) => {
  const { meanGrade, grades } = studentData;

  const degreeProgrammes = [];
  const diplomaProgrammes = [];
  const certificateProgrammes = [];

  // Iterate through all programmes
  KUCCPSProgrammesDatabase.forEach(programme => {
    // Check if student qualifies based on mean grade
    const meetsRequirement = meetsGradeRequirement(meanGrade, programme.minimumRequirement);
    const meetsCluster = meetsClusterRequirement(grades, programme.clusterSubjects, programme.clusterScoreMinimum);

    if (meetsRequirement && meetsCluster) {
      // Add cluster score to programme object
      const clusterScore = calculateClusterPoints(grades, programme.clusterSubjects);
      const programmeCopy = {
        ...programme,
        clusterScore,
        matchPercentage: Math.min(100, Math.round((clusterScore / programme.clusterScoreMinimum) * 100))
      };

      // Sort by qualification level
      if (programme.level === 'Degree') {
        degreeProgrammes.push(programmeCopy);
      } else if (programme.level === 'Diploma') {
        diplomaProgrammes.push(programmeCopy);
      } else if (programme.level === 'Certificate') {
        certificateProgrammes.push(programmeCopy);
      }
    }
  });

  // Filter by interests if provided
  let filteredDegrees = filterByInterests(degreeProgrammes, studentInterests);
  let filteredDiplomas = filterByInterests(diplomaProgrammes, studentInterests);
  let filteredCertificates = filterByInterests(certificateProgrammes, studentInterests);

  // Sort by match percentage (highest first)
  filteredDegrees.sort((a, b) => b.matchPercentage - a.matchPercentage);
  filteredDiplomas.sort((a, b) => b.matchPercentage - a.matchPercentage);
  filteredCertificates.sort((a, b) => b.matchPercentage - a.matchPercentage);

  return {
    summary: {
      meanGrade,
      totalMatches: filteredDegrees.length + filteredDiplomas.length + filteredCertificates.length,
      degreeCount: filteredDegrees.length,
      diplomaCount: filteredDiplomas.length,
      certificateCount: filteredCertificates.length
    },
    degrees: filteredDegrees,
    diplomas: filteredDiplomas,
    certificates: filteredCertificates,
    allProgrammes: [...filteredDegrees, ...filteredDiplomas, ...filteredCertificates]
  };
};

export default {
  generateCourseRecommendations,
  KUCCPSProgrammesDatabase,
  gradePoints
};
