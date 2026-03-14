import React, { useState, useEffect } from 'react';
import { placementService } from '../services/api';

export default function InstitutionFilter({ onInstituitionsChange, onOwnershipChange }) {
  const [publicInstitutions, setPublicInstitutions] = useState([]);
  const [privateInstitutions, setPrivateInstitutions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ownership, setOwnership] = useState('All'); // All, Public, Private
  const [type, setType] = useState('All'); // All, University, Technical College, Diploma College

  useEffect(() => {
    const fetchInstitutions = async () => {
      setLoading(true);
      try {
        // Fetch public institutions
        const publicRes = await placementService.getPublicInstitutions();
        setPublicInstitutions(publicRes.data.institutions || []);

        // Fetch private institutions
        const privateRes = await placementService.getPrivateInstitutions();
        setPrivateInstitutions(privateRes.data.institutions || []);
      } catch (error) {
        console.error('Error fetching institutions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInstitutions();
  }, []);

  // Get filtered institutions based on current filters
  const getFilteredInstitutions = () => {
    let filtered = [];

    if (ownership === 'Public' || ownership === 'All') {
      filtered = [...filtered, ...publicInstitutions];
    }
    if (ownership === 'Private' || ownership === 'All') {
      filtered = [...filtered, ...privateInstitutions];
    }

    if (type !== 'All') {
      filtered = filtered.filter((inst) => inst.type === type);
    }

    return filtered;
  };

  const handleOwnershipChange = (newOwnership) => {
    setOwnership(newOwnership);
    onOwnershipChange?.(newOwnership);
  };

  const handleTypeChange = (newType) => {
    setType(newType);
  };

  const filteredInstitutions = getFilteredInstitutions();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Filter Institutions</h3>

      {/* Ownership Filter */}
      <div className="mb-4">
        <label className="block text-sm font-bold text-gray-700 mb-2">Institution Ownership:</label>
        <div className="flex gap-4">
          {['All', 'Public', 'Private'].map((option) => (
            <label key={option} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="ownership"
                value={option}
                checked={ownership === option}
                onChange={() => handleOwnershipChange(option)}
                className="mr-2"
              />
              <span className="text-gray-700">{option} Institutions</span>
            </label>
          ))}
        </div>
      </div>

      {/* Type Filter */}
      <div className="mb-4">
        <label className="block text-sm font-bold text-gray-700 mb-2">Institution Type:</label>
        <select
          value={type}
          onChange={(e) => handleTypeChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Types</option>
          <option value="University">Universities</option>
          <option value="Technical College">Technical Colleges</option>
          <option value="Diploma College">Diploma Colleges</option>
        </select>
      </div>

      {/* Institution List */}
      {loading ? (
        <div className="text-center py-4">
          <p className="text-gray-600">Loading institutions...</p>
        </div>
      ) : (
        <div>
          <p className="text-sm text-gray-600 mb-3">
            Showing {filteredInstitutions.length} institutions
          </p>
          <div className="max-h-96 overflow-y-auto border border-gray-200 rounded-lg">
            <div className="space-y-2 p-2">
              {filteredInstitutions.length > 0 ? (
                filteredInstitutions.map((inst) => (
                  <div
                    key={inst.code}
                    className="p-3 border border-gray-200 rounded-lg cursor-pointer transition-colors" style={{}} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--gray-50)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-800">{inst.name}</p>
                        <p className="text-sm text-gray-600">
                          {inst.type} • {inst.ownership} • {inst.county}
                        </p>
                      </div>
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded ${
                          inst.ownership === 'Public'
                            ? 'text-red-700' style={{ backgroundColor: 'var(--red-pink)' }}
                            : ''}'
                            : 'bg-purple-100 text-purple-800'
                        }`}
                      >
                        {inst.ownership}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center py-4 text-gray-600">No institutions match your filters</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Statistics */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--gray-50)' }}>
          <p className="text-sm text-gray-600">Public Institutions</p>
          <p className="text-2xl font-bold" style={{ color: 'var(--kuccps-red)' }}>{publicInstitutions.length}</p>
        </div>
        <div className="bg-purple-50 p-3 rounded-lg">
          <p className="text-sm text-gray-600">Private Institutions</p>
          <p className="text-2xl font-bold text-purple-600">{privateInstitutions.length}</p>
        </div>
      </div>
    </div>
  );
}
