import { useState } from 'react'
import './Sidebar.css'
import RouteRow from './RouteRow'
import { ROUTES, DOMAINS, DATA_CURRENCY } from '../../data/routes'

const BUILT_IN_SKILLS = [
  { id: 'geo', name: 'Geopolitical Impact', icon: '🌍', desc: 'Oil prices, Iran conflict, ceasefire scenarios' },
  { id: 'counterfactual', name: 'Counterfactual Analysis', icon: '🔄', desc: 'What-if analysis on past operations' },
  { id: 'escalation', name: 'Cascade Escalation', icon: '⚠️', desc: 'Compounding disruption analysis' },
  { id: 'csuite', name: 'Executive Summary', icon: '📋', desc: 'Board-ready bullet-point briefing' },
]

export default function Sidebar({ firePrompt, customSkills = [] }) {
  const [skillsOpen, setSkillsOpen] = useState(true)

  const allSkills = [...BUILT_IN_SKILLS, ...customSkills]

  return (
    <div className="sidebar">
      {/* Data Domains */}
      <div className="sb-section">
        <div className="sb-label">Data Domains</div>
        {DOMAINS.map((d, i) => (
          <div
            key={d.label}
            className={`sb-item${i === 0 ? ' active' : ''}`}
            onClick={() => firePrompt(d.prompt, { useLocalResponse: true })}
          >
            <span className="sb-icon">{d.icon}</span>
            {d.label}
            {d.badge && (
              <span className={`sb-badge ${d.badge.type}`}>{d.badge.text}</span>
            )}
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="sb-section">
        <div className="sb-label sb-label-toggle" onClick={() => setSkillsOpen(!skillsOpen)}>
          <span>Skills</span>
          <span className="sb-chevron">{skillsOpen ? '▾' : '▸'}</span>
        </div>
        {skillsOpen && allSkills.map((s) => (
          <div
            key={s.id}
            className={`sb-skill${s.custom ? ' sb-skill-custom' : ''}`}
            onClick={() => firePrompt(s.desc, { useLocalResponse: !s.custom })}
          >
            <span className="sb-skill-icon">{s.icon}</span>
            <div className="sb-skill-info">
              <div className="sb-skill-name">{s.name}</div>
              <div className="sb-skill-desc">{s.desc}</div>
            </div>
            {s.custom && <span className="sb-badge-custom">custom</span>}
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
            onClick={() => firePrompt(r.prompt, { useLocalResponse: true })}
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
