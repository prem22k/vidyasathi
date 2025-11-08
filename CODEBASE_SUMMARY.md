# Project Overview

Vidhyasaathi (विद्यासाथी - "Knowledge Companion") is a full-stack AI-powered educational assistant designed to provide educational support and guidance in Hindi language. The application features a modern React + TypeScript frontend with a Flask Python backend that integrates with AI language models (Groq API with Llama 3.3) to deliver conversational educational assistance. The UI includes animated backgrounds, dark mode support, bilingual interface (Hindi/English), and real-time chat functionality with typing indicators and feedback collection. The visual design uses gradient backgrounds, glassmorphic surfaces, and smooth animations to create an engaging educational experience.

# Repo Structure

```
vidhyavaani/
├── app.py                          # Flask backend API server
├── assistant.py                    # AI assistant logic & API integration
├── system_prompt.txt               # AI system prompt configuration
├── requirements.txt                # Python dependencies
├── pyproject.toml                  # Python project configuration
├── Procfile                        # Railway deployment config
├── railway.json                    # Railway platform settings
├── vercel.json                     # Vercel deployment config
├── nixpacks.toml                   # Nixpacks build configuration
├── .env.example                    # Environment variables template
├── CHANGELOG.md                    # Version history
├── CONTRIBUTING.md                 # Contribution guidelines
├── LICENSE                         # AGPL-3.0 license
├── README.md                       # Project documentation
├── submission_report.md            # Project submission details
├── frontend/
│   ├── src/
│   │   ├── App.tsx                 # Main React application
│   │   ├── main.tsx                # React entry point
│   │   ├── index.css               # Global styles with Tailwind
│   │   ├── types.ts                # TypeScript type definitions
│   │   ├── components/
│   │   │   ├── AnimatedBackground.tsx  # Animated gradient background
│   │   │   ├── ChatInterface.tsx       # Main chat UI component
│   │   │   ├── Header.tsx              # App header with logo
│   │   │   ├── MessageBubble.tsx       # Individual message display
│   │   │   ├── TypingIndicator.tsx     # Loading animation
│   │   │   ├── LanguageToggle.tsx      # Hindi/English switcher
│   │   │   ├── ThemeToggle.tsx         # Dark/light mode toggle
│   │   │   └── FeedbackModal.tsx       # User feedback form
│   │   └── contexts/
│   │       └── ThemeContext.tsx        # Theme state management
│   ├── public/                     # Static assets
│   ├── index.html                  # HTML entry point
│   ├── package.json                # Frontend dependencies
│   ├── vite.config.ts              # Vite build configuration
│   ├── tailwind.config.js          # Tailwind CSS configuration
│   ├── postcss.config.js           # PostCSS configuration
│   ├── tsconfig.json               # TypeScript configuration
│   └── vercel.json                 # Frontend deployment config
└── user_feedback/                  # Collected user feedback (JSON files)
```

# How to Run (dev / build / preview)

## Backend Setup
```bash
# Install Python dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env and add your GROQ_API_KEY or GEMINI_API_KEY

# Run Flask development server
python app.py
# Server runs on http://localhost:5000
```

## Frontend Setup
```bash
cd frontend

# Install Node dependencies
npm install

# Run development server (default Vite port: 5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

**Important npm scripts** (from `frontend/package.json`):
- `dev`: Runs Vite dev server with hot-reload
- `build`: TypeScript compilation + Vite production build
- `lint`: ESLint code quality checks
- `preview`: Preview production build locally

**Dev server ports:**
- Backend: `http://localhost:5000`
- Frontend: `http://localhost:5173` (Vite default)

# Main Tech Stack & Dependencies

## Backend
- **Python 3.10+**
- **Flask 2.3.3** - Web framework
- **Flask-CORS 4.0.0** - Cross-origin request handling
- **requests 2.31.0** - HTTP client for API calls
- **python-dotenv 1.0.0** - Environment variable management
- **gunicorn 21.2.0** - Production WSGI server

