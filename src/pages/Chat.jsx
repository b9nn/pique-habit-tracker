import { useEffect, useRef, useState } from 'react'
import Layout from '../components/Layout.jsx'
import { useApp } from '../contexts/AppContext.jsx'

export default function Chat() {
  const { state, sendMessage } = useApp()
  const [text, setText] = useState('')
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [state.chat.messages.length])

  const submit = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    sendMessage(text.trim())
    setText('')
  }

  const userInitial = state.user.firstName?.charAt(0) ?? 'D'

  return (
    <Layout title="Chat" withMenu menuPosition="left">
      <div
        ref={scrollRef}
        className="mt-2 space-y-3 max-h-[54vh] overflow-y-auto pr-1"
      >
        {state.chat.messages.map((m, i) => {
          const me = m.from === 'me'
          return (
            <div
              key={i}
              className={`flex ${me ? 'justify-end' : 'justify-start'} items-end gap-2`}
            >
              {!me && (
                <div className="w-8 h-8 rounded-full bg-tile-blue text-ink-900 font-bold text-[11px] flex items-center justify-center shrink-0">
                  {state.chat.partnerInitials}
                </div>
              )}
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-snug ${
                  me
                    ? 'bg-tile-mint text-ink-900 rounded-br-md'
                    : 'bg-tile-blue text-ink-900 rounded-bl-md'
                }`}
              >
                {m.text}
              </div>
              {me && (
                <div className="w-8 h-8 rounded-full bg-tile-graySoft shrink-0 flex items-center justify-center text-ink-900 font-bold text-[11px] overflow-hidden">
                  {userInitial}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <form onSubmit={submit} className="mt-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message here..."
          rows={3}
          className="w-full rounded-2xl bg-tile-graySoft px-4 py-3 placeholder-ink-500/70 text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-500/40 resize-none"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              submit(e)
            }
          }}
        />
      </form>
    </Layout>
  )
}
