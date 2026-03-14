import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg transition-all transform hover:scale-110"
      style={{
        backgroundColor: isDarkMode ? 'var(--gray-200)' : 'var(--red-light)',
        color: isDarkMode ? 'var(--kuccps-black)' : 'var(--kuccps-white)',
        border: `2px solid ${isDarkMode ? 'var(--gray-300)' : 'var(--kuccps-red)'}`,
        fontSize: '18px'
      }}
      title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {isDarkMode ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
};

export default ThemeToggle;
