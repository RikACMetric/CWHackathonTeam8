export default function RouteRow({ code, margin, marginColor, active, onClick }) {
  return (
    <div className={`route-row${active ? ' active' : ''}`} onClick={onClick}>
      <span className="route-code">{code}</span>
      <span className="route-m" style={active ? undefined : { color: marginColor }}>
        {margin}
      </span>
    </div>
  )
}
