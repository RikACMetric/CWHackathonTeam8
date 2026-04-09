import { useState, useCallback } from 'react'
import { useChat } from './hooks/useChat'
import Header from './components/Header/Header'
import ChatArea from './components/Chat/ChatArea'
import Dashboard from './components/Dashboard/Dashboard'
import Sidebar from "./components/Sidebar/Sidebar";

const GEO_RE = /\b(iran|oil|fuel|brent|crude|geopolit|ceasefire|conflict|war|sanction|escalat)/i
const CF_RE = /\b(what if|what would|counterfactual|reroute|had we|would have|if we had|alternative)/i

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

export default function App() {
  const [page, setPage] = useState('chat')
  const [dashView, setDashView] = useState('geopolitical')
  const { messages, typing, showChips, sendMessage, firePrompt, addUserMessage, addAgentMessage } = useChat()

  const handleSend = useCallback((text) => {
    if (CF_RE.test(text)) {
      addUserMessage(text)
      setDashView('counterfactual')
      setTimeout(() => {
        addAgentMessage(CF_RESPONSE)
        setTimeout(() => setPage('dash'), 1200)
      }, 800)
    } else if (GEO_RE.test(text)) {
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

  return (
    <>
      <Header page={page} setPage={setPage} />
      <div className="main">
        <Sidebar firePrompt={firePrompt} />
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