## Frontend
- **React 19.1.1** - UI library
- **TypeScript 5.8.3** - Type safety
- **Vite 7.1.2** - Build tool and dev server
- **Tailwind CSS 3.4.0** - Utility-first CSS framework
- **PostCSS 8.5.0** - CSS processing

## AI Integration
- **Groq API** - Primary LLM provider (Llama 3.3-70b-versatile)
- **Google Gemini API** - Fallback option
- Custom fallback responses for offline mode

## Styling & Animations
- **Tailwind CSS** with custom animations (fade-in, slide-up, blob, float)
- **Google Fonts** - Noto Sans Devanagari (Hindi), Inter (English)
- Custom CSS components for chat bubbles and glassmorphic effects

# Entry Points & Routing

## Backend Entry
- **Main file**: `app.py`
- **Flask routes**:
  - `GET /` - Health check endpoint
  - `GET /health` - Alternative health check
  - `POST /chat` - Main chat message endpoint
  - `POST /feedback` - User feedback submission
  - `GET /history` - Conversation history retrieval
  - `POST /clear` - Clear conversation history
  - `GET /admin/feedback` - Admin feedback aggregation

## Frontend Entry
- **Main entry**: `frontend/src/main.tsx` - React app initialization with StrictMode
- **App component**: `frontend/src/App.tsx` - Root component with state management
- **No client-side routing** - Single-page application without React Router
- All navigation is state-based within the main App component

# Visual / Motion Layers

## Animated Background (`frontend/src/components/AnimatedBackground.tsx`)
- **Implementation**: Pure CSS animations with React
- **No external libraries** - Uses custom Tailwind keyframes
- **Effects**:
  - Gradient background transitions between light/dark themes
  - Three animated "blob" orbs with `mix-blend-multiply` and blur filters
  - Floating dot particles with staggered animations
  - Subtle grid pattern overlay
- **Animations**: `animate-blob`, `animate-float` (defined in tailwind.config.js)
- **Performance**: CSS-only animations, no canvas or JavaScript animation loops

## Theme System
- **Context**: `ThemeContext.tsx` provides global dark/light mode state
- **Persistence**: Theme preference saved to localStorage
- **Auto-detection**: Defaults to system preference via `prefers-color-scheme`
- **Transitions**: Smooth 500ms+ transitions on background colors

## Chat Animations
- **Typing Indicator**: `TypingIndicator.tsx` - Bouncing dots animation
- **Message Transitions**: Fade-in and slide-up effects on new messages
- **Button Hover**: Scale transforms (1.05x) with shadow increases
- **Input Focus**: Ring animation with color transition

## Custom Tailwind Animations
```javascript
// From tailwind.config.js
animations: {
  'fade-in': 'fadeIn 0.5s ease-in-out',
  'slide-up': 'slideUp 0.3s ease-out',
  'bounce-subtle': 'bounceSubtle 2s infinite',
  'blob': 'blob 7s infinite',
  'float': 'float 6s ease-in-out infinite',
}
```

**No Three.js, Framer Motion, or GSAP** - All animations are CSS-based for optimal performance.

# Components Map (detailed for important UI blocks)

## App.tsx
- **Path**: `frontend/src/App.tsx`
- **Description**: Root component managing global state (messages, language, theme, loading). Handles API communication with Flask backend at `/chat` endpoint. Orchestrates all child components and manages feedback modal visibility.
- **Styling**: Tailwind utility classes with gradient text for title, glassmorphic backdrop-blur surfaces
- **State**: Uses React useState hooks for messages array, language toggle, loading states

## AnimatedBackground.tsx
- **Path**: `frontend/src/components/AnimatedBackground.tsx`
- **Description**: Full-screen background layer with animated gradient orbs and floating particles. Responds to theme changes with smooth color transitions. Uses absolute positioning with -z-10 to stay behind content.
- **Styling**: Tailwind classes with custom animations, mix-blend-multiply for color blending
- **Theme Integration**: Consumes ThemeContext to switch between light/dark color schemes

