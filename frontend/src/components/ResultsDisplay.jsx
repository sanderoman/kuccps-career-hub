import React from 'react';
import { placementService } from '../services/api';

export default function ResultsDisplay({ analysisData, onDownloadReport }) {
  const [loading, setLoading] = React.useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const report = await placementService.generateReport({
        student_id: analysisData.student_data.student_id,
        name: analysisData.student_data.name,
        subject_count: analysisData.student_data.subject_count,
        eligibility: analysisData.eligibility,
      });

      await placementService.downloadReport(report.data.report);
      alert('Report generated successfully!');
    } catch (error) {
      alert('Failed to generate report');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!analysisData) return null;

  const { student_data, eligibility, recommendation } = analysisData;
  const { mean_points, eligible_programme_levels } = eligibility;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Placement Analysis Results</h2>

      {/* Student Summary */}
      <div className="p-4 rounded-lg mb-6" style={{ backgroundColor: 'var(--gray-50)' }}>
        <p className="text-lg">
          <strong>Student:</strong> {student_data.name}
        </p>
        <p className="text-lg">
          <strong>Mean Grade Points:</strong>{' '}
          <span className="font-bold" style={{ color: 'var(--kuccps-red)' }}>{mean_points}</span>
        </p>
        <p className="text-lg">
          <strong>Eligible Programme Levels:</strong>{' '}
          {eligible_programme_levels.join(', ')}
        </p>
      </div>

      {/* Recommendation Card */}
      <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
        <h3 className="font-bold text-green-800 mb-2">Recommendation</h3>
        <p className="text-gray-800">{recommendation.recommendation}</p>
      </div>

      {/* Eligible Programmes */}
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Eligible Programmes</h3>
        {eligibility.eligible_programmes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {eligibility.eligible_programmes.map((prog) => (
              <div key={prog} className="bg-green-100 p-4 rounded-lg border-l-4 border-green-500">
                <p className="font-bold text-green-800">{prog}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No eligible programmes found</p>
        )}
      </div>

      {/* Ineligible Programmes */}
      {eligibility.ineligible_programmes.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Programmes Requiring Improvement</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {eligibility.ineligible_programmes.map((prog) => (
              <div key={prog} className="bg-yellow-100 p-4 rounded-lg border-l-4 border-yellow-500">
                <p className="font-bold text-yellow-800">{prog}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Next Steps */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="font-bold text-gray-800 mb-3">Next Steps</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {recommendation.next_steps.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ul>
      </div>

      {/* Download Report Button */}
      <button
        onClick={handleDownload}
        disabled={loading}
        className="w-full text-white font-bold py-3 rounded-lg transition duration-200 disabled:opacity-50" style={{ backgroundColor: 'var(--kuccps-red)' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--red-dark)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--kuccps-red)'}
      >
        {loading ? 'Generating Report...' : 'Download Advisory Report (PDF)'}
      </button>
    </div>
  );
}
