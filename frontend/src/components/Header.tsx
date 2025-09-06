import React from 'react';

interface HeaderProps {
  language: 'en' | 'hi';
}

const Header: React.FC<HeaderProps> = ({ language }) => {
  return (
    <header className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl mb-4 shadow-lg">
        <span className="text-2xl text-white">🎓</span>
      </div>
      <p className="text-gray-600 text-lg">
        {language === 'hi' 
          ? 'आपका व्यक्तिगत AI शिक्षा सहायक'
          : 'Your Personal AI Education Assistant'
        }
      </p>
    </header>
  );
};

export default Header;