## ChatInterface.tsx
- **Path**: `frontend/src/components/ChatInterface.tsx`
- **Props**: `messages: Message[]`, `onSendMessage: (text: string) => void`, `onClearChat: () => void`, `isLoading: boolean`, `language: 'en' | 'hi'`
- **Description**: Main chat UI with message list, input field, and quick suggestion buttons. Handles message submission, auto-scrolling to latest message, and empty state with educational emoji. Includes bilingual placeholder text and suggestions.
- **Styling**: Glassmorphic white/20 backdrop-blur surfaces, gradient header bar, rounded-2xl borders
- **Animations**: Smooth scroll behavior, hover scale effects on suggestion buttons

## MessageBubble.tsx
- **Path**: `frontend/src/components/MessageBubble.tsx`
- **Props**: `message: Message`, `language: 'en' | 'hi'`
- **Description**: Individual chat message display with sender differentiation (user vs assistant). Shows timestamp formatting and appropriate alignment (user right, assistant left).
- **Styling**: Custom `.chat-bubble` classes with rounded-2xl borders, user messages in primary gradient, assistant in white with border
- **Animation**: Slide-up animation on mount

## TypingIndicator.tsx
- **Path**: `frontend/src/components/TypingIndicator.tsx`
- **Props**: `language: 'en' | 'hi'`
- **Description**: Shows animated dots while AI generates response. Displays bilingual "thinking" message.
- **Styling**: White bubble with three bouncing dots
- **Animation**: Staggered bounce animation on three circular divs

## Header.tsx
- **Path**: `frontend/src/components/Header.tsx`
- **Props**: `language: 'en' | 'hi'`
- **Description**: Top header with education emoji icon in gradient circle, bilingual subtitle describing the assistant.
- **Styling**: Gradient primary-500 to primary-600 circle, shadow-lg, centered layout

## LanguageToggle.tsx
- **Path**: `frontend/src/components/LanguageToggle.tsx`
- **Props**: `language: 'en' | 'hi'`, `onToggle: (lang: 'en' | 'hi') => void`
- **Description**: Button to switch between English and Hindi interface text throughout the app.
- **Styling**: Glassmorphic white/20 background with backdrop-blur, hover scale effect
- **State**: Controlled by parent App component

## ThemeToggle.tsx
- **Path**: `frontend/src/components/ThemeToggle.tsx`
- **Description**: Sun/moon icon button to toggle between light and dark modes. Updates ThemeContext which propagates to all components.
- **Styling**: Glassmorphic button matching LanguageToggle style
- **Context**: Consumes and updates ThemeContext

## FeedbackModal.tsx
- **Path**: `frontend/src/components/FeedbackModal.tsx`
- **Props**: `isOpen: boolean`, `onClose: () => void`, `language: 'en' | 'hi'`, `currentResponse: string`
- **Description**: Modal overlay for collecting user feedback with rating (1-5 stars) and comments. Submits to `/feedback` API endpoint. Includes success/error messages.
- **Styling**: Fixed overlay with centered modal, glassmorphic background, gradient submit button
- **Animation**: Fade-in overlay, slide-up modal content

# State Management & Data Flow

## Local Component State
- **React useState hooks** - No Redux, Zustand, or other state management libraries
- **ThemeContext** - Context API for global dark/light mode state
- **No global chat state** - Messages stored in App.tsx and passed as props

## Data Flow
1. **User Input** → ChatInterface component
2. **Message Submission** → App.tsx `sendMessage()` function
3. **API Call** → Flask backend at `POST /chat`
4. **Backend Processing** → `assistant.py` queries Groq API (Llama model)
5. **Response** → Returned to frontend, added to messages array
6. **Re-render** → ChatInterface displays new message with animation

## API Data
- **No static JSON** - All educational content generated dynamically by AI
- **No CMS** - Content managed through `system_prompt.txt` configuration
- **Session Storage** - Flask uses `session` for user tracking
- **Feedback Persistence** - JSON files saved to `user_feedback/` directory

## Conversation History
- Stored in Python `VidyasaathiAssistant` class instance
- Limited to last 3 exchanges for API context
- Can be retrieved via `/history` endpoint or cleared via `/clear`

# Styling & Theming

