import './Sidebar.css'
import RouteRow from './RouteRow'
import { ROUTES, DOMAINS, DATA_CURRENCY } from '../../data/routes'

export default function Sidebar({ firePrompt }) {
  return (
    <div className="sidebar">
      {/* Data Domains */}
      <div className="sb-section">
        <div className="sb-label">Data Domains</div>
        {DOMAINS.map((d, i) => (
          <div
            key={d.label}
            className={`sb-item${i === 0 ? ' active' : ''}`}
            onClick={() => firePrompt(d.prompt)}
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
            onClick={() => firePrompt(r.prompt)}
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
  )
}
