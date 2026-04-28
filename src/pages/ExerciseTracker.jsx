import { useState } from 'react'
import { Plus, ChevronDown } from 'lucide-react'
import Layout from '../components/Layout.jsx'
import Card from '../components/Card.jsx'
import Modal from '../components/Modal.jsx'
import { useApp } from '../contexts/AppContext.jsx'

const WORKOUT_OPTIONS = [
  'Outdoor Run',
  'Elliptical',
  'Indoor Bike',
  'Yoga',
  'Kickboxing',
  'Indoor Cycle',
  'Outdoor Walk',
]

export default function ExerciseTracker() {
  const { state, setState } = useApp()
  const [open, setOpen] = useState(false)
  const [dropOpen, setDropOpen] = useState(false)
  const [form, setForm] = useState({ name: '', duration: '', calories: '', hr: '' })

  const submit = (e) => {
    e.preventDefault()
    if (!form.name) return
    setState((s) => ({
      ...s,
      workouts: [
        {
          id: `w_${Date.now()}`,
          name: form.name,
          duration: Number(form.duration) || 0,
          hr: Number(form.hr) || 0,
          active: Number(form.calories) || 0,
          total: Number(form.calories) || 0,
          tint: ['mint', 'blue', 'gray'][s.workouts.length % 3],
          lastDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        },
        ...s.workouts,
      ],
    }))
    setOpen(false)
    setDropOpen(false)
    setForm({ name: '', duration: '', calories: '', hr: '' })
  }

  return (
    <Layout title="Exercise Tracker" withMenu>
      <div className="space-y-4 mt-4">
        {state.workouts.map((w) => (
          <Card key={w.id} tint={w.tint} className="grid grid-cols-[1.1fr_1fr] gap-3">
            <div>
              <div className="text-lg font-bold leading-tight">{w.name}</div>
              <div className="text-sm mt-2 leading-snug">
                <div>Workout Time: {w.duration} mins.</div>
                <div>Av. Heart Rate: {w.hr} BPM</div>
                {w.distance && <div>Distance: {w.distance}km</div>}
              </div>
              <button className="mt-4 text-sm font-medium inline-flex items-center gap-1">
                <Plus size={16} strokeWidth={2.5} /> Add Effort
              </button>
            </div>
            <div className="text-xs leading-tight">
              <div className="text-right">Last Workout: {w.lastDate}</div>
              <div className="mt-3 text-sm">
                <div className="font-bold">Calories Burned:</div>
                <div>Active: {w.active}</div>
                <div>Total: {w.total}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <button onClick={() => setOpen(true)} className="btn-primary">Add New Workout</button>
      </div>

      <Modal open={open} onClose={() => { setOpen(false); setDropOpen(false) }} tint="brand">
        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block font-bold mb-2">What workout did you do?</label>
            <div className="rounded-2xl border border-white/70 p-1.5">
              <button
                type="button"
                onClick={() => setDropOpen((o) => !o)}
                className="w-full rounded-full border border-white/70 px-4 py-2 flex items-center justify-between text-left"
              >
                <span className={`font-bold ${form.name ? 'text-white' : 'text-white/70'}`}>
                  {form.name || 'Choose workout'}
                </span>
                <ChevronDown size={16} className={`transition ${dropOpen ? 'rotate-180' : ''}`} />
              </button>
              {dropOpen && (
                <ul className="mt-2 px-3 pb-1 space-y-1.5 text-white">
                  {WORKOUT_OPTIONS.map((opt) => (
                    <li key={opt}>
                      <button
                        type="button"
                        onClick={() => { setForm({ ...form, name: opt }); setDropOpen(false) }}
                        className="w-full text-left py-1"
                      >
                        {opt}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div>
            <label className="block font-bold mb-2">How long did you workout for?</label>
            <input
              type="number" placeholder="Type here"
              className="w-full rounded-full bg-transparent border border-white/70 px-4 py-2 text-white placeholder-white/70 focus:outline-none"
              value={form.duration}
              onChange={(e) => setForm({ ...form, duration: e.target.value })}
            />
          </div>
          <div>
            <label className="block font-bold mb-2">How many calories did you burn?</label>
            <input
              type="number" placeholder="Type here"
              className="w-full rounded-full bg-transparent border border-white/70 px-4 py-2 text-white placeholder-white/70 focus:outline-none"
              value={form.calories}
              onChange={(e) => setForm({ ...form, calories: e.target.value })}
            />
          </div>
          <div>
            <label className="block font-bold mb-2">What was your average heart rate?</label>
            <input
              type="number" placeholder="Type here"
              className="w-full rounded-full bg-transparent border border-white/70 px-4 py-2 text-white placeholder-white/70 focus:outline-none"
              value={form.hr}
              onChange={(e) => setForm({ ...form, hr: e.target.value })}
            />
          </div>
          <div className="flex justify-between text-sm font-bold pt-1">
            <button type="button">Enter manually</button>
            <button type="button">Sync with device</button>
          </div>
          <div className="flex justify-center pt-1">
            <button type="submit" className="btn-primary">Add New Workout</button>
          </div>
        </form>
      </Modal>
    </Layout>
  )
}
