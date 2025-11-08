import { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import Header from './components/Header';
import LanguageToggle from './components/LanguageToggle';
import FeedbackModal from './components/FeedbackModal';
import AnimatedBackground from './components/AnimatedBackground';
import ThemeToggle from './components/ThemeToggle';
import { ThemeProvider } from './contexts/ThemeContext';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  isTyping?: boolean;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentResponse, setCurrentResponse] = useState<string>('');
  const [currentUserInput, setCurrentUserInput] = useState<string>('');

  const sendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentUserInput(text);
    setIsLoading(true);

    try {
      const response = await fetch('https://vidyasathi-production.up.railway.app/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setCurrentResponse(data.response);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: language === 'hi' 
          ? 'क्षमा करें, कुछ तकनीकी समस्या है। कृपया बाद में कोशिश करें।'
          : 'Sorry, there was a technical issue. Please try again later.',
        sender: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen relative transition-colors duration-500 dark:text-white">
        <AnimatedBackground />
        
        <div className="relative z-10 container mx-auto max-w-4xl px-4 py-6">
          <Header language={language} />
          
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent font-hindi animate-fade-in">
              {language === 'hi' ? 'विद्यासाथी' : 'Vidyasaathi'}
            </h1>
            <div className="flex gap-4 items-center">
              <ThemeToggle />
              <LanguageToggle language={language} onToggle={setLanguage} />
              <button
                onClick={() => setShowFeedback(true)}
                className="px-4 py-2 bg-white/20 dark:bg-white/10 backdrop-blur-sm border border-white/30 dark:border-white/20 rounded-lg hover:bg-white/30 dark:hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                {language === 'hi' ? 'फीडबैक' : 'Feedback'}
              </button>
            </div>
          </div>

          <div className="backdrop-blur-sm bg-white/30 dark:bg-gray-900/30 rounded-2xl border border-white/20 dark:border-gray-700/30 shadow-2xl">
            <ChatInterface
              messages={messages}
              onSendMessage={sendMessage}
              onClearChat={clearChat}
              isLoading={isLoading}
              language={language}
            />
          </div>

          <FeedbackModal
            isOpen={showFeedback}
            onClose={() => setShowFeedback(false)}
            language={language}
            currentResponse={currentResponse}
            currentUserInput={currentUserInput}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
