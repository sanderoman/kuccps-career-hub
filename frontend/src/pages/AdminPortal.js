import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPortal = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [secretCodes, setSecretCodes] = useState([]);
  const [courses, setCourses] = useState([]);
  const [studentName, setStudentName] = useState('');
  const [newCourse, setNewCourse] = useState({
    name: '',
    institution: '',
    level: 'Degree',
    minGrade: 'C+'
  });

  // Check if already logged in
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('kusipsAdminAuth');
    if (isAuthenticated === 'true') {
      setIsLoggedIn(true);
      loadData();
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');

    if (username === 'ADMIN' && password === 'ADMIN') {
      setIsLoggedIn(true);
      localStorage.setItem('kusipsAdminAuth', 'true');
      loadData();
    } else {
      setLoginError('Invalid credentials. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('kusipsAdminAuth');
    setUsername('');
    setPassword('');
  };

  const loadData = () => {
    // Load secret codes from localStorage (in real app, this would be from backend)
    const codes = JSON.parse(localStorage.getItem('kusipsSecretCodes') || '[]');
    setSecretCodes(codes);

    // Load courses (sample data)
    const sampleCourses = [
      { id: 1, name: "Bachelor of Medicine & Surgery", institution: "University of Nairobi", level: "Degree", minGrade: "A-" },
      { id: 2, name: "Bachelor of Engineering (Civil)", institution: "JKUAT", level: "Degree", minGrade: "B+" },
      { id: 3, name: "Bachelor of Computer Science", institution: "Kenyatta University", level: "Degree", minGrade: "B" },
    ];
    setCourses(sampleCourses);
  };

  const generateSecretCode = () => {
    if (!studentName.trim()) {
      alert('Please enter student name');
      return;
    }

    const initials = studentName
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
    
    const year = new Date().getFullYear();
    const randomDigits = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const code = `${initials}${year}${randomDigits}`;

    const newCode = {
      id: Date.now(),
      code: code,
      studentName: studentName,
      active: true,
      createdAt: new Date().toISOString()
    };

    const updatedCodes = [...secretCodes, newCode];
    setSecretCodes(updatedCodes);
    localStorage.setItem('kusipsSecretCodes', JSON.stringify(updatedCodes));

    alert(`Secret code generated: ${code}`);
    setStudentName('');
  };

  const toggleCodeStatus = (id) => {
    const updatedCodes = secretCodes.map(code =>
      code.id === id ? { ...code, active: !code.active } : code
    );
    setSecretCodes(updatedCodes);
    localStorage.setItem('kusipsSecretCodes', JSON.stringify(updatedCodes));
  };

  const deleteCode = (id) => {
    if (window.confirm('Are you sure you want to delete this code?')) {
      const updatedCodes = secretCodes.filter(code => code.id !== id);
      setSecretCodes(updatedCodes);
      localStorage.setItem('kusipsSecretCodes', JSON.stringify(updatedCodes));
    }
  };

  const addCourse = () => {
    if (!newCourse.name || !newCourse.institution) {
      alert('Please fill in all course details');
      return;
    }

    const course = {
      id: Date.now(),
      ...newCourse
    };

    const updatedCourses = [...courses, course];
    setCourses(updatedCourses);
    setNewCourse({
      name: '',
      institution: '',
      level: 'Degree',
      minGrade: 'C+'
    });

    alert('Course added successfully!');
  };

  const deleteCourse = (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      const updatedCourses = courses.filter(course => course.id !== id);
      setCourses(updatedCourses);
      alert('Course deleted successfully!');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-8" style={{ color: 'var(--kuccps-red)' }}>
            Admin Portal
          </h1>
          
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border-2 rounded-lg"
                placeholder="Enter username"
                required
                style={{ borderColor: 'var(--gray-300)' }}
                onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--kuccps-red)'; e.currentTarget.style.outline = 'none'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--gray-300)'; }}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 rounded-lg"
                placeholder="Enter password"
                required
                style={{ borderColor: 'var(--gray-300)' }}
                onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--kuccps-red)'; e.currentTarget.style.outline = 'none'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--gray-300)'; }}
              />
            </div>

            {loginError && (
              <div className="mb-6 p-3 bg-red-100 border-2 border-red-400 text-red-700 rounded-lg">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full text-white font-bold py-3 rounded-lg transition-colors" style={{ backgroundColor: 'var(--kuccps-red)' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--red-dark)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--kuccps-red)'}
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="underline" style={{ color: 'var(--kuccps-red)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--red-dark)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--kuccps-red)'}
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="text-white py-6" style={{ backgroundColor: 'var(--kuccps-red)' }}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Admin Portal</h1>
            <p style={{ color: 'var(--red-pink)' }}>KUCCPS Career Hub Management</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex space-x-8">
            {['dashboard', 'codes', 'courses'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="py-4 px-2 border-b-2 font-medium capitalize"
                style={{
                  borderBottomColor: activeTab === tab ? 'var(--kuccps-red)' : 'transparent',
                  color: activeTab === tab ? 'var(--kuccps-red)' : 'var(--gray-500)'
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== tab) e.currentTarget.style.color = 'var(--gray-700)';
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== tab) e.currentTarget.style.color = 'var(--gray-500)';
                }}
              >
                {tab === 'dashboard' ? 'Dashboard' : tab === 'codes' ? 'Secret Codes' : 'Courses'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-700 mb-2">Total Secret Codes</h3>
              <p className="text-3xl font-bold" style={{ color: 'var(--kuccps-red)' }}>{secretCodes.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-700 mb-2">Active Codes</h3>
              <p className="text-3xl font-bold text-green-600">
                {secretCodes.filter(code => code.active).length}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-700 mb-2">Total Courses</h3>
              <p className="text-3xl font-bold text-purple-600">{courses.length}</p>
            </div>
          </div>
        )}

        {/* Secret Codes Tab */}
        {activeTab === 'codes' && (
          <div className="space-y-6">
            {/* Generate New Code */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-700 mb-4">Generate Secret Code</h2>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg"
                  style={{ borderColor: 'var(--gray-300)' }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--kuccps-red)'; e.currentTarget.style.outline = 'none'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--gray-300)'; }}
                  placeholder="Enter student name"
                />
                <button
                  onClick={generateSecretCode}
                  className="text-white font-bold py-2 px-6 rounded-lg transition-colors" style={{ backgroundColor: 'var(--kuccps-red)' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--red-dark)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--kuccps-red)'}
                >
                  Generate Code
                </button>
              </div>
            </div>

            {/* Codes List */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-700 mb-4">All Secret Codes</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">Code</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Student Name</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Created</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {secretCodes.map((code) => (
                      <tr key={code.id}>
                        <td className="border border-gray-300 px-4 py-2 font-mono">{code.code}</td>
                        <td className="border border-gray-300 px-4 py-2">{code.studentName}</td>
                        <td className="border border-gray-300 px-4 py-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            code.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {code.active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {new Date(code.createdAt).toLocaleDateString()}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <button
                            onClick={() => toggleCodeStatus(code.id)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2 text-sm"
                          >
                            {code.active ? 'Deactivate' : 'Activate'}
                          </button>
                          <button
                            onClick={() => deleteCode(code.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            {/* Add New Course */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-700 mb-4">Add New Course</h2>
              <div className="grid md:grid-cols-4 gap-4">
                <input
                  type="text"
                  value={newCourse.name}
                  onChange={(e) => setNewCourse({...newCourse, name: e.target.value})}
                  className="px-4 py-2 border-2 rounded-lg"
                  style={{ borderColor: 'var(--gray-300)' }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--kuccps-red)'; e.currentTarget.style.outline = 'none'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--gray-300)'; }}
                  placeholder="Course name"
                />
                <input
                  type="text"
                  value={newCourse.institution}
                  onChange={(e) => setNewCourse({...newCourse, institution: e.target.value})}
                  className="px-4 py-2 border-2 rounded-lg"
                  style={{ borderColor: 'var(--gray-300)' }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--kuccps-red)'; e.currentTarget.style.outline = 'none'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--gray-300)'; }}
                  placeholder="Institution"
                />
                <select
                  value={newCourse.level}
                  onChange={(e) => setNewCourse({...newCourse, level: e.target.value})}
                  className="px-4 py-2 border-2 rounded-lg"
                  style={{ borderColor: 'var(--gray-300)' }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--kuccps-red)'; e.currentTarget.style.outline = 'none'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--gray-300)'; }}
                >
                  <option value="Degree">Degree</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Certificate">Certificate</option>
                </select>
                <select
                  value={newCourse.minGrade}
                  onChange={(e) => setNewCourse({...newCourse, minGrade: e.target.value})}
                  className="px-4 py-2 border-2 rounded-lg"
                  style={{ borderColor: 'var(--gray-300)' }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--kuccps-red)'; e.currentTarget.style.outline = 'none'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--gray-300)'; }}
                >
                  <option value="A">A</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B">B</option>
                  <option value="B-">B-</option>
                  <option value="C+">C+</option>
                  <option value="C">C</option>
                  <option value="C-">C-</option>
                  <option value="D+">D+</option>
                </select>
              </div>
              <button
                onClick={addCourse}
                className="mt-4 text-white font-bold py-2 px-6 rounded-lg transition-colors" style={{ backgroundColor: 'var(--kuccps-red)' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--red-dark)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--kuccps-red)'}
              >
                Add Course
              </button>
            </div>

            {/* Courses List */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-700 mb-4">All Courses</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">Course Name</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Institution</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Level</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Min Grade</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course) => (
                      <tr key={course.id}>
                        <td className="border border-gray-300 px-4 py-2">{course.name}</td>
                        <td className="border border-gray-300 px-4 py-2">{course.institution}</td>
                        <td className="border border-gray-300 px-4 py-2">{course.level}</td>
                        <td className="border border-gray-300 px-4 py-2">{course.minGrade}</td>
                        <td className="border border-gray-300 px-4 py-2">
                          <button
                            onClick={() => deleteCourse(course.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPortal;
