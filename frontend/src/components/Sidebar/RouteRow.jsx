export default function RouteRow({ code, margin, marginColor, onClick }) {
  return (
    <div className="route-row" onClick={onClick}>
      <span className="route-code">{code}</span>
      <span className="route-m" style={{ color: marginColor }}>
        {margin}
      </span>
    </div>
  )
}
