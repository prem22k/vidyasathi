import React from 'react';

interface TypingIndicatorProps {
  language: 'en' | 'hi';
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ language }) => {
  return (
    <div className="flex justify-start animate-slide-up">
      <div className="chat-bubble chat-bubble-assistant">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
          <span className="text-sm text-gray-500">
            {language === 'hi' ? 'टाइप कर रहा है...' : 'Typing...'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
