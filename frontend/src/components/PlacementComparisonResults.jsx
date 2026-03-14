import React, { useState } from 'react';
import { placementService } from '../services/api';

export default function PlacementComparisonResults({
  analysisData,
  studentClusterScore,
  onDownloadReport,
}) {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('All'); // All, Degree, Diploma, Certificate

  if (!analysisData) return null;

  const {
    student_data,
    placement_comparison,
    eligibility_summary,
  } = analysisData;

  // Group programmes by level
  const degreesProgrammes = placement_comparison?.eligible_programmes?.filter(
    (p) => p.programme_level === 'Degree'
  ) || [];
  const diplomaProgrammes = placement_comparison?.eligible_programmes?.filter(
    (p) => p.programme_level === 'Diploma'
  ) || [];
  const certificateProgrammes = placement_comparison?.eligible_programmes?.filter(
    (p) => p.programme_level === 'Certificate'
  ) || [];
  const ineligibleProgrammes = placement_comparison?.ineligible_programmes || [];

  const getDisplayProgrammes = () => {
    switch (activeTab) {
      case 'Degree':
        return degreesProgrammes;
      case 'Diploma':
        return diplomaProgrammes;
      case 'Certificate':
        return certificateProgrammes;
      case 'Ineligible':
        return ineligibleProgrammes;
      default:
        return [
          ...degreesProgrammes,
          ...diplomaProgrammes,
          ...certificateProgrammes,
        ];
    }
  };

  const handleDownload = async () => {
    setLoading(true);
    try {
      const report = await placementService.generateReport({
        student_id: student_data.student_id,
        name: student_data.name,
        cluster_score: studentClusterScore,
        placement_comparison,
        eligibility_summary,
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

  const displayProgrammes = getDisplayProgrammes();
  const totalEligible = degreesProgrammes.length + diplomaProgrammes.length + certificateProgrammes.length;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Placement Eligibility Analysis</h2>

      {/* Student & Score Summary */}
      <div className="p-4 rounded-lg mb-6" style={{ backgroundColor: 'var(--gray-50)' }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-600">Student Name</p>
            <p className="text-lg font-bold text-gray-800">{student_data.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Student ID</p>
            <p className="text-lg font-bold text-gray-800">{student_data.student_id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Cluster Score</p>
            <p className="text-2xl font-bold" style={{ color: 'var(--kuccps-red)' }}>{studentClusterScore}</p>
          </div>
        </div>
      </div>

      {/* Eligibility Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
          <p className="text-sm text-gray-600">Degree Programmes</p>
          <p className="text-3xl font-bold text-green-600">{degreesProgrammes.length}</p>
        </div>
        <div className="p-4 rounded-lg border-l-4" style={{ backgroundColor: 'var(--gray-50)', borderLeftColor: 'var(--kuccps-red)' }}>
          <p className="text-sm text-gray-600">Diploma Programmes</p>
          <p className="text-3xl font-bold" style={{ color: 'var(--kuccps-red)' }}>{diplomaProgrammes.length}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
          <p className="text-sm text-gray-600">Certificate Programmes</p>
          <p className="text-3xl font-bold text-purple-600">{certificateProgrammes.length}</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
          <p className="text-sm text-gray-600">Total Eligible</p>
          <p className="text-3xl font-bold text-orange-600">{totalEligible}</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        {[
          { label: 'All', icon: '📋' },
          { label: 'Degree', icon: '🎓', count: degreesProgrammes.length },
          { label: 'Diploma', icon: '📜', count: diplomaProgrammes.length },
          { label: 'Certificate', icon: '✓', count: certificateProgrammes.length },
          { label: 'Ineligible', icon: '✗', count: ineligibleProgrammes.length },
        ].map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className="px-4 py-2 font-semibold transition-colors"
            style={{
              borderBottom: activeTab === tab.label ? '2px solid var(--kuccps-red)' : 'none',
              color: activeTab === tab.label ? 'var(--kuccps-red)' : 'var(--gray-600)',
              paddingBottom: activeTab === tab.label ? '6px' : '8px'
            }}
            onMouseEnter={(e) => {
              if (activeTab !== tab.label) e.currentTarget.style.color = 'var(--gray-800)';
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tab.label) e.currentTarget.style.color = 'var(--gray-600)';
            }}
          >
            {tab.icon} {tab.label} {tab.count !== undefined && `(${tab.count})`}
          </button>
        ))}
      </div>

      {/* Programmes List */}
      <div className="space-y-4 mb-6">
        {displayProgrammes.length > 0 ? (
          displayProgrammes.map((programme) => (
            <ProgrammeCard
              key={programme.programme_code || programme.code}
              programme={programme}
              studentScore={studentClusterScore}
              isEligible={!ineligibleProgrammes.some(
                (p) => p.programme_code === programme.programme_code || p.code === programme.code
              )}
            />
          ))
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-600">
              No {activeTab !== 'All' ? activeTab.toLowerCase() + ' ' : ''}
              programmes available
            </p>
          </div>
        )}
      </div>

      {/* Placement Summary */}
      {placement_comparison?.placement_summary && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded">
          <h3 className="font-bold text-green-800 mb-2">Summary & Recommendations</h3>
          <p className="text-gray-800">{placement_comparison.placement_summary}</p>
        </div>
      )}

      {/* Download Report Button */}
      <button
        onClick={handleDownload}
        disabled={loading}
        className="w-full text-white font-bold py-3 rounded-lg transition duration-200 disabled:opacity-50" style={{ backgroundColor: 'var(--kuccps-red)' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--red-dark)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--kuccps-red)'}
      >
        {loading ? 'Generating Report...' : 'Download Placement Advisory Report (PDF)'}
      </button>
    </div>
  );
}

// Sub-component for individual programme card
function ProgrammeCard({ programme, studentScore, isEligible }) {
  const getCutoffColor = () => {
    if (!isEligible) return 'red';
    if (programme.programme_level === 'Degree') return 'green';
    if (programme.programme_level === 'Diploma') return 'blue';
    return 'purple';
  };

  const getEligibilityBadge = () => {
    if (!isEligible) {
      return (
        <span className="bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-full">
          Ineligible
        </span>
      );
    }
    return (
      <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">
        Eligible
      </span>
    );
  };

  return (
    <div
      className={`border-l-4 p-4 rounded-r-lg ${
        isEligible
          ? 'bg-green-50 border-green-500'
          : 'bg-red-50 border-red-500'
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="text-lg font-bold text-gray-800">{programme.name}</h4>
          <p className="text-sm text-gray-600">
            {programme.institution_name || programme.institution_code} •{' '}
            <span
              className={`font-semibold ${
                programme.programme_level === 'Degree'
                  ? 'text-green-600'
                  : programme.programme_level === 'Diploma'
                  ? 'font-semibold' : ''
                  : 'text-purple-600'
              }`}
            >
              {programme.programme_level}
            </span>
          </p>
        </div>
        {getEligibilityBadge()}
      </div>

      {/* Cutoff Information */}
      <div className="bg-white bg-opacity-70 p-3 rounded mt-3 space-y-2">
        {programme.programme_level === 'Degree' && (
          <>
            <div className="flex justify-between items-center">
              <p className="text-sm font-semibold text-gray-700">2024 Cutoff:</p>
              <p className="text-lg font-bold" style={{ color: 'var(--kuccps-red)' }}>
                {programme.cutoff_2024}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm font-semibold text-gray-700">2025 Cutoff:</p>
              <p className="text-lg font-bold" style={{ color: 'var(--kuccps-red)' }}>
                {programme.cutoff_2025}
              </p>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
              <p className="text-sm font-semibold text-gray-700">Your Score:</p>
              <p className="text-lg font-bold text-orange-600">{studentScore}</p>
            </div>
            <div className="mt-2 pt-2 border-t border-gray-200">
              <CutoffGapIndicator
                studentScore={studentScore}
                cutoff2024={programme.cutoff_2024}
                cutoff2025={programme.cutoff_2025}
              />
            </div>
          </>
        )}

        {programme.programme_level === 'Diploma' && (
          <>
            <div className="flex justify-between items-center">
              <p className="text-sm font-semibold text-gray-700">Minimum Cluster Score:</p>
              <p className="text-lg font-bold" style={{ color: 'var(--kuccps-red)' }}>
                {programme.cluster_score_minimum}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm font-semibold text-gray-700">Your Score:</p>
              <p className="text-lg font-bold text-orange-600">{studentScore}</p>
            </div>
            <div className="mt-2 pt-2 border-t border-gray-200">
              <div
                className={`text-sm font-semibold ${
                  studentScore >= programme.cluster_score_minimum
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {studentScore >= programme.cluster_score_minimum
                  ? `✓ Meets requirement (${studentScore - programme.cluster_score_minimum} points above)`
                  : `✗ Below requirement (${programme.cluster_score_minimum - studentScore} points below)`}
              </div>
            </div>
          </>
        )}

        {programme.cluster_subjects && programme.cluster_subjects.length > 0 && (
          <div className="mt-2 pt-2 border-t border-gray-200">
            <p className="text-xs font-semibold text-gray-600 mb-1">Required Subjects:</p>
            <div className="flex gap-2 flex-wrap">
              {programme.cluster_subjects.map((subject) => (
                <span
                  key={subject}
                  className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded"
                >
                  {subject}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Programme Code */}
      <p className="text-xs text-gray-500 mt-2">Code: {programme.programme_code || programme.code}</p>
    </div>
  );
}

// Sub-component for cutoff gap visualization
function CutoffGapIndicator({ studentScore, cutoff2024, cutoff2025 }) {
  const gap2024 = studentScore - cutoff2024;
  const gap2025 = studentScore - cutoff2025;
  const qualifies2024 = gap2024 >= 0;
  const qualifies2025 = gap2025 >= 0;

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-gray-700 w-12">2024:</span>
        <div className="flex-1 bg-gray-200 rounded h-6 relative overflow-hidden">
          <div
            className={`h-full flex items-center justify-center text-xs font-bold transition-all ${
              qualifies2024
                ? 'bg-green-500 w-full text-white'
                : 'bg-red-500 w-full text-white'
            }`}
            style={{
              width: qualifies2024
                ? '100%'
                : `${(studentScore / cutoff2024) * 100}%`,
            }}
          >
            {qualifies2024 ? `+${gap2024}` : `-${Math.abs(gap2024)}`}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-gray-700 w-12">2025:</span>
        <div className="flex-1 bg-gray-200 rounded h-6 relative overflow-hidden">
          <div
            className={`h-full flex items-center justify-center text-xs font-bold transition-all ${
              qualifies2025
                ? 'bg-green-500 w-full text-white'
                : 'bg-red-500 w-full text-white'
            }`}
            style={{
              width: qualifies2025
                ? '100%'
                : `${(studentScore / cutoff2025) * 100}%`,
            }}
          >
            {qualifies2025 ? `+${gap2025}` : `-${Math.abs(gap2025)}`}
          </div>
        </div>
      </div>
    </div>
  );
}
