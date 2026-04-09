import { useState } from 'react'
import './Login.css'

export default function Login({ onLogin }) {
  const [password, setPassword] = useState('')
  const [fading, setFading] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setFading(true)
    setTimeout(onLogin, 400)
  }

  return (
    <div className={`login-bg${fading ? ' login-fade-out' : ''}`}>
      <div className="login-card">
        <div className="login-logo">
          <svg className="login-logo-mark" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="36" height="36" rx="9" fill="#006d40" fillOpacity=".1" />
            <rect x="7" y="18" width="22" height="13" rx="2" stroke="#006d40" strokeWidth="1.6" fill="rgba(0,109,64,.08)" />
            <line x1="14" y1="18" x2="14" y2="31" stroke="#006d40" strokeWidth="1" strokeOpacity=".4" />
            <line x1="22" y1="18" x2="22" y2="31" stroke="#006d40" strokeWidth="1" strokeOpacity=".4" />
            <line x1="18" y1="5" x2="18" y2="18" stroke="#00e38a" strokeWidth="2" strokeLinecap="round" />
            <path d="M18 5 L13 11" stroke="#006d40" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M18 5 L23 11" stroke="#006d40" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M18 5 L18 11" stroke="#006d40" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="13" cy="11.5" r="1.2" fill="#006d40" />
            <circle cx="23" cy="11.5" r="1.2" fill="#006d40" />
            <circle cx="18" cy="11.5" r="1.2" fill="#00ff9c" />
          </svg>
          <div className="login-wordmark">
            <span className="login-name">CargoClaw</span>
            <span className="login-tag">Cargo Intelligence Agent</span>
          </div>
        </div>

        <div className="login-divider" />

        <h1 className="login-heading">Welcome back</h1>
        <p className="login-sub">Sign in to your TopFlight workspace</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label className="login-label">Email</label>
            <input
              className="login-input"
              type="email"
              defaultValue="noor.nazir@topflight.com"
              readOnly
            />
          </div>
          <div className="login-field">
            <label className="login-label">Password</label>
            <input
              className="login-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoFocus
            />
          </div>
          <button className="login-btn" type="submit">
            Sign in
          </button>
        </form>

        <p className="login-footer">TopFlight Aviation · Secure Access</p>
      </div>
    </div>
  )
}
