import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine,
} from 'recharts'
import { timeSeries, cumulativeImpact, summary } from '../../data/counterfactual'
import './Counterfactual.css'

const OK = '#0e6c41'
const BAD = '#ba1a1a'
const PRI = '#006d40'
const MUT = '#6a7b6e'
const GRD = 'rgba(185,203,188,.25)'

function Tip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: '#fff', border: '1px solid rgba(185,203,188,.4)', borderRadius: 8, padding: '10px 14px', fontSize: 12, boxShadow: '0 4px 16px rgba(0,0,0,.08)' }}>
      <div style={{ fontWeight: 700, marginBottom: 4 }}>{label}</div>
      {payload.map((p) => (
        <div key={p.dataKey} style={{ color: p.color, marginBottom: 2 }}>
          {p.name}: {p.value}{p.dataKey.includes('otp') ? '%' : 'K'}
        </div>
      ))}
    </div>
  )
}

export default function Counterfactual() {
  const s = summary
  return (
    <div className="cf-page">
      <div className="cf-header">
        <h2>Counterfactual Analysis</h2>
        <div className="cf-subtitle">{s.route} &middot; {s.period} &middot; {s.intervention}</div>
      </div>

      <div className="cf-kpis">
        {[
          ['Lane Margin', s.totalMarginActual, s.totalMarginCF, s.marginDelta],
          ['Disruption Cost', s.disruptionActual, s.disruptionCF, s.disruptionSaved],
          ['On-Time Performance', s.otpActual, s.otpCF, s.otpDelta],
        ].map(([label, actual, cf, delta]) => (
          <div className="cf-kpi" key={label}>
            <div className="cf-kpi-label">{label}</div>
            <div className="cf-kpi-row">
              <span className="cf-kpi-actual">{actual}</span>
              <span className="cf-kpi-cf">{cf}</span>
              <span className="cf-kpi-delta positive">{delta}</span>
            </div>
          </div>
        ))}
        <div className="cf-kpi">
          <div className="cf-kpi-label">Confidence</div>
          <div className="cf-confidence">{s.confidence}</div>
        </div>
      </div>

      <div className="cf-charts">
        <div className="cf-chart-card">
          <div className="cf-chart-title">Weekly Margin (€K)</div>
          <div className="cf-chart-sub">Actual vs. counterfactual</div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={timeSeries}>
              <CartesianGrid strokeDasharray="3 3" stroke={GRD} />
              <XAxis dataKey="week" tick={{ fill: MUT, fontSize: 10 }} />
              <YAxis tick={{ fill: MUT, fontSize: 10 }} />
              <Tooltip content={<Tip />} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Area type="monotone" dataKey="marginCF" name="Counterfactual" stroke={OK} fill={OK} fillOpacity={.12} strokeWidth={2} />
              <Area type="monotone" dataKey="marginActual" name="Actual" stroke={BAD} fill={BAD} fillOpacity={.08} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="cf-chart-card">
          <div className="cf-chart-title">Weekly Disruption Cost (€K)</div>
          <div className="cf-chart-sub">Ramp failures spike W3–W11</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={timeSeries}>
              <CartesianGrid strokeDasharray="3 3" stroke={GRD} />
              <XAxis dataKey="week" tick={{ fill: MUT, fontSize: 10 }} />
              <YAxis tick={{ fill: MUT, fontSize: 10 }} />
              <Tooltip content={<Tip />} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="disruptActual" name="Actual" fill={BAD} fillOpacity={.7} radius={[3,3,0,0]} />
              <Bar dataKey="disruptCF" name="Counterfactual" fill={OK} fillOpacity={.7} radius={[3,3,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="cf-chart-card">
          <div className="cf-chart-title">On-Time Performance (%)</div>
          <div className="cf-chart-sub">AMS routing holds above SLA target</div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={timeSeries}>
              <CartesianGrid strokeDasharray="3 3" stroke={GRD} />
              <XAxis dataKey="week" tick={{ fill: MUT, fontSize: 10 }} />
              <YAxis domain={[40, 100]} tick={{ fill: MUT, fontSize: 10 }} />
              <Tooltip content={<Tip />} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <ReferenceLine y={80} stroke={PRI} strokeDasharray="4 4" label={{ value: 'SLA', fill: PRI, fontSize: 10 }} />
              <Line type="monotone" dataKey="otpCF" name="Counterfactual" stroke={OK} strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="otpActual" name="Actual" stroke={BAD} strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="cf-chart-card">
          <div className="cf-chart-title">Cumulative Margin Impact (€K)</div>
          <div className="cf-chart-sub">Running total of margin gained</div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={cumulativeImpact}>
              <CartesianGrid strokeDasharray="3 3" stroke={GRD} />
              <XAxis dataKey="week" tick={{ fill: MUT, fontSize: 10 }} />
              <YAxis tick={{ fill: MUT, fontSize: 10 }} />
              <Tooltip content={<Tip />} />
              <Area type="monotone" dataKey="cumDelta" name="Cumulative gain" stroke={PRI} fill={PRI} fillOpacity={.12} strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="cf-action">
        <h4>Suggested Action</h4>
        <p>
          Set up a <strong>contingency rerouting protocol</strong> for FRA–PVG via AMS, triggered when
          Frankfurt ramp SLA breach rate exceeds 15% in a rolling 7-day window. Run a <strong>6-week
          retrospective simulation</strong> on Q2 data to validate the €243K margin uplift.
        </p>
      </div>
    </div>
  )
}
