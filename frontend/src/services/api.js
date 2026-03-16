import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://kuccps-api.up.railway.app/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Add timeout for better error handling
});

// Add request interceptor for better debugging
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('API Timeout: Request took too long');
    } else if (error.response) {
      console.error(`API Error ${error.response.status}: ${error.response.data?.error || 'Unknown error'}`);
    } else if (error.request) {
      console.error('API Network Error: No response received');
    }
    return Promise.reject(error);
  }
);

export const placementService = {
  // Analyze student placement eligibility
  analyzePlacement: async (studentData) => {
    return axiosInstance.post('/placement/analyze', studentData);
  },

  // Compare specific student score against programmes
  compareProgrammes: async (studentClusterScore, programmeCodes = []) => {
    return axiosInstance.post('/placement/compare-programmes', {
      student_cluster_score: studentClusterScore,
      programme_codes: programmeCodes,
    });
  },

  // Get specific programme details with cutoff explanation
  getProgrammeDetails: async (programmeCode) => {
    return axiosInstance.get(`/placement/programme/${programmeCode}`);
  },

  // Generate placement report
  generateReport: async (reportData) => {
    return axiosInstance.post('/placement/report', reportData);
  },

  // Download PDF report
  downloadReport: async (report) => {
    return axiosInstance.post('/placement/report/download', { report });
  },

  // Get all courses
  getAllCourses: async () => {
    return axiosInstance.get('/courses');
  },

  // Search courses
  searchCourses: async (query) => {
    return axiosInstance.get('/courses/search', { params: query });
  },

  // Get courses by institution
  getCoursesByInstitution: async (institutionCode) => {
    return axiosInstance.get(`/courses/by-institution/${institutionCode}`);
  },

  // Get all institutions (with optional filters)
  getAllInstitutions: async (filters = {}) => {
    return axiosInstance.get('/institutions', { params: filters });
  },

  // Get institution by code
  getInstitution: async (institutionCode) => {
    return axiosInstance.get(`/institutions/${institutionCode}`);
  },

  // Search institutions
  searchInstitutions: async (query) => {
    return axiosInstance.get('/institutions/search', { params: query });
  },

  // Get all PUBLIC institutions
  getPublicInstitutions: async () => {
    return axiosInstance.get('/institutions/public');
  },

  // Get all PRIVATE institutions
  getPrivateInstitutions: async () => {
    return axiosInstance.get('/institutions/private');
  },

  // Get institutions by ownership (Public/Private)
  getInstitutionsByOwnership: async (ownership) => {
    return axiosInstance.get(`/institutions/by-ownership/${ownership}`);
  },

  // Get all universities
  getUniversities: async (ownership = '') => {
    const params = ownership ? { ownership } : {};
    return axiosInstance.get('/institutions/universities', { params });
  },

  // Get all technical colleges
  getTechnicalColleges: async (ownership = '') => {
    const params = ownership ? { ownership } : {};
    return axiosInstance.get('/institutions/technical-colleges', { params });
  },

  // Get institutions by type
  getInstitutionsByType: async (type) => {
    return axiosInstance.get(`/institutions/by-type/${type}`);
  },

  // Get institution statistics
  getInstitutionStatistics: async () => {
    return axiosInstance.get('/institutions/stats');
  },
};

export const authService = {
  // Request OTP code
  requestOTP: async (studentId, phoneNumber) => {
    return axiosInstance.post('/auth/request-otp', {
      student_id: studentId,
      phone_number: phoneNumber,
    });
  },

  // Verify OTP code
  verifyOTP: async (studentId, otpCode) => {
    return axiosInstance.post('/auth/verify-otp', {
      student_id: studentId,
      otp_code: otpCode,
    });
  },
};

export default axiosInstance;
