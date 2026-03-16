import React from 'react';

const AdvancedCourseResults = ({ studentData, recommendations, error }) => {
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--gray-50)' }}>
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">❌ Error Loading Results</div>
          <div className="text-gray-600">{error}</div>
        </div>
      </div>
    );
  }

  if (!recommendations) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--gray-50)' }}>
        <div className="text-center">
          <div className="text-gray-600">Loading recommendations...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--gray-50)' }}>
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            🎯 Advanced Course Recommendations
          </h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              📊 Summary for {studentData.name}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <div className="text-blue-900 dark:text-blue-300 font-semibold">
                  Mean Grade
                </div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {studentData.meanGrade}
                </div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <div className="text-green-900 dark:text-green-300 font-semibold">
                  Total Matches
                </div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {recommendations.summary?.totalMatches || 0}
                </div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <div className="text-purple-900 dark:text-purple-300 font-semibold">
                  Best Match
                </div>
                <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                  {recommendations.summary?.bestMatch || 'N/A'}
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="text-gray-600">
              🎉 Advanced analysis complete! Found {recommendations.summary?.totalMatches || 0} matching programmes.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedCourseResults;
