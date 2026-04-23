# 💬 Enait's Fatima — React WhatsApp Chatbot

A pixel-perfect WhatsApp iPhone UI chatbot powered by Google Gemini AI.

---

## 📂 Project Structure

```
fatima-react/
├── index.html
├── config.js              ← ✏️  API key + image paths
├── vite.config.js
├── package.json
│
├── public/
│   ├── assets/
│   │   ├── bot.png        ← 🖼️  Drop your bot image here
│   │   └── bg.jpg         ← 🖼️  Drop your background here
│   └── data/
│       └── dataset.json   ← ✅  Already included
│
└── src/
    ├── main.jsx
    ├── App.jsx            ← Main orchestrator
    ├── App.module.css
    ├── index.css          ← Global theme vars
    ├── hooks/
    │   └── useGemini.js   ← Gemini API + dataset logic
    └── components/
        ├── ChatHeader.jsx / .module.css
        ├── ChatBubble.jsx / .module.css
        ├── TypingIndicator.jsx / .module.css
        ├── InputBar.jsx   / .module.css   ← SEND button here
        └── DateDivider.jsx / .module.css
```

---

## 🚀 Running Locally (Step-by-Step)

### Prerequisites
- **Node.js** installed → download at https://nodejs.org (LTS version)

### Steps

```bash
# 1. Go into the project folder
cd fatima-react

# 2. Install dependencies (only needed once)
npm install

# 3. Add your API key in config.js
#    Replace: "PASTE_YOUR_API_KEY_HERE"
#    With your real key from: https://aistudio.google.com/app/apikey

# 4. Add your images to public/assets/
#    - bot.png  (chatbot profile picture)
#    - bg.jpg   (chat background)

# 5. Start the dev server
npm run dev

# 6. Open in browser
#    http://localhost:5173
```

---

## 🔐 API Key Setup

Open `config.js` and paste your key:

```js
export const GEMINI_API_KEY = "AIzaSy...yourActualKey";
```

---

## 🎨 Customising

| What | Where |
|------|-------|
| Contact name | `config.js` → `CONTACT_NAME` |
| Bot avatar   | `config.js` → `BOT_AVATAR`   |
| Background   | `config.js` → `BG_IMAGE`     |
| Phone width  | `src/App.module.css` → `max-width: 390px` |
| Personality  | `src/hooks/useGemini.js` → `SYSTEM_PROMPT` |
| Theme colors | `src/index.css` → `:root {}` and `[data-theme="dark"]` |

---

## ✅ Features Fixed & Added

- Send button works (click + Enter key)
- Shift+Enter inserts newline
- Dark/Light mode toggle (fully working, persists on reload)
- Typing indicator with animated dots
- Auto-scroll to latest message
- WhatsApp-style bubble tails + read ticks
- Date divider chip ("Today")
- Mobile-first, centered phone UI on desktop
- Fallback avatar if bot.png is missing
