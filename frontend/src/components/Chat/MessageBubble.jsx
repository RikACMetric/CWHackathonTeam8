export default function MessageBubble({ role, content, time }) {
  const isAgent = role === 'agent'

  return (
    <div className={`msg${isAgent ? '' : ' user'}`}>
      <div className={`msg-ava ${isAgent ? 'agent-ava' : 'user-ava-sm'}`}>
        {isAgent ? 'CC' : 'NN'}
      </div>
      <div className="msg-body">
        <div className="msg-meta" style={isAgent ? undefined : { textAlign: 'right' }}>
          {isAgent ? `CargoClaw · ${time}` : `You · ${time}`}
        </div>
        {isAgent ? (
          // Agent responses are internally generated HTML — safe to render
          <div
            className="bubble"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <div className="bubble">{content}</div>
        )}
      </div>
    </div>
  )
}
