import { useState, useRef, useCallback } from 'react'
import { getResponse } from '../data/responses'

function nowTime() {
  return new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
}

const WELCOME = {
  id: 'welcome',
  role: 'agent',
  time: nowTime(),
  content: `
<h4>Good morning, Noor.</h4>
<p>I have loaded TopFlight's cargo operational data across <strong>6 active routes</strong>, <strong>847 live bookings</strong>, and <strong>34 customer accounts</strong>. Here is what needs your attention right now:</p>
<ul>
  <li><strong>CDG–JFK is losing money</strong> — margin at −3.7%, driven by chronic under-booking (58% load) and JFK ground delay penalties averaging €48K/month.</li>
  <li><strong>FRA–PVG disruption costs have tripled</strong> this quarter. Root cause is ramp handling SLA failures at Frankfurt — not weather. Cost in Q1 alone: <strong class="c-bad">€680K</strong>.</li>
  <li><strong>LHR–ORD is your standout route</strong> at 24.1% margin — the dynamic pricing pilot is working. This is the model to replicate.</li>
</ul>
<p>Ask me anything about the data. Click any metric above or route in the sidebar to dive in. I will tell you what the data can prove — and flag where confidence is lower.</p>
`,
}

export function useChat() {
  const [messages, setMessages] = useState([WELCOME])
  const [typing, setTyping] = useState(false)
  const [showChips, setShowChips] = useState(true)
  const busy = useRef(false)

  const sendMessage = useCallback((text) => {
    if (busy.current || !text.trim()) return

    busy.current = true
    setShowChips(false)

    const userMsg = {
      id: `u-${Date.now()}`,
      role: 'user',
      time: nowTime(),
      content: text.trim(),
    }
    setMessages((prev) => [...prev, userMsg])
    setTyping(true)

    const delay = 1400 + Math.random() * 700
    setTimeout(() => {
      const html = getResponse(text)
      const agentMsg = {
        id: `a-${Date.now()}`,
        role: 'agent',
        time: nowTime(),
        content: html,
      }
      setTyping(false)
      setMessages((prev) => [...prev, agentMsg])
      busy.current = false
    }, delay)
  }, [])

  const firePrompt = useCallback(
    (text) => {
      sendMessage(text)
    },
    [sendMessage]
  )

  return { messages, typing, showChips, sendMessage, firePrompt }
}
