# PROJECT_AUDIT

## The One-Liner
A bilingual (Hindi/English) educational AI assistant that serves simplified learning content using a resilient dual-model backend strategy (Groq Llama 3.3 + Google Gemini Pro).

## The 'Technical Hook' (Crucial)
**Dual-API Failover Logic**
The system implements a robust fallback mechanism for AI model availability. It prioritizes the **Groq API** (Llama 3.3) for high-speed, low-latency responses. If that fails or is unavailable, it gracefully falls back to a locally defined dictionary of hardcoded educational responses. This guarantees application continuity even during API outages, a critical reliability feature for the platform.

**File Path:**
[`assistant.py`](file:///home/premsaik/Desktop/Projects/vidyasathi/assistant.py#L29-L40) (Specifically the `query_model` and `_get_fallback_response` methods).

## The True Stack (Evidence-Based)
**Frontend:**
- **Framework:** React 19 (via Vite)
- **Styling:** Tailwind CSS (with `autoprefixer` and `postcss`)
- **Language:** TypeScript
- **State/Logic:** React Hooks (`useState`, `useEffect`, `useContext`)

**Backend:**
- **Server:** Flask (Python)
- **AI Integration:** `requests` (for Groq/Gemini APIs)
- **Server Interface:** Gunicorn (WSGI HTTP Server)

## Architecture & Scale Indicators
- **Database:** **None (Stateless/File-based).** User feedback is persisted as JSON files in a local `user_feedback` directory, confirming a serverless MVP architecture.
- **Authentication:** **None.** Open-access design utilizing session-based continuity (via `user_id` in local storage).
- **Deployment:**
    - **Vercel:** Configured for frontend and serverless backend handling (`vercel.json`).
    - **Railway:** Configured for backend service deployment (`railway.json`, `Procfile`, `nixpacks.toml`).

## Product Features
1.  **Resilient AI Interaction:** Utilizes a priority queue for AI models (Groq first, then fallback) to ensure answer delivery, eliminating downtime.
2.  **Bilingual Interface & Content:** Instant toggle between Hindi and English modes that localizes both the UI components and the AI's persona/responses.
3.  **Feedback Loop System:** Dedicated feedback mechanism permitting users to rate responses, with data stored locally for quality assessment.
