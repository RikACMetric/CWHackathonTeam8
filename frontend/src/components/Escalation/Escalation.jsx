import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine,
} from 'recharts'
import {
  escalationTimeline, projectedData, customerImpact,
  riskMatrix, responseActions, summary,
} from '../../data/escalation'
import './Escalation.css'

const BAD = '#ba1a1a'
const WARN = '#b45309'
const OK = '#0e6c41'
const MUT = '#6a7b6e'
const GRD = 'rgba(185,203,188,.25)'

function Tip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: '#fff', border: '1px solid rgba(185,203,188,.4)', borderRadius: 8, padding: '10px 14px', fontSize: 12, boxShadow: '0 4px 16px rgba(0,0,0,.08)' }}>
      <div style={{ fontWeight: 700, marginBottom: 4 }}>{label}</div>
      {payload.map((p) => (
        <div key={p.dataKey} style={{ color: p.color, marginBottom: 2 }}>
          {p.name}: {p.value}{p.dataKey.includes('margin') || p.dataKey.includes('Margin') ? '%' : p.dataKey.includes('volume') || p.dataKey.includes('Volume') ? '%' : ''}
        </div>
      ))}
    </div>
  )
}

export default function Escalation() {
  const s = summary
  return (
    <div className="esc-page">
      <div className="esc-header">
        <h2>Escalation Analysis</h2>
        <div className="esc-subtitle">{s.route} Cascade Failure &middot; {s.period} &middot; Response Protocol</div>
      </div>

      {/* KPI Cards */}
      <div className="esc-kpis">
        <div className="esc-kpi">
          <div className="esc-kpi-label">Lane Margin</div>
          <div className="esc-kpi-value warn">{s.laneMargin}</div>
          <div className="esc-kpi-sub">{s.laneMarginTrend}</div>
        </div>
        <div className="esc-kpi">
          <div className="esc-kpi-label">Weekly Revenue</div>
          <div className="esc-kpi-value bad">{s.weeklyRevenue}</div>
          <div className="esc-kpi-sub">{s.weeklyRevenueTrend}</div>
        </div>
        <div className="esc-kpi">
          <div className="esc-kpi-label">Load Factor</div>
          <div className="esc-kpi-value bad">{s.loadFactor}</div>
          <div className="esc-kpi-sub">{s.loadFactorTrend}</div>
        </div>
        <div className="esc-kpi">
          <div className="esc-kpi-label">Disruption Cost</div>
          <div className="esc-kpi-value bad">{s.disruptionCost}</div>
          <div className="esc-kpi-sub">{s.disruptionCostTrend}</div>
        </div>
        <div className="esc-kpi">
          <div className="esc-kpi-label">Customer Rev at Risk</div>
          <div className="esc-kpi-value bad">{s.customerRevAtRisk}</div>
          <div className="esc-kpi-sub">{s.customerRevAtRiskDetail}</div>
        </div>
        <div className="esc-kpi">
          <div className="esc-kpi-label">Projected Margin (W10)</div>
          <div className="esc-kpi-value bad">{s.projectedMargin}</div>
          <div className="esc-kpi-sub">{s.projectedMarginDetail}</div>
        </div>
      </div>

      {/* Escalation Timeline */}
      <div className="esc-timeline-card">
        <div className="esc-chart-title">Cascade Timeline</div>
        <div className="esc-chart-sub">Week-by-week escalation from initial SLA miss to force majeure</div>
        <div className="esc-timeline">
          {escalationTimeline.map((t, i) => (
            <div className={`esc-step ${i === escalationTimeline.length - 1 ? 'active' : ''}`} key={t.week}>
              <div className="esc-step-week">{t.week}</div>
              <div className="esc-step-dot" />
              <div className="esc-step-event">{t.event}</div>
              <div className="esc-step-detail">{t.detail}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="esc-charts">
        <div className="esc-chart-card">
          <div className="esc-chart-title">Margin Deterioration (%)</div>
          <div className="esc-chart-sub">Lane margin collapsing toward negative — break-even crossed by W8</div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={escalationTimeline}>
              <CartesianGrid strokeDasharray="3 3" stroke={GRD} />
              <XAxis dataKey="week" tick={{ fill: MUT, fontSize: 10 }} />
              <YAxis domain={[-2, 10]} tick={{ fill: MUT, fontSize: 10 }} />
              <Tooltip content={<Tip />} />
              <ReferenceLine y={0} stroke={BAD} strokeDasharray="4 4" label={{ value: 'Break-even', fill: BAD, fontSize: 10 }} />
              <Area type="monotone" dataKey="margin" name="Lane Margin" stroke={BAD} fill={BAD} fillOpacity={.1} strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="esc-chart-card">
          <div className="esc-chart-title">Disruption Cost (€K)</div>
          <div className="esc-chart-sub">Weekly cost accelerating — cumulative at €440K</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={escalationTimeline}>
              <CartesianGrid strokeDasharray="3 3" stroke={GRD} />
              <XAxis dataKey="week" tick={{ fill: MUT, fontSize: 10 }} />
              <YAxis tick={{ fill: MUT, fontSize: 10 }} />
              <Tooltip content={<Tip />} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="disruptionWeekly" name="Weekly" fill={WARN} fillOpacity={.7} radius={[3,3,0,0]} />
              <Bar dataKey="disruptionCumulative" name="Cumulative" fill={BAD} fillOpacity={.7} radius={[3,3,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="esc-chart-card">
          <div className="esc-chart-title">Projected Margin Trajectory (%)</div>
          <div className="esc-chart-sub">If unresolved, lane hits −4.2% by Week 10</div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={projectedData}>
              <CartesianGrid strokeDasharray="3 3" stroke={GRD} />
              <XAxis dataKey="week" tick={{ fill: MUT, fontSize: 10 }} />
              <YAxis domain={[-6, 4]} tick={{ fill: MUT, fontSize: 10 }} />
              <Tooltip content={<Tip />} />
              <ReferenceLine y={0} stroke={BAD} strokeDasharray="4 4" label={{ value: 'Break-even', fill: BAD, fontSize: 10 }} />
              <Line type="monotone" dataKey="marginProjected" name="Projected" stroke={BAD} strokeWidth={2.5} dot={{ r: 4 }} strokeDasharray="6 3" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="esc-chart-card">
          <div className="esc-chart-title">Customer Volume Index (%)</div>
          <div className="esc-chart-sub">Volume collapsed to 58% of baseline as customers shift to competitors</div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={customerImpact}>
              <CartesianGrid strokeDasharray="3 3" stroke={GRD} />
              <XAxis dataKey="week" tick={{ fill: MUT, fontSize: 10 }} />
              <YAxis domain={[40, 110]} tick={{ fill: MUT, fontSize: 10 }} />
              <Tooltip content={<Tip />} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Area type="monotone" dataKey="volumeBaseline" name="Baseline" stroke={OK} fill={OK} fillOpacity={.06} strokeWidth={2} strokeDasharray="4 4" />
              <Area type="monotone" dataKey="volumeActual" name="Actual Volume" stroke={BAD} fill={BAD} fillOpacity={.1} strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Risk Matrix */}
      <div className="esc-chart-card full">
        <div className="esc-chart-title">Risk Matrix</div>
        <div className="esc-chart-sub">Active risks if escalation continues unresolved</div>
        <table className="esc-table">
          <thead>
            <tr>
              <th>Risk</th>
              <th>Likelihood</th>
              <th>Impact</th>
              <th>Severity</th>
              <th>Mitigation</th>
            </tr>
          </thead>
          <tbody>
            {riskMatrix.map((r) => (
              <tr key={r.risk}>
                <td style={{ fontWeight: 600 }}>{r.risk}</td>
                <td>{r.likelihood}</td>
                <td style={{ color: BAD, fontWeight: 600 }}>{r.impact}</td>
                <td><span className={`esc-sev ${r.severity}`}>{r.severity}</span></td>
                <td>{r.mitigation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tiered Response Actions */}
      <div className="esc-actions-section">
        <h4 className="esc-actions-title">Response Protocol</h4>

        <div className="esc-tier tier-1">
          <div className="esc-tier-header">
            <span className="esc-tier-badge critical">TIER 1</span>
            <span className="esc-tier-label">Immediate — This Week</span>
          </div>
          {responseActions.tier1.map((a) => (
            <div className="esc-action-card" key={a.title}>
              <div className="esc-action-meta">{a.timeline} &middot; {a.confidence} confidence</div>
              <div className="esc-action-title">{a.title}</div>
              <div className="esc-action-detail">{a.detail}</div>
            </div>
          ))}
        </div>

        <div className="esc-tier tier-2">
          <div className="esc-tier-header">
            <span className="esc-tier-badge warning">TIER 2</span>
            <span className="esc-tier-label">Tactical — 2 to 4 Weeks</span>
          </div>
          {responseActions.tier2.map((a) => (
            <div className="esc-action-card" key={a.title}>
              <div className="esc-action-meta">{a.timeline} &middot; {a.confidence} confidence</div>
              <div className="esc-action-title">{a.title}</div>
              <div className="esc-action-detail">{a.detail}</div>
            </div>
          ))}
        </div>

        <div className="esc-tier tier-3">
          <div className="esc-tier-header">
            <span className="esc-tier-badge ok">TIER 3</span>
            <span className="esc-tier-label">Structural — 1 to 3 Months</span>
          </div>
          {responseActions.tier3.map((a) => (
            <div className="esc-action-card" key={a.title}>
              <div className="esc-action-meta">{a.timeline} &middot; {a.confidence} confidence</div>
              <div className="esc-action-title">{a.title}</div>
              <div className="esc-action-detail">{a.detail}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Board Ask */}
      <div className="esc-board-ask">
        <h4>Board-Level Ask</h4>
        <ul>
          <li>Approve <strong>€150K emergency spend</strong> for Swissport PVG activation and customer retention credits</li>
          <li>Authorise commercial team to offer up to <strong>12% rate discount</strong> to retain pharma customer through Q3</li>
          <li>Mandate <strong>dual-source ground handling policy</strong> across top-5 stations by end of Q2</li>
        </ul>
        <div className="esc-worst-case">
          Worst-case exposure if all risks materialise: <strong>{s.worstCase}</strong>
        </div>
      </div>
    </div>
  )
}
