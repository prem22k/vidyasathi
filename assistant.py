import os
import requests
import json
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

class VidyasaathiAssistant:
    def __init__(self):
        # Primary API: Google Gemini (free and reliable)
        self.gemini_api_key = os.getenv('GEMINI_API_KEY')
        self.gemini_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"
        
        # Fallback API: Groq (also free)
        self.groq_api_key = os.getenv('GROQ_API_KEY')
        self.groq_url = "https://api.groq.com/openai/v1/chat/completions"
        
        # Load system prompt with error handling
        try:
            with open('system_prompt.txt', 'r', encoding='utf-8') as f:
                self.system_prompt = f.read()
        except FileNotFoundError:
            print("Warning: system_prompt.txt not found, using default prompt")
            self.system_prompt = "You are Vidyasaathi, a helpful Hindi AI assistant for education."
        
        self.conversation_history = []
    
    def query_model(self, user_input):
        """Query AI model with user input - tries Groq first, then fallback"""
        
        # Try Groq API first (free open-source models)
        if self.groq_api_key:
            response = self._query_groq(user_input)
            if response:
                return response
        
        # Fallback to local responses
        print("Using fallback responses - no API available")
        return self._get_fallback_response(user_input)
    
    def _query_groq(self, user_input):
        """Query Groq API with Llama model"""
        try:
            # Prepare conversation history for API
            messages = [{"role": "system", "content": self.system_prompt}]
            
            # Add recent conversation history
            for exchange in self.conversation_history[-3:]:
                messages.append({"role": "user", "content": exchange['user']})
                messages.append({"role": "assistant", "content": exchange['assistant']})
            
            # Add current user message
            messages.append({"role": "user", "content": user_input})
            
            payload = {
                "messages": messages,
                "model": "llama-3.3-70b-versatile",  # Current Groq model with multilingual support
                "temperature": 0.7,
                "max_tokens": 512,
                "top_p": 0.9
            }
            
            headers = {
                "Authorization": f"Bearer {self.groq_api_key}",
                "Content-Type": "application/json"
            }
            
            print(f"Making API request to Groq (Llama 3.1)")
            response = requests.post(self.groq_url, headers=headers, json=payload, timeout=10)
            
            if response.status_code == 200:
                result = response.json()
                assistant_response = result['choices'][0]['message']['content']
                
                # Store in conversation history
                self.conversation_history.append({
                    'user': user_input,
                    'assistant': assistant_response,
                    'timestamp': datetime.now().isoformat()
                })
                
                print(f"Groq API Success: {len(assistant_response)} characters")
                return assistant_response
            else:
                print(f"Groq API Error: {response.status_code} - {response.text}")
                return None
                
        except Exception as e:
            print(f"Groq API Exception: {e}")
            return None
    
    def _get_fallback_response(self, user_input):
        """Provide fallback responses when API is unavailable"""
        user_input_lower = user_input.lower()
        
        fallback_responses = {
            "hello": "Hello! I'm Vidyasaathi, your AI assistant for education in Hindi. How can I help you today?",
            "hi": "Hi there! I'm here to help with your educational needs. What would you like to learn about?",
            "namaste": "नमस्ते! मैं विद्यासाथी हूं, आपका शिक्षा सहायक। आज मैं आपकी कैसे मदद कर सकता हूं?",
            "math": "I can help you with mathematics! What specific topic would you like to learn about? Algebra, geometry, calculus, or basic arithmetic?",
            "गणित": "मैं गणित में आपकी मदद कर सकता हूं! आप किस विषय के बारे में जानना चाहते हैं? बीजगणित, ज्यामिति, या अंकगणित?",
            "hindi": "I can assist you with Hindi grammar and literature. Would you like to learn grammar rules, vocabulary, or understand poetry?",
            "हिंदी": "मैं हिंदी व्याकरण और साहित्य में आपकी सहायता कर सकता हूं। क्या आप व्याकरण के नियम सीखना चाहते हैं या कविता समझना चाहते हैं?",
            "diwali": "Diwali is our most important festival! It's called the 'Festival of Lights' and celebrates Lord Rama's return to Ayodhya after 14 years of exile.",
            "दीवाली": "दीवाली हमारा सबसे महत्वपूर्ण त्योहार है! यह 'रोशनी का त्योहार' कहलाता है और भगवान राम की 14 साल के वनवास के बाद अयोध्या वापसी मनाता है।",
            "science": "Which science subject interests you? Physics, Chemistry, or Biology? I'm here to help with concepts and explanations!",
            "विज्ञान": "आप विज्ञान के किस विषय में रुचि रखते हैं? भौतिक विज्ञान, रसायन विज्ञान, या जीव विज्ञान?",
            "history": "Indian history is fascinating! Which period would you like to explore? Ancient India, Medieval period, or Modern India?",
            "इतिहास": "भारतीय इतिहास बहुत दिलचस्प है! आप किस काल के बारे में जानना चाहते हैं? प्राचीन भारत, मध्यकालीन या आधुनिक भारत?",
        }
        
        # Check for keywords in user input
        for keyword, response in fallback_responses.items():
            if keyword in user_input_lower:
                return response
        
        # Default fallback response
        return "I'm currently experiencing some technical difficulties with my main AI system. However, I'm still here to help! Could you please rephrase your question or try asking about math, science, Hindi, or Indian culture? I'll do my best to assist you."
    
    def _clean_response(self, response):
        """Clean and format the model response"""
        # Remove any unwanted prefixes or suffixes
        response = response.strip()
        
        # Remove "Assistant:" prefix if present
        if response.startswith("Assistant:"):
            response = response[10:].strip()
        
        # Remove any incomplete sentences at the end
        sentences = response.split('।')
        if len(sentences) > 1 and len(sentences[-1].strip()) < 10:
            response = '।'.join(sentences[:-1]) + '।'
        
        return response
    
    def get_conversation_history(self):
        """Return the conversation history"""
        return self.conversation_history
    
    def clear_history(self):
        """Clear conversation history"""
        self.conversation_history = []
    
    def save_feedback(self, user_input, assistant_response, rating, comments, user_id=None):
        """Save user feedback to file"""
        feedback_data = {
            'timestamp': datetime.now().isoformat(),
            'user_id': user_id or f"user_{len(self.conversation_history)}",
            'user_input': user_input,
            'assistant_response': assistant_response,
            'rating': rating,
            'comments': comments
        }
        
        # Ensure feedback directory exists
        os.makedirs('user_feedback', exist_ok=True)
        
        # Save to JSON file
        feedback_file = f"user_feedback/feedback_{datetime.now().strftime('%Y%m%d')}.json"
        
        try:
            # Load existing feedback if file exists
            if os.path.exists(feedback_file):
                with open(feedback_file, 'r', encoding='utf-8') as f:
                    existing_feedback = json.load(f)
            else:
                existing_feedback = []
            
            # Add new feedback
            existing_feedback.append(feedback_data)
            
            # Save updated feedback
            with open(feedback_file, 'w', encoding='utf-8') as f:
                json.dump(existing_feedback, f, ensure_ascii=False, indent=2)
            
            return True
        except Exception as e:
            print(f"Error saving feedback: {e}")
            return False
