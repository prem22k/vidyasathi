#!/usr/bin/env python3
"""
Demo script for Vidyasaathi - Hindi AI Assistant
This script demonstrates the assistant without requiring Hugging Face API
"""

import json
from datetime import datetime

class VidyasaathiDemo:
    def __init__(self):
        self.demo_responses = {
            "namaste": "नमस्ते! मैं विद्यासाथी हूं। आज मैं आपकी कैसे सहायता कर सकता हूं?",
            "math": "गणित में मैं आपकी सहायता कर सकता हूं। आपको किस टॉपिक में मदद चाहिए? बीजगणित, ज्यामिति, या कोई और विषय?",
            "hindi": "हिंदी व्याकरण और साहित्य में मैं आपकी मदद कर सकता हूं। क्या आप व्याकरण के नियम जानना चाहते हैं या कविता की व्याख्या?",
            "diwali": "दीवाली हमारा सबसे महत्वपूर्ण त्योहार है! यह 'रोशनी का त्योहार' कहलाता है। यह भगवान राम के 14 साल के वनवास के बाद अयोध्या वापसी की खुशी में मनाया जाता है।",
            "science": "विज्ञान के किस विषय में आपको मदद चाहिए? भौतिक विज्ञान, रसायन विज्ञान, या जीव विज्ञान?",
            "default": "यह एक बहुत अच्छा प्रश्न है! मैं आपकी सहायता करने की कोशिश करूंगा। कृपया अपना प्रश्न और विस्तार से बताएं।"
        }
        
    def get_response(self, user_input):
        """Get demo response based on user input"""
        user_input = user_input.lower()
        
        if "namaste" in user_input or "hello" in user_input:
            return self.demo_responses["namaste"]
        elif "math" in user_input or "गणित" in user_input:
            return self.demo_responses["math"]
        elif "hindi" in user_input or "हिंदी" in user_input:
            return self.demo_responses["hindi"]
        elif "diwali" in user_input or "दीवाली" in user_input:
            return self.demo_responses["diwali"]
        elif "science" in user_input or "विज्ञान" in user_input:
            return self.demo_responses["science"]
        else:
            return self.demo_responses["default"]

def main():
    """Run interactive demo"""
    print("🎉 विद्यासाथी डेमो - Vidyasaathi Demo")
    print("=" * 50)
    print("यह एक डेमो वर्जन है। वास्तविक AI के लिए Hugging Face API टोकन की आवश्यकता है।")
    print("This is a demo version. For actual AI, you need a Hugging Face API token.")
    print("\nकुछ उदाहरण प्रश्न / Sample questions:")
    print("- namaste")
    print("- math mein help chahiye")
    print("- diwali ke baare mein batao")
    print("- hindi grammar sikhao")
    print("- science ke topics")
    print("\nType 'quit' to exit / बाहर निकलने के लिए 'quit' टाइप करें")
    print("=" * 50)
    
    demo = VidyasaathiDemo()
    
    while True:
        try:
            user_input = input("\n👤 आप: ").strip()
            
            if user_input.lower() in ['quit', 'exit', 'bye']:
                print("\n🙏 धन्यवाद! विद्यासाथी का उपयोग करने के लिए धन्यवाद!")
                break
            
            if not user_input:
                continue
                
            response = demo.get_response(user_input)
            print(f"\n🤖 विद्यासाथी: {response}")
            
        except KeyboardInterrupt:
            print("\n\n🙏 धन्यवाद! विद्यासाथी का उपयोग करने के लिए धन्यवाद!")
            break
        except Exception as e:
            print(f"\n❌ Error: {e}")

if __name__ == "__main__":
    main()
