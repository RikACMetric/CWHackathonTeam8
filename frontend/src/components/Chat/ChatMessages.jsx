import { useEffect, useRef } from 'react'
import MessageBubble from './MessageBubble'
import TypingIndicator from './TypingIndicator'

export default function ChatMessages({ messages, typing, showHero = false }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  return (
    <div className={`chat-messages${showHero ? ' chat-messages--with-hero' : ''}`}>
      {messages.map((msg) => (
        <MessageBubble key={msg.id} role={msg.role} content={msg.content} time={msg.time} />
      ))}
      {typing && <TypingIndicator />}
      <div ref={bottomRef} />
    </div>
  )
}
