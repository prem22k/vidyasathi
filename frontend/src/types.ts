export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export interface MessageBubbleProps {
  message: Message;
  language: 'hi' | 'en';
}

export interface TypingIndicatorProps {
  language: 'hi' | 'en';
}

export interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  onClearChat: () => void;
  isLoading: boolean;
  language: 'hi' | 'en';
}

export interface HeaderProps {
  language: 'hi' | 'en';
}

export interface LanguageToggleProps {
  language: 'hi' | 'en';
  onToggle: (lang: 'hi' | 'en') => void;
}

export interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'hi' | 'en';
  currentResponse: string;
}
