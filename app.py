from flask import Flask, render_template, request, jsonify, session
import os
import uuid
from assistant import VidyasaathiAssistant

app = Flask(__name__)
app.secret_key = os.urandom(24)

# Initialize the assistant
assistant = VidyasaathiAssistant()

@app.route('/')
def index():
    """Main page with chat interface"""
    if 'user_id' not in session:
        session['user_id'] = str(uuid.uuid4())
    return render_template('index.html')

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

@app.route('/about')
def about():
    """About page with project information"""
    return render_template('about.html')

@app.route('/feedback-form')
def feedback_form():
    """Feedback form page"""
    return render_template('feedback.html')

if __name__ == '__main__':
    # Ensure required directories exist
    os.makedirs('user_feedback', exist_ok=True)
    os.makedirs('templates', exist_ok=True)
    os.makedirs('static/css', exist_ok=True)
    os.makedirs('static/js', exist_ok=True)
    
    app.run(debug=True, host='0.0.0.0', port=5000)
