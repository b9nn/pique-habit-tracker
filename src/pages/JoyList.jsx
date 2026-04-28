import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Layout from '../components/Layout.jsx'
import Modal from '../components/Modal.jsx'
import { useApp } from '../contexts/AppContext.jsx'

const BADGE = {
  mint: 'bg-brand-500 text-white',
  blue: 'bg-tile-blue text-ink-900',
  dark: 'bg-brand-ink text-white',
  gray: 'bg-tile-gray text-white',
}
const BAR = {
  mint: 'bg-tile-mint text-ink-900',
  blue: 'bg-tile-blue text-ink-900',
  dark: 'bg-tile-dark text-white',
  gray: 'bg-tile-gray text-white',
}

export default function JoyList() {
  const { state, addJoy } = useApp()
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')
  const [category, setCategory] = useState('People')

  const submit = (e) => {
    e.preventDefault()
    if (text.trim()) addJoy(text.trim())
    setText('')
    setOpen(false)
  }

  return (
    <Layout title="Joy List" withMenu>
      <div className="mt-4 space-y-2">
        {state.joyList.map((j) => (
          <div key={j.n} className="grid grid-cols-[56px_1fr] gap-2 items-stretch">
            <div className={`rounded-lg flex items-center justify-center font-bold text-lg ${BADGE[j.tint]}`}>
              {String(j.n).padStart(2, '0')}
            </div>
            <div className={`rounded-lg px-4 py-3 flex items-center ${BAR[j.tint]}`}>
              <span>{j.text}</span>
            </div>
          </div>
        ))}
        <div className="flex justify-end pt-1 pr-1 text-ink-500">
          <ChevronDown size={14} />
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={() => setOpen(true)}
          className="rounded-full bg-brand-ink text-white px-10 py-3 font-bold hover:brightness-110 transition"
        >
          Add Entry
        </button>
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <form onSubmit={submit} className="space-y-4">
          <h3 className="font-bold text-lg">What are you grateful for today?</h3>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type here"
            rows={4}
            className="w-full rounded-lg border-2 border-white/40 bg-transparent px-4 py-3 placeholder-white/60 focus:outline-none focus:border-white/80"
          />
          <div>
            <label className="block font-bold mb-2">Select category:</label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-full border-2 border-white/60 bg-transparent px-4 py-2 text-white appearance-none focus:outline-none"
              >
                <option className="text-ink-900">People</option>
                <option className="text-ink-900">Things</option>
                <option className="text-ink-900">Moments</option>
                <option className="text-ink-900">Places</option>
              </select>
              <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
          <blockquote className="text-sm">
            <p>"Be mindful. Be grateful. Be positive. Be true. Be kind."</p>
            <p className="text-xs mt-2">— Roy T. Bennett,</p>
          </blockquote>
          <div className="flex justify-center pt-1">
            <button type="submit" className="rounded-full bg-brand-500 text-white px-8 py-2 font-bold">
              Save
            </button>
          </div>
        </form>
      </Modal>
    </Layout>
  )
}
