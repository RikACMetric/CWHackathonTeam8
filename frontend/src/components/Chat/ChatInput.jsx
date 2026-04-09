import { useState, useRef } from 'react'

export default function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState('')
  const ref = useRef(null)

  function grow() {
    const el = ref.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 110) + 'px'
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  function submit() {
    const text = value.trim()
    if (!text || disabled) return
    onSend(text)
    setValue('')
    if (ref.current) {
      ref.current.style.height = 'auto'
    }
  }

  return (
    <div className="input-zone">
      <div className="input-box">
        <textarea
          ref={ref}
          className="chat-input"
          rows={1}
          value={value}
          disabled={disabled}
          placeholder="Ask about routes, margins, disruptions, customers, or investment priorities…"
          onChange={(e) => { setValue(e.target.value); grow() }}
          onKeyDown={handleKey}
        />
        <button className="send-btn" disabled={disabled || !value.trim()} onClick={submit}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
      <div className="input-hint">
        Enter to send · Shift+Enter for new line · Click any metric or route to explore
      </div>
    </div>
  )
}
