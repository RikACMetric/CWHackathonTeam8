import './EmptyDashboard.css'

export default function EmptyDashboard() {
  return (
    <div className="empty-dash">
      <div className="empty-dash-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </svg>
      </div>
      <h3>No analysis running</h3>
      <p>Ask a question in the Chat tab to generate a dashboard.<br />
      Try: <em>"How is the Iran situation affecting our fuel costs?"</em></p>
    </div>
  )
}
