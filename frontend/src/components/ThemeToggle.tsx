import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        isDark 
          ? 'bg-indigo-600 focus:ring-indigo-500' 
          : 'bg-gray-200 focus:ring-indigo-500'
      }`}
      aria-label="Toggle theme"
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
          isDark ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
      <span className={`absolute left-1 transition-opacity duration-300 ${
        isDark ? 'opacity-0' : 'opacity-100'
      }`}>
        ☀️
      </span>
      <span className={`absolute right-1 transition-opacity duration-300 ${
        isDark ? 'opacity-100' : 'opacity-0'
      }`}>
        🌙
      </span>
    </button>
  );
};

export default ThemeToggle;
