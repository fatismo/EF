// ============================================================
//  ChatHeader.jsx  —  WhatsApp-style iPhone top bar
// ============================================================

import React from 'react'
import { BOT_AVATAR, CONTACT_NAME, CONTACT_STATUS } from '../../config.js'
import styles from './ChatHeader.module.css'

// Fallback SVG if bot.png is missing
const FALLBACK = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60">
    <circle cx="30" cy="30" r="30" fill="#25d366"/>
    <text x="50%" y="56%" dominant-baseline="middle" text-anchor="middle"
          font-size="26" fill="white" font-family="sans-serif">F</text>
  </svg>`
)}`

// ── Call popup messages ──────────────────────────────────────
// 📌 TO CHANGE POPUP MESSAGES → edit this array below
const CALL_REPLIES = [
  "Idhar hi jo bolna h bol",
  "Video call kyu kar rha?",
  "Phone call kyu kar rha?",
  "pagal h kya bc?"
]

function showCallPopup() {
  const msg = CALL_REPLIES[Math.floor(Math.random() * CALL_REPLIES.length)]
  alert(msg)
}

export default function ChatHeader({ isDark, onToggleDark }) {
  return (
    <header className={styles.header}>
      {/* Left: back arrow */}
      <button className={styles.backBtn} aria-label="Back">
        <svg width="11" height="19" viewBox="0 0 11 19" fill="none">
          <path d="M9.5 1.5L1.5 9.5L9.5 17.5"
                stroke="currentColor" strokeWidth="2.2"
                strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className={styles.backCount}>1</span>
      </button>

      {/* Avatar */}
      <img
        src={BOT_AVATAR}
        alt={CONTACT_NAME}
        className={styles.avatar}
        onError={e => { e.target.src = FALLBACK }}
      />

      {/* Name + status */}
      <div className={styles.info}>
        <span className={styles.name}>{CONTACT_NAME}</span>
        <span className={styles.status}>
          {CONTACT_STATUS === 'online' ? 'online' : 'last seen recently'}
        </span>
      </div>

      {/* Right actions */}
      <div className={styles.actions}>
        {/* Dark mode toggle */}
        <button
          className={styles.iconBtn}
          onClick={onToggleDark}
          aria-label="Toggle dark mode"
          title={isDark ? 'Light mode' : 'Dark mode'}
        >
          {isDark ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                    stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>

        {/* Video call icon — shows popup on click */}
        <button className={styles.iconBtn} aria-label="Video call" onClick={showCallPopup}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15 10l4.553-2.277A1 1 0 0121 8.723v6.554a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/>
          </svg>
        </button>

        {/* Phone icon — shows popup on click */}
        <button className={styles.iconBtn} aria-label="Call" onClick={showCallPopup}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1C10.613 21 3 13.387 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.24 1.01l-2.21 2.21z"/>
          </svg>
        </button>
      </div>
    </header>
  )
}
