# Vidyasaathi - विद्यासाथी

<div align="center">

🎓 **Your AI-Powered Hindi Education Companion**

[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL%203.0-blue.svg)](LICENSE)
[![Python 3.10+](https://img.shields.io/badge/python-3.10+-blue.svg)](https://www.python.org/downloads/)
[![React 19](https://img.shields.io/badge/react-19.1-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/typescript-5.8-blue.svg)](https://www.typescriptlang.org/)

[Features](#features) • [Quick Start](#quick-start) • [Demo](#demo) • [Tech Stack](#tech-stack) • [Documentation](#documentation)

</div>

---

## 📖 Project Overview

**Vidyasaathi** (विद्यासाथी - "Knowledge Companion") is a full-stack AI-powered educational assistant designed to provide personalized educational support and guidance in Hindi language. Built with modern web technologies, it features a beautiful, responsive React frontend with dark mode support and a robust Flask backend powered by state-of-the-art AI models.

### Why Vidyasaathi?

- 🇮🇳 **Hindi-First Design** - Native Hindi language support with cultural context awareness
- 🎨 **Modern UI/UX** - Glassmorphic design with smooth animations and dark mode
- 🤖 **AI-Powered** - Leverages Groq's Llama 3.3 for intelligent conversations
- 🌐 **Bilingual** - Seamless switching between Hindi and English
- 📚 **Educational Focus** - Specialized system prompts for learning assistance
- 💬 **Real-time Chat** - Instant responses with typing indicators
- 📊 **Feedback System** - Built-in user feedback collection for continuous improvement

## ✨ Features

### Core Functionality
- ✅ **Conversational AI** - Natural language interactions in Hindi/English
- ✅ **Educational Support** - Help with math, science, history, Hindi grammar, and more
- ✅ **Cultural Awareness** - Understanding of Indian festivals, traditions, and context
- ✅ **Smart Fallbacks** - Graceful degradation when API is unavailable
- ✅ **Conversation History** - Track and manage chat sessions

### User Experience
- 🎨 **Animated Background** - Beautiful gradient blob animations
- 🌓 **Dark/Light Mode** - Theme toggle with system preference detection
- 🌏 **Language Toggle** - Switch between English and Hindi interfaces
- ⚡ **Quick Suggestions** - Pre-populated questions to get started
- 💬 **Typing Indicators** - Visual feedback during AI response generation
- ⭐ **Rating System** - 5-star feedback mechanism with comments

### Technical Features
- 🔄 **API Integration** - Groq API (Llama 3.3) with Gemini fallback
- 🔒 **Session Management** - Flask sessions for user tracking
- 📁 **Feedback Persistence** - JSON-based feedback storage
- 🚀 **Production Ready** - Configured for Railway, Vercel, Heroku deployment
- 📱 **Responsive Design** - Mobile-friendly responsive layout

## 🚀 Quick Start

### Prerequisites
- Python 3.10 or higher
- Node.js 18 or higher
- npm or yarn
- Groq API key (free at [groq.com](https://groq.com))

### Backend Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd vidhyavaani

# Install Python dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env and add your GROQ_API_KEY

# Run the Flask server
python app.py
# Backend runs at http://localhost:5000
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
# Frontend runs at http://localhost:5173
```

### Access the Application

Open your browser and visit:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## 🎯 Demo

### Screenshots

**Light Mode - Chat Interface**
```
┌─────────────────────────────────────┐
│  🎓 विद्यासाथी                      │
│  Your AI Education Assistant        │
├─────────────────────────────────────┤
│                                     │
│  [User] गणित में मदद चाहिए         │
│  [AI] बिल्कुल! मैं गणित में आपकी   │
│       सहायता करूंगा...             │
│                                     │
│  [Quick Suggestions]                │
│  • Help with mathematics            │
│  • Teach Hindi grammar              │
│                                     │
└─────────────────────────────────────┘
```

### Live Demo

🌐 **[Coming Soon]** - Deployment link will be added here

## 🛠️ Tech Stack

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Python | 3.10+ | Backend runtime |
| Flask | 2.3.3 | Web framework |
| Flask-CORS | 4.0.0 | Cross-origin support |
| Gunicorn | 21.2.0 | Production server |
| Requests | 2.31.0 | HTTP client |

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.1.1 | UI framework |
| TypeScript | 5.8.3 | Type safety |
| Vite | 7.1.2 | Build tool |
| Tailwind CSS | 3.4.0 | Styling framework |
| PostCSS | 8.5.0 | CSS processing |

### AI & APIs
- **Primary**: Groq API (Llama 3.3-70b-versatile)
- **Fallback**: Google Gemini API (optional)
- **Custom**: Fallback responses for offline mode

## 📚 Documentation

For comprehensive codebase documentation, see:
- **[CODEBASE_SUMMARY.md](./CODEBASE_SUMMARY.md)** - Complete technical documentation
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Contribution guidelines
- **[CHANGELOG.md](./CHANGELOG.md)** - Version history

## 🏗️ Project Structure

```
vidhyavaani/
├── app.py                    # Flask backend server
├── assistant.py              # AI logic & API integration
├── system_prompt.txt         # AI system configuration
├── requirements.txt          # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── App.tsx          # Main React component
│   │   ├── components/      # UI components
│   │   └── contexts/        # React contexts
│   ├── public/              # Static assets
│   └── package.json         # Frontend dependencies
├── user_feedback/           # Feedback storage
└── README.md               # This file
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Required
GROQ_API_KEY=your_groq_api_key_here

# Optional
GEMINI_API_KEY=your_gemini_api_key_here
FLASK_SECRET_KEY=your_secret_key_here
PORT=5000
```

### API Keys

1. **Groq API** (Primary):
   - Sign up at [groq.com](https://groq.com)
   - Navigate to API Keys section
   - Create new API key
   - Free tier available with generous limits

2. **Google Gemini** (Optional Fallback):
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create API key
   - Add to `.env` file

## 🚀 Deployment

### Railway (Recommended)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

Configuration in `railway.json` is already set up.

### Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Configuration in `vercel.json` handles both frontend and backend.

### Heroku

```bash
# Install Heroku CLI and login
heroku login

# Create app and deploy
heroku create your-app-name
git push heroku main
```

`Procfile` is configured for Heroku deployment.

## 📋 Available Scripts

### Backend
```bash
python app.py              # Start Flask development server
gunicorn app:app          # Start production server
```

### Frontend
```bash
cd frontend
npm run dev               # Start Vite dev server
npm run build             # Build for production
npm run preview           # Preview production build
npm run lint              # Run ESLint
```

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🐛 Known Issues & Roadmap

### Current Limitations
- [ ] No persistent conversation storage across sessions
- [ ] Limited to text-based interactions (no image/voice support)
- [ ] API rate limiting on free tier

### Future Enhancements
- [ ] Voice input/output support
- [ ] Image recognition for math problems
- [ ] Multi-user authentication
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Offline mode with local LLM

## 📄 License

This project is licensed under the **AGPL-3.0-or-later** License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors & Acknowledgments

- **Developed by**: SOAI 2025 Team
- **Inspired by**: The need for quality Hindi educational resources
- **Powered by**: Groq, Llama 3.3, React, Flask

### Special Thanks
- Groq for providing free AI API access
- The open-source community
- All contributors and testers

## 📞 Support & Contact

- **Issues**: [GitHub Issues](../../issues)
- **Discussions**: [GitHub Discussions](../../discussions)
- **Email**: maintainer@example.com

## 🌟 Show Your Support

If you find this project helpful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 📖 Improving documentation
- 🔀 Contributing code

---

<div align="center">

**Made with ❤️ for Hindi Education**

</div>
