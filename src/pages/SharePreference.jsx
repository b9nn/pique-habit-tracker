import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const SHARE_OPTIONS = [
  'Personal Trainer', 'Nutritionist',
  'Doctor', 'Therapist', 'Coach',
  'Training Partner',
  'Best Friend', 'Family Member', 'Significant Other',
  'Workout Group', 'Online Community',
  'Wellness Circle', 'Accountability Buddy',
  'No One',
]

export default function SharePreference() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(new Set())

  const toggle = (name) => {
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(name) ? next.delete(name) : next.add(name)
      return next
    })
  }

  const next = () => {
    navigate('/plan-selection')
  }

  return (
    <div className="min-h-screen bg-paper px-6 pt-24 pb-32 flex flex-col">
      <h1 className="text-2xl font-bold text-ink-900 text-center mb-8">
        Who would you like to share with?
      </h1>
      <div className="flex flex-wrap gap-3 justify-center max-w-md mx-auto">
        {SHARE_OPTIONS.map((name) => {
          const on = selected.has(name)
          return (
            <button
              key={name}
              onClick={() => toggle(name)}
              className={`pill ${on ? 'pill-selected' : ''}`}
            >
              {name}
            </button>
          )
        })}
      </div>
      <div className="flex-1" />
      <div className="flex justify-center pt-10">
        <button onClick={next} className="btn-primary text-2xl px-16 py-4 w-[260px]">Continue</button>
      </div>
    </div>
  )
}
