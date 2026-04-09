import {
  AreaChart, Area, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine,
} from 'recharts'
import { oilTimeSeries, scenarioData, routeExposure, summary } from '../../data/geopolitical'
import './Geopolitical.css'

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
          {p.name}: {p.value}{p.dataKey === 'brent' || p.dataKey.includes('collapse') || p.dataKey === 'current' || p.dataKey === 'stable' ? ' $/bbl' : p.dataKey.includes('margin') ? '%' : '€K'}
        </div>
      ))}
    </div>
  )
}

export default function Geopolitical() {
  const s = summary
  return (
    <div className="geo-page">
      <div className="geo-header">
        <h2>Geopolitical Impact Analysis</h2>
        <div className="geo-subtitle">Iran–Israel Conflict &middot; Oil Price Shock &middot; Ceasefire Scenario Modelling</div>
      </div>

      <div className="geo-kpis">
        <div className="geo-kpi">
          <div className="geo-kpi-label">Brent Crude</div>
          <div className="geo-kpi-value warn">{s.brentNow}</div>
          <div className="geo-kpi-sub">from {s.brentStart} ({s.brentChange})</div>
        </div>
        <div className="geo-kpi">
          <div className="geo-kpi-label">Fuel Cost vs Plan</div>
          <div className="geo-kpi-value bad">{s.fuelCostOverPlan}</div>
          <div className="geo-kpi-sub">Q1 additional fuel cost</div>
        </div>
        <div className="geo-kpi">
          <div className="geo-kpi-label">Margin Compression</div>
          <div className="geo-kpi-value bad">{s.marginCompression}</div>
          <div className="geo-kpi-sub">{s.marginPlan} planned → {s.marginActual} actual</div>
        </div>
        <div className="geo-kpi">
          <div className="geo-kpi-label">Ceasefire Collapse</div>
          <div className="geo-kpi-value bad">{s.collapseExtraCost}</div>
          <div className="geo-kpi-sub">additional quarterly cost at {s.collapseOilRange}</div>
        </div>
      </div>

      <div className="geo-charts">
        <div className="geo-chart-card">
          <div className="geo-chart-title">Brent Crude & Fuel Cost (€K/week)</div>
          <div className="geo-chart-sub">Oil price rise driving fuel cost above plan since W2</div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={oilTimeSeries}>
              <CartesianGrid strokeDasharray="3 3" stroke={GRD} />
              <XAxis dataKey="week" tick={{ fill: MUT, fontSize: 10 }} />
              <YAxis yAxisId="cost" tick={{ fill: MUT, fontSize: 10 }} />
              <YAxis yAxisId="oil" orientation="right" tick={{ fill: MUT, fontSize: 10 }} />
              <Tooltip content={<Tip />} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Area yAxisId="cost" type="monotone" dataKey="fuelCostActual" name="Fuel cost (actual)" stroke={BAD} fill={BAD} fillOpacity={.1} strokeWidth={2} />
              <Area yAxisId="cost" type="monotone" dataKey="fuelCostPlan" name="Fuel cost (plan)" stroke={OK} fill={OK} fillOpacity={.06} strokeWidth={2} strokeDasharray="4 4" />
              <Line yAxisId="oil" type="monotone" dataKey="brent" name="Brent $/bbl" stroke={WARN} strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="geo-chart-card">
          <div className="geo-chart-title">Oil Price Scenarios ($/bbl)</div>
          <div className="geo-chart-sub">Ceasefire collapse vs. current trajectory vs. resolution</div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={scenarioData}>
              <CartesianGrid strokeDasharray="3 3" stroke={GRD} />
              <XAxis dataKey="week" tick={{ fill: MUT, fontSize: 10 }} />
              <YAxis domain={[70, 130]} tick={{ fill: MUT, fontSize: 10 }} />
              <Tooltip content={<Tip />} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <ReferenceLine y={110} stroke={BAD} strokeDasharray="4 4" label={{ value: 'Suspension trigger', fill: BAD, fontSize: 10 }} />
              <Line type="monotone" dataKey="collapse" name="Ceasefire collapse" stroke={BAD} strokeWidth={2.5} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="current" name="Current trajectory" stroke={WARN} strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="stable" name="Resolution" stroke={OK} strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="geo-chart-card full">
          <div className="geo-chart-title">Route Exposure</div>
          <div className="geo-chart-sub">Fuel cost delta and margin impact by route — 3 routes at break-even risk under collapse scenario</div>
          <table className="geo-table">
            <thead>
              <tr>
                <th>Route</th>
                <th>Fuel Cost Delta (€K)</th>
                <th>Margin Impact</th>
                <th>Collapse Scenario</th>
                <th>Severity</th>
              </tr>
            </thead>
            <tbody>
              {routeExposure.map((r) => (
                <tr key={r.route}>
                  <td style={{ fontWeight: 600 }}>{r.route}</td>
                  <td style={{ color: BAD, fontWeight: 600 }}>+€{r.fuelDelta}K</td>
                  <td style={{ color: BAD }}>{r.marginImpact}pp</td>
                  <td>{r.collapseRisk}</td>
                  <td><span className={`geo-sev ${r.severity}`}>{r.severity}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="geo-actions">
        <h4>Recommended Actions</h4>
        <ul>
          <li><strong>Lock in fuel hedging for Q2</strong> at current rates — each $1/bbl increase adds ~€74K/quarter in unhedged exposure.</li>
          <li><strong>Renegotiate fuel surcharge caps</strong> with DHL Express (renewal Q3) and Zara Logistics ahead of schedule — 18% of revenue has capped pass-through.</li>
          <li><strong>Prepare CDG–JFK suspension protocol</strong> — activate if oil exceeds $110/bbl for 4+ weeks.</li>
          <li><strong>Shift AMS–DXB volume</strong> to AMS–NBO as contingency if Gulf insurance premiums rise &gt;40%.</li>
        </ul>
      </div>
    </div>
  )
}
