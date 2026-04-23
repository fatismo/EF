// ============================================================
//  ChatBubble.jsx  —  Comic doodle outline speech bubble
// ============================================================

import React from 'react'
import styles from './ChatBubble.module.css'

export default function ChatBubble({ message }) {
  const { role, text, time } = message
  const isUser = role === 'user'

  const displayTime = time || new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })

  return (
    <div className={`${styles.wrap} ${isUser ? styles.out : styles.in}`}>
      <div className={`${styles.bubble} ${isUser ? styles.outBubble : styles.inBubble}`}>

        {/* Doodle outline SVG filter overlay — gives handdrawn feel */}
        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <filter id="doodle">
            <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" seed="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>

        {/* Message text */}
        <p className={styles.text}>{text}</p>

        {/* Time + ticks */}
        <div className={`${styles.meta} ${isUser ? styles.metaOut : styles.metaIn}`}>
          <span className={styles.time}>{displayTime}</span>
          {isUser && (
            <span className={styles.ticks} aria-label="Read">
              <svg width="15" height="10" viewBox="0 0 15 10" fill="none">
                <path d="M1 5l3 3 6-6" stroke="currentColor" strokeWidth="1.6"
                  strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 5l3 3 6-6" stroke="currentColor" strokeWidth="1.6"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          )}
        </div>

        {/* Comic tail */}
        <span className={`${styles.tail} ${isUser ? styles.tailOut : styles.tailIn}`} />
      </div>
    </div>
  )
}
