export default function ChatHero() {
  return (
    <section className="chat-hero" aria-label="Intelligence agent">
      <p className="chat-hero-label">CargoClaw Intelligence</p>
      <h1 className="chat-hero-title">What would you like to know about the fleet today?</h1>
      <div className="chat-hero-meta">
        <span className="chat-hero-pill">Systems Nominal</span>
        <span className="chat-hero-dot" aria-hidden />
        <span className="chat-hero-version">Intelligence Core v2.4.1</span>
        <span className="chat-hero-dot" aria-hidden />
        <span className="chat-hero-agent">Command Agent</span>
      </div>
    </section>
  )
}
