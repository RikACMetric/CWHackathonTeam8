import './Chat.css'
import ChatHero from './ChatHero'
import ChatMessages from './ChatMessages'
import PromptChips from './PromptChips'
import ChatInput from './ChatInput'

export default function ChatArea({ messages, typing, showChips, sendMessage }) {
  return (
    <div className="chat-area">
      <div className="chat-main">
        {showChips && <ChatHero />}
        <ChatMessages messages={messages} typing={typing} showHero={showChips} />
        {showChips && <PromptChips onSend={sendMessage} />}
      </div>
      <ChatInput onSend={sendMessage} disabled={typing} />
    </div>
  )
}
