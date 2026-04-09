import { useChat } from './hooks/useChat'
import Header from './components/Header/Header'
import MetricsBar from './components/MetricsBar/MetricsBar'
import Sidebar from './components/Sidebar/Sidebar'
import ChatArea from './components/Chat/ChatArea'

export default function App() {
  const { messages, typing, showChips, sendMessage, firePrompt } = useChat()

  return (
    <>
      <Header />
      <MetricsBar firePrompt={firePrompt} />
      <div className="main">
        <Sidebar firePrompt={firePrompt} />
        <ChatArea
          messages={messages}
          typing={typing}
          showChips={showChips}
          sendMessage={sendMessage}
        />
      </div>
    </>
  )
}
