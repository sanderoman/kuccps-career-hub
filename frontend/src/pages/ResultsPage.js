import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import AdvancedCourseResults from '../components/AdvancedCourseResults';

const ResultsPage = () => {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Retrieve student data
    let data = localStorage.getItem('kusipsStudentData');
    console.debug('ResultsPage: stored studentData raw=', data);
    if (!data) {
      console.warn('No studentData found; using dummy fallback for debug');
      // provide sample data so page still renders
      data = JSON.stringify({
        name: 'Debug Student',
        meanGrade: 'B',
        grades: { Mathematics: 'B', English: 'B', Physics: 'B' }
      });
    }
    
    try {
      const parsedData = JSON.parse(data);
      setStudentData(parsedData);
    } catch (e) {
      console.error('Failed to parse stored studentData:', e, data);
      navigate('/entry');
      return;
    }
    setIsLoading(false);
  }, [navigate]);

  const handleNewAnalysis = () => {
    // Clear localStorage and start over
    localStorage.removeItem('kusipsStudentData');
    localStorage.removeItem('kusipsVerified');
    navigate('/entry');
  };

  if (isLoading || !studentData) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--gray-50)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderBottomColor: 'var(--kuccps-red)' }}></div>
          <p className="text-gray-700">Loading your personalized results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--gray-50)' }}>
      {/* Header */}
      <header className="text-white py-8" style={{ backgroundColor: 'var(--kuccps-red)', borderBottom: '4px solid var(--red-dark)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">🎓 Advanced Course Recommendations</h1>
              <p style={{ color: 'var(--red-pink)' }} className="text-lg">
                Powered by AI - Hundreds of programmes matched to your KCSE results
              </p>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Student Summary Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12 border-t-4" style={{ borderTopColor: 'var(--kuccps-red)' }}>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">STUDENT NAME</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{studentData.name}</p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">MEAN GRADE</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{studentData.meanGrade}</p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">QUALIFICATION LEVEL</p>
              <p className="text-3xl font-bold mt-1">
                {studentData.meanGrade >= 'A-' ? '🎓' : studentData.meanGrade >= 'C' ? '📖' : '🏆'}
                <span className="text-lg ml-2 text-gray-900 dark:text-white">
                  {studentData.meanGrade >= 'A-' ? 'Degree' : studentData.meanGrade >= 'C' ? 'Diploma' : 'Certificate'}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Advanced Results Component */}
        <AdvancedCourseResults studentData={studentData} />

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center mt-12 mb-8">
          <button
            onClick={handleNewAnalysis}
            className="text-white font-bold py-3 px-8 rounded-lg transition-all hover:shadow-lg"
            style={{ backgroundColor: 'var(--kuccps-red)' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--red-dark)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--kuccps-red)'}
          >
            🔄 New Analysis
          </button>
          <a
            href="https://wa.me/254743315353"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center gap-2"
          >
            💬 Get Support via WhatsApp
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12 mt-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-gray-700">
            <div>
              <h4 className="font-bold text-lg mb-3">KUCCPS Career Hub</h4>
              <p className="text-gray-400 text-sm">
                Advanced AI-powered course recommendation engine for Kenyan students
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-3">Key Features</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>✓ 1000+ Programmes Database</li>
                <li>✓ Subject Cluster Matching</li>
                <li>✓ Interest-based Filtering</li>
                <li>✓ Real-time Recommendations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-3">Support</h4>
              <p className="text-gray-400 text-sm">
                Phone: 0743315353<br />
                WhatsApp: Available 24/7
              </p>
            </div>
          </div>
          <div className="text-center text-gray-500 text-sm">
            <p>KUCCPS Career Hub © 2026 | Independent Career Advisory Tool</p>
            <p className="mt-2">This tool is NOT affiliated with KUCCPS. Always verify with official KUCCPS channels.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ResultsPage;
