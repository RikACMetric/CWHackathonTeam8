const CHIPS = [
  'Which routes are losing margin?',
  'What is driving disruption costs?',
  'Where should we invest next?',
  'Which customers are at risk?',
  'What is actually working?',
  'Show me the FRA–PVG situation',
  'What if we had added extra Friday capacity on AMS–DXB?',
]

export default function PromptChips({ onSend }) {
  return (
    <div className="prompt-chips">
      {CHIPS.map((text) => (
        <div key={text} className="chip" onClick={() => onSend(text)}>
          {text}
        </div>
      ))}
    </div>
  )
}
