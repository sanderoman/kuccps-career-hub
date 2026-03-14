import React, { useState, useMemo, useEffect } from 'react';
import { generateCourseRecommendations } from '../services/courseRecommendationEngine';

const AdvancedCourseResults = ({ studentData }) => {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [filterLevel, setFilterLevel] = useState('all');
  const [recommendations, setRecommendations] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiStatus, setApiStatus] = useState('🔄 Fetching...');
  const [error, setError] = useState(null);

  const interests = [
    'Engineering',
    'ICT',
    'Health',
    'Medicine',
    'Business',
    'Economics',
    'Education',
    'Humanities',
    'Law',
    'Psychology',
    'Science',
    'Technology',
    'Finance',
    'Management',
    'Teaching',
    'Hospitality',
    'Trade',
    'Design',
    'Fashion',
    'Politics'
  ];

  // Generate recommendations based on selected interests
  useEffect(() => {
    const fetchRecommendations = async () => {
      setIsLoading(true);
      setApiStatus('🔄 Loading recommendations...');
      setError(null);
      try {
        const results = await generateCourseRecommendations(studentData, selectedInterests, true);
        console.debug('generateCourseRecommendations returned:', results);
        if (results && results.summary) {
          setRecommendations(results);
          setApiStatus(results.summary.dataSource);
        } else {
          throw new Error('Invalid response format from recommendation engine: ' + JSON.stringify(results));
        }
      } catch (err) {
        console.error('Error generating recommendations:', err);
        setError(err.message || 'Unknown error occurred');
        setApiStatus('❌ Error loading data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, [studentData, selectedInterests]);

  // Filter programmes by level
  const displayProgrammes = useMemo(() => {
    if (!recommendations) return [];
    
    let programmes = recommendations.allProgrammes;

    if (filterLevel === 'degree') {
      programmes = recommendations.degrees;
    } else if (filterLevel === 'diploma') {
      programmes = recommendations.diplomas;
    } else if (filterLevel === 'certificate') {
      programmes = recommendations.certificates;
    }

    return programmes;
  }, [recommendations, filterLevel]);

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const getMatchColor = (percentage) => {
    if (percentage >= 100) return '#2ecc71'; // Green
    if (percentage >= 80) return '#3498db'; // Blue
    if (percentage >= 60) return '#f39c12'; // Orange
    return '#e74c3c'; // Red
  };

  const ProgrammeCard = ({ programme }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all p-6 border-l-4" 
         style={{ borderColor: `var(--kuccps-red)` }}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {programme.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            {programme.institution} • {programme.institutionType}
          </p>
        </div>
        <span className="px-3 py-1 rounded-full text-sm font-semibold"
              style={{
                backgroundColor: `${getMatchColor(programme.matchPercentage)}20`,
                color: getMatchColor(programme.matchPercentage)
              }}>
          {programme.matchPercentage}% Match
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-700 dark:text-gray-400">Minimum Requirement:</span>
          <span className="font-semibold text-gray-900 dark:text-white">
            {programme.minimumRequirement}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-700 dark:text-gray-400">Required Subjects:</span>
          <span className="font-semibold text-gray-900 dark:text-white">
            {programme.clusterSubjects.join(', ')}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-700 dark:text-gray-400">Career Field:</span>
          <span className="font-semibold text-gray-900 dark:text-white">
            {programme.careField}
          </span>
        </div>
      </div>

      {/* Match percentage bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
        <div 
          className="h-full transition-all"
          style={{
            width: `${Math.min(programme.matchPercentage, 100)}%`,
            backgroundColor: getMatchColor(programme.matchPercentage)
          }}
        />
      </div>

      <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        Your Cluster Score: {programme.clusterScore} / {programme.clusterScoreMinimum} required
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* API Status Indicator */}
      {apiStatus && (
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-lg">
              {apiStatus.includes('LIVE') ? '🔴' : apiStatus.includes('Local') ? '📦' : '⏳'}
            </span>
            <span className="text-sm font-medium text-blue-900 dark:text-blue-300">
              Data Source: {apiStatus}
            </span>
          </div>
          {isLoading && (
            <div className="animate-spin text-blue-600">⟳</div>
          )}
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-700 mb-4">
          <p className="text-red-700 dark:text-red-300 font-medium">⚠️ Error: {error}</p>
          <p className="text-sm text-red-600 dark:text-red-400 mt-2">Tip: Make sure the database is loaded and you have valid KCSE grades.</p>
        </div>
      )}

      {/* Loading State */}
      {isLoading && !recommendations && (
        <div className="flex justify-center py-8">
          <div className="text-center">
            <div className="animate-spin text-4xl text-red-600 mb-3">⟳</div>
            <p className="text-gray-600 dark:text-gray-400">Fetching recommendations...</p>
          </div>
        </div>
      )}

      {/* Summary Statistics */}
      {recommendations && !error && (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-700">
          <p className="text-gray-600 dark:text-gray-400 text-sm">Mean Grade</p>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">{studentData.meanGrade}</p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
          <p className="text-gray-600 dark:text-gray-400 text-sm">Total Matches</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{recommendations.summary.totalMatches}</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-700">
          <p className="text-gray-600 dark:text-gray-400 text-sm">Degrees</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{recommendations.summary.degreeCount}</p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-700">
          <p className="text-gray-600 dark:text-gray-400 text-sm">Diplomas</p>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{recommendations.summary.diplomaCount}</p>
        </div>
      </div>
      )}

      {/* Interest Filter Section */}
      {recommendations && !error && (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
          <span className="w-1 h-6 bg-red-600 mr-3 rounded"></span>
          Filter by Your Interests
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Select your areas of interest to see relevant programmes
        </p>
        <div className="flex flex-wrap gap-2">
          {interests.map(interest => (
            <button
              key={interest}
              onClick={() => toggleInterest(interest)}
              className={`px-4 py-2 rounded-full font-medium transition-all text-sm ${
                selectedInterests.includes(interest)
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {interest}
            </button>
          ))}
        </div>
        {selectedInterests.length > 0 && (
          <button
            onClick={() => setSelectedInterests([])}
            className="mt-4 text-sm text-red-600 dark:text-red-400 hover:underline"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Programme Level Filter */}
      {recommendations && !error && (
      <div className="flex gap-3 border-b border-gray-200 dark:border-gray-700">
        {[
          { key: 'all', label: '📚 All Programmes', count: recommendations.summary.totalMatches },
          { key: 'degree', label: '🎓 Degree Programmes', count: recommendations.summary.degreeCount },
          { key: 'diploma', label: '📖 Diploma Programmes', count: recommendations.summary.diplomaCount },
          { key: 'certificate', label: '🏆 Certificate Programmes', count: recommendations.summary.certificateCount }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilterLevel(tab.key)}
            className={`px-4 py-3 font-medium text-sm transition-colors relative ${
              filterLevel === tab.key
                ? 'text-red-600 dark:text-red-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            {tab.label} ({tab.count})
            {filterLevel === tab.key && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-600"></div>
            )}
          </button>
        ))}
      </div>

      )}

      {/* Results Section */}
      {recommendations && !error && (displayProgrammes.length > 0 ? (
        <div className="space-y-4">
          {displayProgrammes.map(programme => (
            <ProgrammeCard key={programme.id} programme={programme} />
          ))}
        </div>
      ) : (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-8 text-center border border-yellow-200 dark:border-yellow-700">
          <p className="text-gray-700 dark:text-gray-300 font-medium">
            No programmes found matching your criteria.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Try adjusting your interest filters or checking lower qualification levels.
          </p>
        </div>
      ) : (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-8 text-center border border-yellow-200 dark:border-yellow-700">
          <p className="text-gray-700 dark:text-gray-300 font-medium">
            No programmes found matching your criteria.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Try adjusting your interest filters or checking lower qualification levels.
          </p>
        </div>
      )}

      )}

      {/* Tips Section */}
      {recommendations && !error && (
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-700">
        <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-3">💡 Quick Tips</h4>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
          <li>• Your mean grade is <strong>{studentData.meanGrade}</strong> - programmes requiring this or lower are shown</li>
          <li>• Match percentage reflects how well your cluster scores align with programme requirements</li>
          <li>• Use interest filters to narrow down to relevant fields</li>
          <li>• Degree programmes are prioritized as they offer highest qualification level</li>
          <li>• Contact institutions directly for specific admission requirements and application deadlines</li>
        </ul>
      </div>
      )}
    </div>
  );
};

export default AdvancedCourseResults;
