import React, { useState, useRef, useEffect } from 'react';
import type { ChatInterfaceProps } from '../types';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

import type { Message } from '../App';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  onClearChat: () => void;
  isLoading: boolean;
  language: 'en' | 'hi';
}

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
    <div className="backdrop-blur-sm bg-white/10 dark:bg-gray-900/10 rounded-2xl border border-white/20 dark:border-gray-700/20 overflow-hidden shadow-2xl">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-indigo-500/80 to-purple-600/80 dark:from-indigo-600/80 dark:to-purple-700/80 backdrop-blur-sm px-6 py-4 text-white border-b border-white/20">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">
              {language === 'hi' ? 'चैट' : 'Chat'}
            </h2>
            <p className="text-white/80 text-sm">
              {language === 'hi' 
                ? 'आपका AI शिक्षा सहायक' 
                : 'Your AI Education Assistant'
              }
            </p>
          </div>
          <button
            onClick={onClearChat}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm"
          >
            {language === 'hi' ? 'साफ करें' : 'Clear'}
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-white/5 to-white/10 dark:from-gray-900/5 dark:to-gray-900/10">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎓</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              {language === 'hi' ? 'नमस्ते! मैं विद्यासाथी हूं' : 'Hello! I\'m Vidyasaathi'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
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
                  className="bg-white/20 dark:bg-gray-800/20 hover:bg-white/30 dark:hover:bg-gray-700/30 backdrop-blur-sm border border-white/30 dark:border-gray-600/30 hover:border-indigo-300 dark:hover:border-indigo-500 px-4 py-3 rounded-xl text-sm transition-all duration-300 hover:shadow-lg hover:scale-105 text-gray-800 dark:text-white"
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
      <div className="p-6 bg-white/10 dark:bg-gray-900/10 backdrop-blur-sm border-t border-white/20 dark:border-gray-700/20">
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
            className="flex-1 px-4 py-3 bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/30 dark:border-gray-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400 text-gray-800 dark:text-white transition-all duration-300"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100"
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
