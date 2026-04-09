import './MetricsBar.css'
import KpiCard from './KpiCard'
import { METRICS } from '../../data/metrics'

export default function MetricsBar({ firePrompt }) {
  return (
    <div className="metrics-bar">
      {METRICS.map((m) => (
        <KpiCard
          key={m.label}
          label={m.label}
          value={m.value}
          delta={m.delta}
          type={m.type}
          valueColor={m.valueColor}
          onClick={() => firePrompt(m.prompt, { useLocalResponse: true })}
        />
      ))}
    </div>
  )
}
