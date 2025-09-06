import React, { useState, useRef, useEffect } from 'react';
import type { ChatInterfaceProps } from '../types';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  onSendMessage,
  onClearChat,
  isLoading,
  language
}) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const suggestions = language === 'hi' ? [
    'गणित में मदद चाहिए',
    'हिंदी व्याकरण सिखाएं',
    'भारतीय इतिहास के बारे में बताएं',
    'विज्ञान के बारे में पूछें'
  ] : [
    'Help with mathematics',
    'Teach Hindi grammar',
    'Tell about Indian history',
    'Ask about science'
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-4 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">
              {language === 'hi' ? 'चैट' : 'Chat'}
            </h2>
            <p className="text-primary-100 text-sm">
              {language === 'hi' 
                ? 'आपका AI शिक्षा सहायक' 
                : 'Your AI Education Assistant'
              }
            </p>
          </div>
          <button
            onClick={onClearChat}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors duration-200"
          >
            {language === 'hi' ? 'साफ करें' : 'Clear'}
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gray-50">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎓</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {language === 'hi' ? 'नमस्ते! मैं विद्यासाथी हूं' : 'Hello! I\'m Vidyasaathi'}
            </h3>
            <p className="text-gray-500 mb-6">
              {language === 'hi' 
                ? 'आज मैं आपकी कैसे मदद कर सकता हूं?'
                : 'How can I help you learn today?'
              }
            </p>
            
            {/* Quick Suggestions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-md mx-auto">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => onSendMessage(suggestion)}
                  className="bg-white hover:bg-primary-50 border border-gray-200 hover:border-primary-200 px-4 py-3 rounded-xl text-sm transition-all duration-200 hover:shadow-md"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} language={language} />
        ))}

        {isLoading && <TypingIndicator language={language} />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white border-t border-gray-100">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={language === 'hi' 
              ? 'अपना सवाल यहाँ लिखें...' 
              : 'Type your question here...'
            }
            className="input-modern flex-1"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
