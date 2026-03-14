import React, { useState } from 'react';
import { placementService } from '../services/api';

export default function GradeInputForm({ onAnalysisComplete }) {
  const [formData, setFormData] = useState({
    studentId: '',
    name: '',
    subjects: [],
    grades: {},
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const subjects = [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'English',
    'Kiswahili',
    'History',
    'Geography',
  ];

  const grades = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'E'];

  const handleSubjectChange = (subject) => {
    setFormData((prev) => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter((s) => s !== subject)
        : [...prev.subjects, subject],
    }));
  };

  const handleGradeChange = (subject, grade) => {
    setFormData((prev) => ({
      ...prev,
      grades: {
        ...prev.grades,
        [subject]: grade,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await placementService.analyzePlacement(formData);
      onAnalysisComplete(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Analysis failed. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">KCSE Results Input</h2>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Student Information */}
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">Student ID</label>
          <input
            type="text"
            value={formData.studentId}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, studentId: e.target.value }))
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., STU001"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">Full Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your full name"
            required
          />
        </div>

        {/* Subjects Selection */}
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">Select Subjects</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {subjects.map((subject) => (
              <label key={subject} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.subjects.includes(subject)}
                  onChange={() => handleSubjectChange(subject)}
                  className="mr-2"
                />
                {subject}
              </label>
            ))}
          </div>
        </div>

        {/* Grades Input */}
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-4">Enter Grades</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.subjects.map((subject) => (
              <div key={subject}>
                <label className="block text-gray-600 mb-1">{subject}</label>
                <select
                  value={formData.grades[subject] || ''}
                  onChange={(e) => handleGradeChange(subject, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select grade</option>
                  {grades.map((grade) => (
                    <option key={grade} value={grade}>
                      {grade}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full text-white font-bold py-3 rounded-lg transition duration-200 disabled:opacity-50" style={{ backgroundColor: 'var(--kuccps-red)' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--red-dark)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--kuccps-red)'}
        >
          {loading ? 'Analyzing...' : 'Analyze Eligibility'}
        </button>
      </form>
    </div>
  );
}