## Tailwind CSS
- **Config file**: `frontend/tailwind.config.js`
- **Dark mode**: `darkMode: 'class'` - Controlled by document root class
- **Custom colors**:
  ```javascript
  primary: { 50, 100, 500, 600, 700, 900 } // Orange tones
  secondary: { 50, 100, 500, 600, 700, 900 } // Blue tones
  ```
- **Custom fonts**:
  - `font-hindi`: Noto Sans Devanagari (Google Fonts)
  - `font-english`: Inter (Google Fonts)

## Color Tokens & Gradients
- **Primary gradient**: `from-indigo-500 to-purple-600` (buttons, headers)
- **Background gradients**:
  - Light: `from-blue-50 via-indigo-100 to-purple-200`
  - Dark: `from-gray-900 via-purple-900 to-violet-800`
- **Glassmorphism**: `bg-white/20 backdrop-blur-sm border border-white/30`

## Custom CSS Components
Defined in `frontend/src/index.css`:
- `.chat-bubble` - Base message styling
- `.chat-bubble-user` - User message (primary gradient)
- `.chat-bubble-assistant` - AI message (white with border)
- `.input-modern` - Form input styling
- `.btn-primary` - Primary action button
- `.btn-secondary` - Secondary action button

## PostCSS
- **Config**: `frontend/postcss.config.js`
- **Plugins**: Tailwind CSS processing, autoprefixer

# Performance / Accessibility notes

## Performance
- **CSS animations only** - No JavaScript animation loops for better performance
- **Lazy loading**: No explicit lazy loading implemented (small app size)
- **Vite optimizations**: Fast HMR in development, tree-shaking in production
- **API timeout**: 10-second timeout on Groq API requests to prevent hanging

## Accessibility
- **Semantic HTML**: Proper button, form, input elements
- **Focus states**: Visible focus rings on interactive elements
- **Keyboard navigation**: Enter key submits chat, Tab navigation works
- **Color contrast**: Sufficient contrast between text and backgrounds
- **Screen readers**: Need improvement - missing ARIA labels on some components
- **Alt text**: Emoji used decoratively (should add aria-hidden="true")
- **Language switching**: Proper lang attribute management needed

## Suggested Improvements
- Add `aria-label` to icon buttons (send, clear, theme toggle)
- Add `role="region"` and `aria-live="polite"` to message area
- Add loading state announcements for screen readers
- Implement proper focus management when modal opens
- Add skip-to-content link for keyboard users

# Key Scripts / Build Configurations

## Frontend package.json Scripts
```json
{
  "dev": "vite",                    // Start dev server on port 5173
  "build": "tsc -b && vite build",  // Type-check + production build
  "lint": "eslint .",               // Code linting
  "preview": "vite preview"         // Preview production build
}
```

## Vite Configuration (`frontend/vite.config.ts`)
```typescript
export default defineConfig({
  plugins: [react()],  // React plugin with Fast Refresh
})
```
- **Build output**: `frontend/dist/`
- **Dev server**: HMR enabled, proxy not configured (frontend makes direct requests to backend URL)

## Backend Deployment

### Railway (`railway.json`)
- **Builder**: NIXPACKS
- **Start command**: `python app.py`
- **Health check**: `GET /` endpoint
- **Environment**: PORT variable injected by Railway

### Vercel (`vercel.json`)
- **Dual deployment**: Both Python backend and static frontend
- **Routes**:
  - `/api/*` → Flask backend
  - `/*` → Frontend static files

### Procfile (Heroku/Railway)
```
web: gunicorn app:app
```

## TypeScript Configuration
- **tsconfig.json**: Strict mode, React JSX, ES modules
- **Target**: ES2020
- **Module resolution**: Node
- **Include**: `src/**/*`

## Environment Variables
Required in `.env`:
- `GROQ_API_KEY` - Primary AI API key
- `GEMINI_API_KEY` - Fallback AI API key (optional)
- `FLASK_SECRET_KEY` - Session encryption (auto-generated if not set)

---

**Generated on**: November 9, 2025  
**Project version**: 1.0.0  
**License**: AGPL-3.0-or-later
