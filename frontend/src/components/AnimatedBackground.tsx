import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const AnimatedBackground: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Main gradient background */}
      <div className={`absolute inset-0 transition-all duration-1000 ${
        isDark 
          ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800' 
          : 'bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-200'
      }`} />
      
      {/* Animated gradient orbs */}
      <div className={`absolute top-0 -left-4 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob ${
        isDark ? 'bg-purple-300' : 'bg-yellow-300'
      }`} />
      
      <div className={`absolute top-0 -right-4 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 ${
        isDark ? 'bg-pink-300' : 'bg-pink-300'
      }`} />
      
      <div className={`absolute -bottom-8 left-20 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 ${
        isDark ? 'bg-blue-300' : 'bg-blue-300'
      }`} />

      {/* Floating geometric shapes */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 rounded-full animate-float ${
              isDark ? 'bg-white/20' : 'bg-indigo-400/30'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Grid pattern overlay */}
      <div className={`absolute inset-0 opacity-[0.02] ${
        isDark ? 'bg-white' : 'bg-gray-900'
      }`} 
      style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
        backgroundSize: '20px 20px'
      }} />
    </div>
  );
};

export default AnimatedBackground;
