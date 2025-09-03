# Vidyasaathi - Open-Source Hindi AI Assistant

## Project Overview
Vidyasaathi (विद्यासाथी - "Knowledge Companion") is an open-source AI assistant designed to provide educational support and guidance in Hindi language. This project demonstrates the implementation of an Indic language-focused AI assistant using open-source technologies.

## Quick Start
1. Install dependencies: `pip install -r requirements.txt`
2. Set up your Hugging Face API token in `.env`
3. Run the assistant: `python app.py`
4. Access the web interface at `http://localhost:5000`

## Project Structure
```
solo-project/
├── app.py                 # Main Flask application
├── assistant.py           # AI assistant logic
├── system_prompt.txt      # System prompt for the AI
├── templates/             # HTML templates
├── static/               # CSS and JS files
├── user_feedback/        # User feedback collection
├── requirements.txt      # Python dependencies
├── .env.example         # Environment variables template
└── submission_report.md # Final submission report
```

## Technology Stack
- **LLM**: OpenHathi-7B-Hi-v0.1-Base (Open-source Hindi-focused model)
- **Platform**: Hugging Face Inference API
- **Framework**: Flask (Python web framework)
- **Frontend**: HTML/CSS/JavaScript with Bootstrap

## Features
- Hindi language conversation support
- Educational content assistance
- Cultural context awareness
- Romanized Hindi input support
- Real-time feedback collection
