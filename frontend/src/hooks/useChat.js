import { useState, useRef, useCallback } from 'react'

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
<p>Ask me anything about the data. I will tell you what the numbers can prove — and flag where confidence is lower.</p>
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

    const agentId = `a-${Date.now()}`

    // Add a placeholder message that will be streamed into
    setMessages((prev) => [...prev, { id: agentId, role: 'agent', time: nowTime(), content: '' }])
    setTyping(false)

    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text }),
    })
      .then(async (res) => {
        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        let buffer = ''
        let accumulated = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop() || ''

          for (const line of lines) {
            if (!line.startsWith('data: ')) continue
            try {
              const event = JSON.parse(line.slice(6))
              if (event.type === 'text') {
                accumulated += event.content
                setMessages((prev) =>
                  prev.map((m) => m.id === agentId ? { ...m, content: accumulated } : m)
                )
              } else if (event.type === 'tool') {
                accumulated += `\n<div class="conf-note"><strong>Using tool:</strong> ${event.tool}</div>\n`
                setMessages((prev) =>
                  prev.map((m) => m.id === agentId ? { ...m, content: accumulated } : m)
                )
              } else if (event.type === 'done') {
                setMessages((prev) =>
                  prev.map((m) => m.id === agentId ? { ...m, content: event.content || accumulated } : m)
                )
              }
            } catch {}
          }
        }
        busy.current = false
      })
      .catch((err) => {
        setMessages((prev) =>
          prev.map((m) => m.id === agentId ? { ...m, content: `Error: ${err.message}` } : m)
        )
        busy.current = false
      })
  }, [])

  const firePrompt = useCallback(
    (text) => {
      sendMessage(text)
    },
    [sendMessage]
  )

  return { messages, typing, showChips, sendMessage, firePrompt }
}
