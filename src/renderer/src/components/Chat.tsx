import Chat, { Bubble, useMessages } from '@chatui/core'
import type { MessageId, MessageProps } from '@chatui/core/lib/components/Message'
import '@chatui/core/dist/index.css'

type MessageWithoutId = Omit<MessageProps, '_id'> & {
  _id?: MessageId
}

function App(): JSX.Element {
  const { messages, appendMsg, setTyping } = useMessages([])

  function handleSend(type: string, val: string): void {
    if (type === 'text' && val.trim()) {
      appendMsg({
        type: 'text',
        content: { text: val },
        position: 'right'
      })

      setTyping(true)

      // 搜索音乐/图片等返回
      setTimeout(() => {
        appendMsg({
          type: 'text',
          content: { text: 'Bala bala' }
        })
      }, 1000)
    }
  }

  function renderMessageContent(msg: MessageWithoutId): JSX.Element {
    const { content } = msg
    return <Bubble content={content.text} />
  }

  return (
    <Chat
      navbar={{ title: '音悦台' }}
      messages={messages}
      renderMessageContent={renderMessageContent}
      onSend={handleSend}
    />
  )
}

export default App
