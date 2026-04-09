import './Chat.css'
import ChatMessages from './ChatMessages'
import PromptChips from './PromptChips'
import ChatInput from './ChatInput'

export default function ChatArea({ messages, typing, showChips, sendMessage }) {
  return (
    <div className="chat-area">
      <ChatMessages messages={messages} typing={typing} />
      {showChips && <PromptChips onSend={sendMessage} />}
      <ChatInput onSend={sendMessage} disabled={typing} />
    </div>
  )
}
