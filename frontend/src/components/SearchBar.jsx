import React, { useState } from 'react';

export default function SearchBar() {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() === '') return;
    const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    window.open(url, '_blank');
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center w-full max-w-md mx-auto mb-6">
      <input
        type="text"
        placeholder="Search anything on Google..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="text-white px-4 py-2 rounded-r-lg" style={{ backgroundColor: 'var(--kuccps-red)' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--red-dark)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--kuccps-red)'}
      >
        Search
      </button>
    </form>
  );
}
