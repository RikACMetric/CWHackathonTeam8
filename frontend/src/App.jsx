import { useState } from 'react'
import { useChat } from './hooks/useChat'
import Header from './components/Header/Header'
import ChatArea from './components/Chat/ChatArea'
import Counterfactual from './components/Counterfactual/Counterfactual'

export default function App() {
  const { messages, typing, showChips, sendMessage, firePrompt } = useChat()
  const [page, setPage] = useState('chat')

  return (
    <>
      <Header page={page} onShowChat={() => setPage('chat')} onShowCF={() => setPage('cf')} />
      <div className="main">
        {page === 'cf' ? (
          <Counterfactual />
        ) : (
          <ChatArea
            messages={messages}
            typing={typing}
            showChips={showChips}
            sendMessage={sendMessage}
          />
        )}
      </div>
    </>
  )
}
