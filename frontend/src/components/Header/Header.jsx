import './Header.css'

export default function Header() {
  return (
    <header>
      <div className="logo">
        <svg className="logo-mark" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="36" height="36" rx="9" fill="#D4A843" fillOpacity=".12" />
          <rect x="7" y="18" width="22" height="13" rx="2" stroke="#D4A843" strokeWidth="1.6" fill="rgba(212,168,67,.1)" />
          <line x1="14" y1="18" x2="14" y2="31" stroke="#D4A843" strokeWidth="1" strokeOpacity=".4" />
          <line x1="22" y1="18" x2="22" y2="31" stroke="#D4A843" strokeWidth="1" strokeOpacity=".4" />
          <line x1="18" y1="5" x2="18" y2="18" stroke="#D4A843" strokeWidth="2" strokeLinecap="round" />
          <path d="M18 5 L13 11" stroke="#D4A843" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M18 5 L23 11" stroke="#D4A843" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M18 5 L18 11" stroke="#D4A843" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="13" cy="11.5" r="1.2" fill="#D4A843" />
          <circle cx="23" cy="11.5" r="1.2" fill="#D4A843" />
          <circle cx="18" cy="11.5" r="1.2" fill="#D4A843" />
        </svg>
        <div className="logo-wordmark">
          <span className="logo-name">CargoClaw</span>
          <span className="logo-tag">Cargo Intelligence Agent</span>
        </div>
      </div>

      <div className="header-center">
        <div className="pulse-dot" />
        <span className="status-txt">
          Connected · <em>TopFlight Live Data</em> · Last sync 2 min ago
        </span>
      </div>

      <div className="user-chip">
        <div className="user-ava">NN</div>
        <div className="user-info">
          <div className="name">Noor Nazir</div>
          <div className="role">SVP, Cargo Performance · TopFlight</div>
        </div>
      </div>
    </header>
  )
}
