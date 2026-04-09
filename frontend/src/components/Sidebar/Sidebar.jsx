import { useState } from 'react'
import './Sidebar.css'
import RouteRow from './RouteRow'
import { ROUTES, DOMAINS, DATA_CURRENCY } from '../../data/routes'

function CollapseIcon({ collapsed }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }
  return collapsed ? (
    <svg {...common}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ) : (
    <svg {...common}>
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

export default function Sidebar({ firePrompt, activeSelection }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className={`sidebar${collapsed ? ' sidebar--collapsed' : ''}`}>
      <button
        type="button"
        className="sb-collapse"
        onClick={() => setCollapsed((c) => !c)}
        aria-expanded={!collapsed}
        aria-controls="sidebar-nav"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <CollapseIcon collapsed={collapsed} />
      </button>
      <div id="sidebar-nav" className="sidebar-inner" hidden={collapsed}>
      {/* Data Domains */}
      <div className="sb-section">
        <div className="sb-label">Data Domains</div>
        {DOMAINS.map((d) => (
          <div
            key={d.label}
            className={`sb-item${
              activeSelection?.type === 'domain' && activeSelection.key === d.label ? ' active' : ''
            }`}
            onClick={() =>
              firePrompt(d.prompt, { useLocalResponse: true }, { type: 'domain', key: d.label })
            }
          >
            <span className="sb-icon">{d.icon}</span>
            {d.label}
            {d.badge && (
              <span className={`sb-badge ${d.badge.type}`}>{d.badge.text}</span>
            )}
          </div>
        ))}
      </div>

      {/* Routes */}
      <div className="sb-section">
        <div className="sb-label">Routes · Margin</div>
        {ROUTES.map((r) => (
          <RouteRow
            key={r.code}
            code={r.code}
            margin={r.margin}
            marginColor={r.marginColor}
            active={activeSelection?.type === 'route' && activeSelection.key === r.code}
            onClick={() =>
              firePrompt(r.prompt, { useLocalResponse: true }, { type: 'route', key: r.code })
            }
          />
        ))}
      </div>

      {/* Data Currency */}
      <div className="sb-section">
        <div className="sb-label">Data Currency</div>
        {DATA_CURRENCY.map((c) => (
          <div className="currency-item" key={c.key}>
            <span className="key">{c.key}</span>
            <span className={c.ok ? 'currency-ok' : 'currency-warn'}>{c.value}</span>
          </div>
        ))}
      </div>
      </div>
    </div>
  )
}
