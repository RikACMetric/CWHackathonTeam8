import { useState, useCallback, useRef } from 'react'
import { useChat } from './hooks/useChat'
import Header from './components/Header/Header'
import ChatArea from './components/Chat/ChatArea'
import Dashboard from './components/Dashboard/Dashboard'
import Sidebar from "./components/Sidebar/Sidebar";
import Login from './components/Login/Login'

const GEO_RE = /\b(iran|oil|fuel|brent|crude|geopolit|ceasefire|conflict|war|sanction)/i
const CF_RE = /\b(what if|what would|counterfactual|reroute|had we|would have|if we had|alternative)/i
const ESC_RE = /\b(cascade|escalat|tier.?\d|response.?protocol|risk.?matrix|force.?majeure|ground.?handl|labour.?action|sla.?breach)/i

const GEO_RESPONSE = `
<p>I've run the geopolitical impact analysis. <strong>Check the Dashboard tab</strong> for the full breakdown.</p>
<p>Here's the summary:</p>
<p>Brent has surged <strong>+24%</strong> ($78 → $97/bbl) over 13 weeks as Iran tensions escalated, pushing jet fuel from €0.58 to €0.72/kg. We're running <strong class="c-bad">€1.8M over fuel plan</strong> with margin compressed from 19.7% → 17.7% (−2.0pp).</p>
<p><strong>Critical routes:</strong> AMS–DXB, FRA–PVG, and CDG–JFK are approaching break-even due to Gulf exposure and long-haul fuel burn.</p>
<p><strong>If ceasefire collapses:</strong> Brent could spike to $115–125/bbl, adding <strong class="c-bad">€2.6–3.4M</strong> in extra fuel costs. War-risk insurance is already up +40%.</p>
<div class="rec-card">
  <div class="rec-num">RECOMMENDATION</div>
  <div class="rec-detail">Lock in fuel hedges on the 3 critical routes and activate fuel surcharge escalation clauses now, before a potential collapse scenario materialises.</div>
</div>
`

const CF_RESPONSE = `
<p>I've run the counterfactual analysis. <strong>Check the Dashboard tab</strong> for the full breakdown.</p>
<p>Here's the summary:</p>
<p>Rerouting FRA–PVG via AMS during the Q1 ramp failures would have <strong>absorbed 82% of overflow</strong> that was historically rolled onto later flights.</p>
<p>Estimated impact vs. actuals:</p>
<ul>
  <li>Lane margin: <strong class="c-ok">+€303K</strong> (+6.8pp)</li>
  <li>Disruption cost: <strong class="c-ok">−€365K</strong> saved</li>
  <li>On-time performance: <strong class="c-ok">+20 pts</strong> (67% → 87%)</li>
</ul>
<div class="conf-note"><strong>Confidence: Medium-High.</strong> Disruption attribution to ramp failures is well-documented. AMS capacity holds on Tue/Thu/Sat but would not scale to all days.</div>
<div class="rec-card">
  <div class="rec-num">RECOMMENDATION</div>
  <div class="rec-detail">Set up a contingency rerouting protocol for FRA–PVG via AMS, triggered when Frankfurt ramp SLA breach rate exceeds 15% in a rolling 7-day window.</div>
</div>
`

const ESC_RESPONSE = `
<p>I've run the escalation analysis. <strong>Check the Dashboard tab</strong> for the full cascade timeline, risk matrix, and response protocol.</p>
<p>Here's the situation:</p>
<p>FRA–PVG has been in a <strong>6-week compounding disruption cascade</strong>. What started as ground-handling SLA misses has escalated to force majeure — PVG handler has no confirmed support for the next 8 rotations.</p>
<ul>
  <li>Lane margin: <strong class="c-bad">+2.1%</strong> (down from +8.4%)</li>
  <li>Disruption cost: <strong class="c-bad">€440K</strong> cumulative</li>
  <li>Customer revenue at risk: <strong class="c-bad">€3.1M</strong> annually</li>
  <li>Projected margin by W10: <strong class="c-bad">−4.2%</strong> if unresolved</li>
</ul>
<div class="conf-note"><strong>Worst case:</strong> If all risks materialise — €4.8M annualised impact across the PVG network.</div>
<div class="rec-card">
  <div class="rec-num">IMMEDIATE ACTION</div>
  <div class="rec-detail">Activate Swissport PVG standby contract (€45K), direct outreach to #2 pharma customer with SLA credits, and reroute 3 of next 8 rotations via AMS–PVG. Board approval needed for €150K emergency spend.</div>
</div>
`

export default function App() {
  const [page, setPage] = useState('login')
  const [dashView, setDashView] = useState('geopolitical')
  const firedSkills = useRef({ geo: false, cf: false, esc: false })
  const { messages, typing, showChips, sendMessage, firePrompt, addUserMessage, addAgentMessage } = useChat()

  const handleSend = useCallback((text) => {
    if (ESC_RE.test(text) && !firedSkills.current.esc) {
      firedSkills.current.esc = true
      addUserMessage(text)
      setDashView('escalation')
      setTimeout(() => {
        addAgentMessage(ESC_RESPONSE)
        setTimeout(() => setPage('dash'), 1200)
      }, 800)
    } else if (CF_RE.test(text) && !firedSkills.current.cf) {
      firedSkills.current.cf = true
      addUserMessage(text)
      setDashView('counterfactual')
      setTimeout(() => {
        addAgentMessage(CF_RESPONSE)
        setTimeout(() => setPage('dash'), 1200)
      }, 800)
    } else if (GEO_RE.test(text) && !firedSkills.current.geo) {
      firedSkills.current.geo = true
      addUserMessage(text)
      setDashView('geopolitical')
      setTimeout(() => {
        addAgentMessage(GEO_RESPONSE)
        setTimeout(() => setPage('dash'), 1200)
      }, 800)
    } else {
      sendMessage(text)
    }
  }, [sendMessage, addUserMessage, addAgentMessage])

  if (page === 'login') {
    return <Login onLogin={() => setPage('chat')} />
  }

  const handleSidebarPrompt = (prompt, opts) => {
    setPage('chat')
    firePrompt(prompt, opts)
  }

  return (
    <>
      <Header page={page} setPage={setPage} />
      <div className="main">
        <Sidebar firePrompt={handleSidebarPrompt} />
        {page === 'dash' ? (
          <Dashboard view={dashView} />
        ) : (
          <ChatArea
            messages={messages}
            typing={typing}
            showChips={showChips}
            sendMessage={handleSend}
          />
        )}
      </div>
    </>
  )
}
