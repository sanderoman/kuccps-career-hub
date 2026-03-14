import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';

const EntryPage = () => {
  const navigate = useNavigate();
  const [studentName, setStudentName] = useState('');
  const [grades, setGrades] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const gradeOptions = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'E'];
  
  const kcseSubjects = [
    'English', 'Kiswahili', 'Mathematics', 'Biology', 'Chemistry', 'Physics',
    'History', 'Geography', 'CRE', 'IRE', 'Computer Studies', 'Business Studies',
    'Agriculture', 'Home Science', 'Art & Design', 'French', 'German', 'Arabic',
    'Music', 'Aviation Technology'
  ];

  const gradePoints = {
    'A': 12, 'A-': 11, 'B+': 10, 'B': 9, 'B-': 8,
    'C+': 7, 'C': 6, 'C-': 5, 'D+': 4, 'D': 3, 'D-': 2, 'E': 1
  };

  const handleGradeChange = (subject, grade) => {
    setGrades(prev => ({
      ...prev,
      [subject]: grade
    }));
  };

  const calculateMeanGrade = () => {
    const enteredGrades = Object.values(grades).filter(grade => grade);
    if (enteredGrades.length === 0) return null;
    
    const totalPoints = enteredGrades.reduce((sum, grade) => sum + gradePoints[grade], 0);
    const meanPoints = totalPoints / enteredGrades.length;
    
    // Convert mean points back to grade
    if (meanPoints >= 11.5) return 'A';
    if (meanPoints >= 10.5) return 'A-';
    if (meanPoints >= 9.5) return 'B+';
    if (meanPoints >= 8.5) return 'B';
    if (meanPoints >= 7.5) return 'B-';
    if (meanPoints >= 6.5) return 'C+';
    if (meanPoints >= 5.5) return 'C';
    if (meanPoints >= 4.5) return 'C-';
    if (meanPoints >= 3.5) return 'D+';
    if (meanPoints >= 2.5) return 'D';
    if (meanPoints >= 1.5) return 'D-';
    return 'E';
  };

  const getEligibilityLevel = (meanGrade) => {
    if (!meanGrade) return null;
    
    if (['A', 'A-', 'B+', 'B', 'B-', 'C+'].includes(meanGrade)) {
      return 'Degree Programs';
    } else if (['C', 'C-'].includes(meanGrade)) {
      return 'Diploma Programs';
    } else {
      return 'Certificate & Artisan Programs';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!studentName.trim()) {
      alert('Please enter your name');
      return;
    }

    const enteredGrades = Object.values(grades).filter(grade => grade);
    if (enteredGrades.length < 7) {
      alert('Please enter at least 7 subjects');
      return;
    }

    setIsSubmitting(true);

    const meanGrade = calculateMeanGrade();
    const eligibilityLevel = getEligibilityLevel(meanGrade);

    // Store data in localStorage for later use
    const studentData = {
      name: studentName,
      grades: grades,
      meanGrade: meanGrade,
      eligibilityLevel: eligibilityLevel,
      timestamp: new Date().toISOString()
    };

    localStorage.setItem('kusipsStudentData', JSON.stringify(studentData));

    // Navigate to results page
    setTimeout(() => {
      navigate('/results');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--gray-50)' }}>
      {/* Header */}
      <header style={{ backgroundColor: 'var(--kuccps-red)', color: 'var(--kuccps-white)', borderBottom: '4px solid var(--red-dark)' }} className="py-8 shadow-lg">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex justify-between items-center mb-4">
            <Link to="/" className="inline-block transition-colors" style={{ color: 'var(--red-pink)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--kuccps-white)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--red-pink)'}>
              ← Back to Home
            </Link>
            <ThemeToggle />
          </div>
          <h1 className="text-4xl font-bold mb-4">📋 Enter Your KCSE Grades</h1>
          <p style={{ color: 'var(--red-pink)' }} className="text-lg">
            Input your grades to calculate your eligibility for university courses
          </p>
        </div>
      </header>

      {/* Main Form */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="rounded-xl shadow-2xl p-10 card-hover" style={{ backgroundColor: 'var(--kuccps-white)', border: '1px solid var(--gray-200)' }}>
          <form onSubmit={handleSubmit}>
            {/* Student Name */}
            <div className="mb-8">
              <label className="block font-bold text-lg mb-3" style={{ color: 'var(--kuccps-black)' }}>
                Student Name
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full px-4 py-3 border-2 rounded-lg text-lg focus:outline-none transition-colors"
                style={{ 
                  borderColor: 'var(--gray-300)',
                  backgroundColor: 'var(--kuccps-white)',
                  color: 'var(--kuccps-black)'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--kuccps-red)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--gray-300)'}
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Subjects Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-8 pb-4\" style={{ color: 'var(--kuccps-black)', borderBottom: '3px solid var(--kuccps-red)' }}>
                📊 Select Your Grades for Each Subject
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                {kcseSubjects.map((subject) => (
                  <div key={subject} className="flex items-center justify-between p-5 rounded-lg card-hover transition-all" style={{ 
                    backgroundColor: 'var(--gray-100)',
                    border: '2px solid var(--gray-200)',
                    cursor: 'pointer'
                  }}>
                    <label className="font-semibold flex-1" style={{ color: 'var(--kuccps-black)' }}>
                      {subject}
                    </label>
                    <select
                      value={grades[subject] || ''}
                      onChange={(e) => handleGradeChange(subject, e.target.value)}
                      className="px-4 py-2 border-2 rounded-lg font-bold focus:outline-none transition-all"
                      style={{ 
                        borderColor: grades[subject] ? 'var(--kuccps-red)' : 'var(--gray-300)',
                        backgroundColor: 'var(--kuccps-white)',
                        color: grades[subject] ? 'var(--kuccps-red)' : 'var(--kuccps-black)',
                        boxShadow: grades[subject] ? '0 0 8px rgba(196, 30, 58, 0.2)' : 'none'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--kuccps-red)'}
                      onBlur={(e) => e.target.style.borderColor = grades[subject] ? 'var(--kuccps-red)' : 'var(--gray-300)'}
                    >
                      <option value="">Select Grade</option>
                      {gradeOptions.map((grade) => (
                        <option key={grade} value={grade}>
                          {grade}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>

            {/* Preview Section */}
            {Object.keys(grades).length > 0 && (
              <div className="mb-8 p-8 rounded-xl" style={{ backgroundColor: 'var(--gray-100)', border: '2px solid var(--kuccps-red)', boxShadow: '0 4px 15px rgba(196, 30, 58, 0.15)' }}>
                <h3 className="text-xl font-bold mb-6" style={{ color: 'var(--kuccps-red)', paddingBottom: '12px', borderBottom: '2px solid var(--kuccps-red)' }}>📈 Performance Preview</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-6 rounded-lg text-center" style={{ backgroundColor: 'var(--kuccps-white)', border: '2px solid var(--gray-300)' }}>
                    <p className="text-sm font-semibold mb-2" style={{ color: 'var(--gray-600)' }}>Entered Subjects</p>
                    <p className="text-3xl font-bold" style={{ color: 'var(--kuccps-red)' }}>
                      {Object.values(grades).filter(grade => grade).length}
                    </p>
                  </div>
                  <div className="p-6 rounded-lg text-center" style={{ backgroundColor: 'var(--kuccps-white)', border: '2px solid var(--kuccps-red)', boxShadow: '0 2px 8px rgba(196, 30, 58, 0.2)' }}>
                    <p className="text-sm font-semibold mb-2" style={{ color: 'var(--gray-600)' }}>Mean Grade</p>
                    <p className="text-3xl font-bold" style={{ color: 'var(--kuccps-red)' }}>
                      {calculateMeanGrade() || '---'}
                    </p>
                  </div>
                  <div className="p-6 rounded-lg text-center" style={{ backgroundColor: 'var(--kuccps-white)', border: '2px solid var(--gray-300)' }}>
                    <p className="text-sm font-semibold mb-2" style={{ color: 'var(--gray-600)' }}>Eligibility</p>
                    <p className="text-lg font-bold" style={{ color: 'var(--red-medium)' }}>
                      {getEligibilityLevel(calculateMeanGrade()) || '---'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary font-bold py-4 px-8 rounded-lg text-lg transition-all disabled:opacity-50"
                style={{ 
                  backgroundColor: isSubmitting ? 'var(--gray-400)' : 'var(--kuccps-red)',
                  color: 'var(--kuccps-white)'
                }}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Submit & Continue'
                )}
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: 'var(--kuccps-black)', color: 'var(--kuccps-white)' }} className="py-8 mt-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm">
            KUCCPS Career Hub © 2026 | Independent Career Advisory Tool
          </p>
        </div>
      </footer>
    </div>
  );
};

export default EntryPage;
