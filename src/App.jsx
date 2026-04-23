// ============================================================
//  App.jsx  —  Enait's Fatima  ·  WhatsApp iPhone chatbot
// ============================================================

import React, { useState, useEffect, useRef, useCallback } from 'react'
import ChatHeader       from './components/ChatHeader.jsx'
import ChatBubble       from './components/ChatBubble.jsx'
import TypingIndicator  from './components/TypingIndicator.jsx'
import DateDivider      from './components/DateDivider.jsx'
import InputBar         from './components/InputBar.jsx'
import { useGemini }    from './hooks/useGemini.js'
import { BG_IMAGE }     from '../config.js'
import styles           from './App.module.css'

// ── Helpers ──────────────────────────────────────────────────

/** Format HH:MM for message timestamps */
function getTime() {
  return new Date().toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit', hour12: false
  })
}

/** Initial welcome message from bot */
const WELCOME = {
  id:   'welcome',
  role: 'bot',
  text: 'bako',
  time: getTime()
}

// ── App ───────────────────────────────────────────────────────

export default function App() {
  // Theme
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem('fatima-theme') === 'dark'
  )

  // Messages list
  const [messages, setMessages] = useState([WELCOME])

  // Input field value
  const [input, setInput] = useState('')

  // Typing indicator visibility
  const [isTyping, setIsTyping] = useState(false)

  // Conversation history for Gemini context (role/text pairs)
  const historyRef = useRef([])

  // Scroll anchor
  const bottomRef = useRef(null)
  const chatRef   = useRef(null)

  // Gemini hook
  const { askFatima } = useGemini()

  // ── Apply theme ─────────────────────────────────────────────
  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light'
    localStorage.setItem('fatima-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  // ── Scroll to bottom whenever messages change ───────────────
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  // ── Send message ────────────────────────────────────────────
  const handleSend = useCallback(async () => {
    const text = input.trim()
    if (!text || isTyping) return

    // 1. Add user message to UI
    const userMsg = { id: Date.now(), role: 'user', text, time: getTime() }
    setMessages(prev => [...prev, userMsg])
    setInput('')

    // 2. Update history for Gemini
    historyRef.current.push({ role: 'user', text })

    // 3. Show typing indicator immediately — no setTimeout
    //    (setTimeout caused a race condition where fixed replies
    //     returned before the timer fired, triggering a second response)
    setIsTyping(true)

    try {
      // 4. Call Gemini / fixed / dataset reply
      const reply = await askFatima(text, historyRef.current)

      // 5. Hide typing, show bot reply
      setIsTyping(false)
      const botMsg = { id: Date.now() + 1, role: 'bot', text: reply, time: getTime() }
      setMessages(prev => [...prev, botMsg])

      // 6. Update history
      historyRef.current.push({ role: 'model', text: reply })

    } catch (err) {
      setIsTyping(false)
      setMessages(prev => [...prev, {
        id:   Date.now() + 1,
        role: 'bot',
        text: `Kuch toh gadbad h yaar… (${err.message}) 😔`,
        time: getTime()
      }])
    }
  }, [input, isTyping, askFatima])

  // ── Render ──────────────────────────────────────────────────
  return (
    <div className={styles.shell}>
      {/* Phone frame */}
      <div className={styles.phone}>

        {/* Header */}
        <ChatHeader
          isDark={isDark}
          onToggleDark={() => setIsDark(d => !d)}
        />

        {/* Chat area with background wallpaper */}
        <div
          ref={chatRef}
          className={styles.chatArea}
          style={{ '--bg-url': `url('${BG_IMAGE}')` }}
        >
          {/* Date separator */}
          <DateDivider label="Today" />

          {/* Messages */}
          {messages.map(msg => (
            <ChatBubble key={msg.id} message={msg} />
          ))}

          {/* Typing indicator */}
          {isTyping && <TypingIndicator />}

          {/* Invisible scroll anchor */}
          <div ref={bottomRef} style={{ height: 4 }} />
        </div>

        {/* Input bar */}
        <InputBar
          value={input}
          onChange={setInput}
          onSend={handleSend}
          disabled={isTyping}
        />

      </div>
    </div>
  )
}
