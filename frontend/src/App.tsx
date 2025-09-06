import { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import Header from './components/Header';
import LanguageToggle from './components/LanguageToggle';
import FeedbackModal from './components/FeedbackModal';

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

  const sendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
<<<<<<< HEAD
      const response = await fetch('https://vidyasathi-production.up.railway.app/chat', {
=======
      const response = await fetch('http://localhost:5000/chat', {
>>>>>>> 2aa740dfbd8eeb61aeab796c20f58550b72e573c
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto max-w-4xl px-4 py-6">
        <Header language={language} />
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 font-hindi">
            {language === 'hi' ? 'विद्यासाथी' : 'Vidyasaathi'}
          </h1>
          <div className="flex gap-4">
            <LanguageToggle language={language} onToggle={setLanguage} />
            <button
              onClick={() => setShowFeedback(true)}
              className="btn-secondary"
            >
              {language === 'hi' ? 'फीडबैक' : 'Feedback'}
            </button>
          </div>
        </div>

        <ChatInterface
          messages={messages}
          onSendMessage={sendMessage}
          onClearChat={clearChat}
          isLoading={isLoading}
          language={language}
        />

        <FeedbackModal
          isOpen={showFeedback}
          onClose={() => setShowFeedback(false)}
          language={language}
          currentResponse={currentResponse}
        />
      </div>
    </div>
  );
}

export default App;
