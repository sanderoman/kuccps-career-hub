export default async function handler(req, res) { 
  res.status(200).json({ 
    message: 'KUCCPS Career Hub API', 
    version: '1.0.0', 
    endpoints: { 
      health: '/api/health', 
      auth: '/api/auth', 
      placement: '/api/placement', 
      courses: '/api/courses', 
      institutions: '/api/institutions' 
    } 
  }); 
  }; 
