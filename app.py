from flask import Flask, request, jsonify, session
from flask_cors import CORS
import json
import os
from assistant import VidyasaathiAssistant

app = Flask(__name__)
CORS(app)
app.secret_key = os.urandom(24)

# Initialize the assistant
assistant = VidyasaathiAssistant()

@app.route('/')
def health():
    """Health check endpoint for Railway"""
    return jsonify({
        'status': 'healthy',
        'service': 'Vidyasathi AI Assistant',
        'version': '1.0.0'
    })

@app.route('/health')
def health_check():
    """Additional health check endpoint"""
    return jsonify({'status': 'ok'})

@app.route('/chat', methods=['POST'])
def chat():
    """Handle chat messages"""
    try:
        data = request.get_json()
        user_message = data.get('message', '').strip()
        
        if not user_message:
            return jsonify({'error': 'Empty message'}), 400
        
        # Get response from assistant
        assistant_response = assistant.query_model(user_message)
        
        return jsonify({
            'response': assistant_response,
            'user_id': session.get('user_id')
        })
    
    except Exception as e:
        return jsonify({'error': f'Server error: {str(e)}'}), 500

@app.route('/feedback', methods=['POST'])
def submit_feedback():
    """Handle feedback submission"""
    try:
        data = request.get_json()
        
        user_input = data.get('user_input', '')
        assistant_response = data.get('assistant_response', '')
        rating = data.get('rating', 0)
        comments = data.get('comments', '')
        user_id = session.get('user_id', 'anonymous')
        
        # Save feedback
        success = assistant.save_feedback(
            user_input=user_input,
            assistant_response=assistant_response,
            rating=rating,
            comments=comments,
            user_id=user_id
        )
        
        if success:
            return jsonify({'message': 'फीडबैक सफलतापूर्वक सेव हो गया। धन्यवाद!'})
        else:
            return jsonify({'error': 'फीडबैक सेव करने में समस्या हुई।'}), 500
    
    except Exception as e:
        return jsonify({'error': f'Server error: {str(e)}'}), 500

@app.route('/history')
def get_history():
    """Get conversation history"""
    try:
        history = assistant.get_conversation_history()
        return jsonify({'history': history})
    except Exception as e:
        return jsonify({'error': f'Server error: {str(e)}'}), 500

@app.route('/clear', methods=['POST'])
def clear_history():
    """Clear conversation history"""
    try:
        assistant.clear_history()
        return jsonify({'message': 'बातचीत का इतिहास साफ कर दिया गया।'})
    except Exception as e:
        return jsonify({'error': f'Server error: {str(e)}'}), 500

if __name__ == '__main__':
    # Ensure required directories exist
    os.makedirs('user_feedback', exist_ok=True)
    
    app.run(debug=True, host='0.0.0.0', port=5000)
