const CHIPS = [
  { icon: 'eco', label: 'What is working?' },
  { icon: 'warn', label: 'What is not working well?' },
  { icon: 'trending', label: 'Where to invest next?' },
  { icon: 'ship', label: 'What to stop?' },
]

function ChipIcon({ name }) {
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch (name) {
    case 'trending':
      return (
        <svg {...common} aria-hidden>
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      )
    case 'warn':
      return (
        <svg {...common} aria-hidden>
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      )
    case 'eco':
      return (
        <svg {...common} aria-hidden>
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 2 6 0 5-3.5 8-9 8z" />
          <path d="M18.5 13.5c-1.5 2-4 3-7 3" />
        </svg>
      )
    case 'ship':
      return (
        <svg {...common} aria-hidden>
          <path d="M2 21h20l-2-9H4l-2 9z" />
          <path d="M6 12V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5" />
        </svg>
      )
    default:
      return null
  }
}

export default function PromptChips({ onSend }) {
  return (
    <div className="prompt-chips">
      {CHIPS.map(({ icon, label }) => (
        <button
          key={label}
          type="button"
          className="chip"
          onClick={() => onSend(label)}
        >
          <span className="chip-icon" aria-hidden>
            <ChipIcon name={icon} />
          </span>
          <span className="chip-label">{label}</span>
        </button>
      ))}
    </div>
  )
}
