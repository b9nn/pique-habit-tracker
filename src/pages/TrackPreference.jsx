import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useApp } from '../contexts/AppContext.jsx'

const ALL = [
  'Top 5 Workouts', 'Workout Types',
  'Food Diary', 'Monthly Motivation', 'Joy List',
  'Habit Builder: 30 Day Fitness Challenge',
  'Rest Days', 'Fitness Bingo', 'Barriers Tracker',
  'Accomplishments', 'Progress Tracker',
  'Period Tracker', 'Water Tracker', 'Stress Tracker',
  'Goals',
]

export default function TrackPreference() {
  const navigate = useNavigate()
  const { state, update } = useApp()
  const [selected, setSelected] = useState(new Set(state.trackers))

  const toggle = (name) => {
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(name) ? next.delete(name) : next.add(name)
      return next
    })
  }

  const next = () => {
    update({ trackers: Array.from(selected) })
    navigate('/share-preference')
  }

  return (
    <div className="min-h-screen bg-paper px-6 pt-24 pb-32 flex flex-col">
      <h1 className="text-2xl font-bold text-ink-900 text-center mb-8">
        What would you like to track?
      </h1>
      <div className="flex flex-wrap gap-3 justify-center max-w-md mx-auto">
        {ALL.map((name) => {
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
