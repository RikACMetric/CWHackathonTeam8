export default function KpiCard({ label, value, delta, type, valueColor, onClick }) {
  return (
    <div className={`kpi ${type}`} onClick={onClick}>
      <div className="kpi-indicator" />
      <div className="kpi-body">
        <div className="kpi-label">{label}</div>
        <div className="kpi-value" style={valueColor ? { color: valueColor } : undefined}>
          {value}
        </div>
      </div>
      <div className="kpi-delta">{delta}</div>
    </div>
  )
}
