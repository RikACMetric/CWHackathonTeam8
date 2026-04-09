import './Chat.css'
import ChatHero from './ChatHero'
import ChatMessages from './ChatMessages'
import PromptChips from './PromptChips'
import ChatInput from './ChatInput'

export default function ChatArea({ messages, typing, showChips, sendMessage }) {
  const onlyWelcome =
    messages.length === 1 && messages[0]?.id === 'welcome'
  const showLanding = onlyWelcome || showChips

  return (
    <div className="chat-area">
      <div className="chat-main">
        {showLanding && <ChatHero />}
        <ChatMessages messages={messages} typing={typing} showHero={showLanding} />
        {showLanding && <PromptChips onSend={sendMessage} />}
      </div>
      <ChatInput onSend={sendMessage} disabled={typing} />
    </div>
  )
}
