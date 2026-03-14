import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SecretCodePage = () => {
  const navigate = useNavigate();
  const [secretCode, setSecretCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    // Retrieve student data from localStorage
    const data = localStorage.getItem('kusipsStudentData');
    if (!data) {
      navigate('/entry');
      return;
    }
    setStudentData(JSON.parse(data));
  }, [navigate]);

  const generateSecretCode = (name) => {
    const initials = name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
    
    const year = new Date().getFullYear();
    const randomDigits = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    
    return `${initials}${year}${randomDigits}`;
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError('');
    setIsVerifying(true);

    // Simulate verification process
    setTimeout(() => {
      // Get the stored generated code
      const storedCode = localStorage.getItem('kusipsGeneratedCode');
      
      if (!storedCode) {
        setError('No code generated. Please click "Get My Code" first.');
        setIsVerifying(false);
        return;
      }
      
      if (secretCode.toUpperCase() === storedCode.toUpperCase()) {
        // Store verification success
        localStorage.setItem('kusipsVerified', 'true');
        navigate('/results');
      } else {
        setError('FRAUD DETECTED - Invalid Secret Code');
      }
      setIsVerifying(false);
    }, 1500);
  };

  const handleGetCode = () => {
    if (!studentData) return;
    
    const code = generateSecretCode(studentData.name);
    
    // Store the generated code for verification
    localStorage.setItem('kusipsGeneratedCode', code);
    
    alert(`Your secret code is: ${code}\n\nPlease save this code for verification.`);
  };

  if (!studentData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderBottomColor: 'var(--kuccps-red)' }}></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="text-white py-8" style={{ backgroundColor: 'var(--kuccps-red)' }}>
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-3xl font-bold mb-4">Secret Code Verification</h1>
          <p style={{ color: 'var(--red-pink)' }}>
            Enter your secret code to access your results
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Student Info */}
          <div className="mb-8 p-6 rounded-lg" style={{ backgroundColor: 'var(--gray-50)' }}>
            <h2 className="text-xl font-bold text-gray-700 mb-4">Student Information</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-semibold">{studentData.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Mean Grade</p>
                <p className="font-semibold">{studentData.meanGrade}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Eligibility</p>
                <p className="font-semibold text-green-600">{studentData.eligibilityLevel}</p>
              </div>
            </div>
          </div>

          {/* Secret Code Form */}
          <form onSubmit={handleVerifyCode}>
            <div className="mb-6">
              <label className="block text-gray-700 font-bold text-lg mb-3">
                Enter Secret Code
              </label>
              <input
                type="text"
                value={secretCode}
                onChange={(e) => setSecretCode(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg text-center font-mono" style={{ borderColor: 'var(--gray-300)' }} onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--kuccps-red)'; e.currentTarget.style.outline = 'none'; }} onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--gray-300)'; }}
                placeholder="Enter your secret code"
                required
              />
              <p className="text-sm text-gray-500 mt-2">
                Format: [Initials][Year][3-digit number] (e.g., JD2026482)
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-100 border-2 border-red-400 text-red-700 rounded-lg">
                <p className="font-bold text-center">{error}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <button
                type="submit"
                disabled={isVerifying}
                className="disabled:bg-gray-400 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors" style={{ backgroundColor: 'var(--kuccps-red)' }} onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = 'var(--red-dark)')} onMouseLeave={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = 'var(--kuccps-red)')}
              >
                {isVerifying ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </span>
                ) : (
                  'Verify Code'
                )}
              </button>

              <button
                type="button"
                onClick={handleGetCode}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
              >
                Get My Code
              </button>
            </div>
          </form>

          {/* Instructions */}
          <div className="mt-8 p-6 bg-yellow-50 rounded-lg">
            <h3 className="text-lg font-bold text-gray-700 mb-3">How to Get Your Secret Code:</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>Click the "Get My Code" button above</li>
              <li>Save your generated secret code securely</li>
              <li>Enter the code in the verification field</li>
              <li>Click "Verify Code" to access your results</li>
            </ol>
            <p className="text-sm text-gray-500 mt-4">
              Note: Each secret code is unique and tied to your name and current year.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm">
            KUCCPS Career Hub © 2026 | Independent Career Advisory Tool
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SecretCodePage;
