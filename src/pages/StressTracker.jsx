import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Layout from '../components/Layout.jsx'
import Modal from '../components/Modal.jsx'
import MoodIcon, { MOODS } from '../components/MoodIcon.jsx'
import { useApp } from '../contexts/AppContext.jsx'

const DAYS_IN_APRIL = 30
const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const FACTORS = ['Work', 'Fitness', 'Family', 'Food', 'Sleep', 'Relationships']

export default function StressTracker() {
  const { state, setStressMood } = useApp()
  const entries = state.stress.entries
  const [open, setOpen] = useState(false)
  const [selDay, setSelDay] = useState(null)
  const [selMood, setSelMood] = useState('happy')
  const [selFactor, setSelFactor] = useState('Work')
  const [factorOpen, setFactorOpen] = useState(false)

  // April 2026 starts on a Wednesday (index 3)
  const firstDow = 3
  const cells = []
  for (let i = 0; i < firstDow; i++) cells.push(null)
  for (let d = 1; d <= DAYS_IN_APRIL; d++) cells.push(d)

  const openFor = (d) => {
    setSelDay(d)
    setSelMood(entries[d] || 'happy')
    setSelFactor('Work')
    setFactorOpen(false)
    setOpen(true)
  }

  const save = () => {
    if (selDay) setStressMood(selDay, selMood)
    setOpen(false)
  }

  const moodLabel = {
    happy: "I'm feeling\ngreat",
    okay: "I'm feeling\nokay",
    sad: "I'm feeling\nsad",
    stressed: "I'm feeling\nstressed",
    angry: "I'm feeling\nangry",
  }

  return (
    <Layout title="Stress Tracker" withMenu>
      <div className="mt-2">
        <div className="text-center font-bold text-brand-500 text-2xl">{state.stress.month}</div>

        <div className="grid grid-cols-7 mt-2 text-center text-sm">
          {DOW.map((d) => (
            <div key={d} className="py-1 text-ink-900">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 border-t border-ink-900/15">
          {cells.map((d, i) => (
            <div
              key={i}
              className="aspect-square border-b border-r border-ink-900/15 relative cursor-pointer hover:bg-tile-muted/60"
              style={{ borderLeft: i % 7 === 0 ? '1px solid rgba(14,30,22,0.15)' : 'none' }}
              onClick={() => d && openFor(d)}
            >
              {d && (
                <span className="absolute top-1 right-1 text-xs">{d}</span>
              )}
              {d && entries[d] && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <MoodIcon mood={entries[d]} size={30} />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => openFor(new Date().getDate())}
            className="rounded-full bg-brand-500 text-white px-10 py-3 font-bold hover:brightness-95 transition"
          >
            Add Entry
          </button>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} tint="brand">
        <h3 className="font-bold text-lg mb-4">How are you feeling today?</h3>

        <div className="flex items-center justify-center gap-3 mb-2">
          {MOODS.slice(0, 5).map((m) => {
            const isSel = m === selMood
            return (
              <button
                key={m}
                onClick={() => setSelMood(m)}
                className={`rounded-full transition flex items-center justify-center ${isSel ? 'bg-white w-14 h-14' : 'w-10 h-10 opacity-80'}`}
                style={!isSel ? { filter: 'brightness(0) invert(1)' } : undefined}
                aria-label={m}
              >
                <MoodIcon mood={m} size={isSel ? 48 : 36} />
              </button>
            )
          })}
        </div>
        <div className="text-center text-sm text-white/90 mb-6 whitespace-pre-line min-h-[2.4em]">
          {moodLabel[selMood]}
        </div>

        <div className="font-bold mb-2">What factors are impacting your mood?</div>
        <div className="border border-white/70 rounded-xl overflow-hidden">
          <button
            type="button"
            onClick={() => setFactorOpen((v) => !v)}
            className="w-full flex items-center justify-between px-4 py-2 font-bold"
          >
            <span>{selFactor}</span>
            <ChevronDown size={16} className={factorOpen ? 'rotate-180 transition' : 'transition'} />
          </button>
          {factorOpen && (
            <div className="border-t border-white/30">
              {FACTORS.filter((f) => f !== selFactor).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => { setSelFactor(f); setFactorOpen(false) }}
                  className="w-full text-left px-4 py-2 hover:bg-white/10"
                >
                  {f}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={save}
            className="rounded-full bg-white text-brand-500 px-10 py-2.5 font-bold hover:brightness-95 transition"
          >
            Done
          </button>
        </div>
      </Modal>
    </Layout>
  )
}
