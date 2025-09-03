import os
import requests
import json
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

class VidyasaathiAssistant:
    def __init__(self):
        self.api_token = os.getenv('HUGGINGFACE_API_TOKEN')
        self.model_name = os.getenv('MODEL_NAME', 'sarvamai/OpenHathi-7B-Hi-v0.1-Base')
        self.api_url = os.getenv('API_URL', f'https://api-inference.huggingface.co/models/{self.model_name}')
        
        # Load system prompt
        with open('system_prompt.txt', 'r', encoding='utf-8') as f:
            self.system_prompt = f.read()
        
        self.headers = {
            "Authorization": f"Bearer {self.api_token}",
            "Content-Type": "application/json"
        }
        
        self.conversation_history = []
    
    def query_model(self, user_input):
        """Query the Hugging Face model with user input"""
        
        # Prepare the prompt with system context and conversation history
        full_prompt = f"{self.system_prompt}\n\n"
        
        # Add conversation history
        for exchange in self.conversation_history[-3:]:  # Keep last 3 exchanges for context
            full_prompt += f"User: {exchange['user']}\nAssistant: {exchange['assistant']}\n\n"
        
        full_prompt += f"User: {user_input}\nAssistant:"
        
        payload = {
            "inputs": full_prompt,
            "parameters": {
                "max_new_tokens": 512,
                "temperature": 0.7,
                "top_p": 0.9,
                "do_sample": True,
                "return_full_text": False
            }
        }
        
        try:
            response = requests.post(self.api_url, headers=self.headers, json=payload)
            response.raise_for_status()
            
            result = response.json()
            
            if isinstance(result, list) and len(result) > 0:
                generated_text = result[0].get('generated_text', '')
            else:
                generated_text = result.get('generated_text', '')
            
            # Clean up the response
            assistant_response = self._clean_response(generated_text)
            
            # Store in conversation history
            self.conversation_history.append({
                'user': user_input,
                'assistant': assistant_response,
                'timestamp': datetime.now().isoformat()
            })
            
            return assistant_response
            
        except requests.exceptions.RequestException as e:
            return f"माफ करें, तकनीकी समस्या के कारण मैं अभी उत्तर नहीं दे सकता। कृपया बाद में प्रयास करें। (Error: {str(e)})"
        except Exception as e:
            return f"कुछ गलत हुआ है। कृपया दोबारा कोशिश करें। (Error: {str(e)})"
    
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
