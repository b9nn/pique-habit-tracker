import { Link } from 'react-router-dom'
import { ArrowUp, CornerUpRight, Bed } from 'lucide-react'
import Layout from '../components/Layout.jsx'
import Card from '../components/Card.jsx'
import { useApp } from '../contexts/AppContext.jsx'

function ActivityRings() {
  return (
    <div className="relative w-[180px] h-[180px]">
      <svg width="180" height="180" viewBox="0 0 180 180" className="-rotate-90">
        {/* outer blue ring */}
        <circle cx="90" cy="90" r="78" fill="none" stroke="#C5E5EC" strokeWidth="14" />
        <circle
          cx="90" cy="90" r="78" fill="none" stroke="#A4D6DF" strokeWidth="14"
          strokeDasharray={2 * Math.PI * 78}
          strokeDashoffset={2 * Math.PI * 78 * 0.35}
          strokeLinecap="round"
        />
        {/* middle mint ring */}
        <circle cx="90" cy="90" r="58" fill="none" stroke="#D6EEDE" strokeWidth="14" />
        <circle
          cx="90" cy="90" r="58" fill="none" stroke="#5EB788" strokeWidth="14"
          strokeDasharray={2 * Math.PI * 58}
          strokeDashoffset={2 * Math.PI * 58 * 0.2}
          strokeLinecap="round"
        />
        {/* inner dark disc */}
        <circle cx="90" cy="90" r="40" fill="#3D5C4E" />
        {/* center gray dot */}
        <circle cx="90" cy="90" r="14" fill="#A9A9A9" />
      </svg>
      {/* outer curve arrow (top-right) */}
      <div className="absolute top-1 right-3 text-ink-900">
        <CornerUpRight size={18} strokeWidth={2.25} />
      </div>
      {/* middle up arrow (just above dark disc) */}
      <div className="absolute inset-0 flex items-start justify-center pt-[38px]">
        <ArrowUp size={20} className="text-white" strokeWidth={2.25} />
      </div>
    </div>
  )
}

export default function Dashboard() {
  const { state, setDayPlanStatus } = useApp()
  const { plan, sleep, heartRate, lookingAhead } = state

  return (
    <Layout showTab={false}>
      {/* Motivation banner */}
      <section className="-mx-5 bg-brand-ink text-white px-6 py-5">
        <div className="text-2xl font-bold">Motivation</div>
        <p className="text-white/90 mt-1">Consistency matters more than anything else</p>
      </section>

      {/* Activity ring + Plan card */}
      <section className="grid grid-cols-[180px_1fr] gap-3 mt-6 items-start">
        <div className="flex items-center justify-center">
          <ActivityRings />
        </div>

        <Card tint="mint" className="p-5">
          <h3 className="text-xl font-bold leading-tight">
            Your Plan for<br />Today:
          </h3>
          <div className="mt-3 text-sm space-y-1">
            <div className="font-bold">{plan.activity}:</div>
            <div>{plan.location}</div>
            <div>Duration: {plan.duration}</div>
          </div>
          <div className="flex justify-between items-end mt-5 text-sm font-bold">
            <button
              onClick={() => setDayPlanStatus('made')}
              className={`transition ${plan.status === 'made' ? 'underline' : 'hover:underline'}`}
            >
              I made it!
            </button>
            <button
              onClick={() => setDayPlanStatus('missed')}
              className={`transition ${plan.status === 'missed' ? 'underline' : 'hover:underline'}`}
            >
              I missed it.
            </button>
          </div>
          <div className="flex justify-between items-end mt-1.5 text-xs">
            <button className="hover:underline">Share</button>
            <button className="hover:underline font-bold">Edit</button>
          </div>
        </Card>
      </section>

      {/* Sleep + Heart Rate */}
      <section className="grid grid-cols-2 gap-3 mt-4">
        <Link to="/rest" className="block">
          <Card tint="gray" className="py-5 px-5 h-full">
            <div className="font-bold text-lg">Sleep Score:</div>
            <div className="flex items-center gap-3 mt-3">
              <Bed size={34} strokeWidth={1.75} />
              <span className="text-3xl font-bold">{sleep.score}%</span>
            </div>
          </Card>
        </Link>
        <Card tint="blue" className="py-5 px-5 h-full">
          <div className="font-bold text-lg">Heart Rate:</div>
          <div className="flex items-center gap-3 mt-3">
            <HeartPulseIcon />
            <span className="text-2xl font-bold">{heartRate} BPM</span>
          </div>
        </Card>
      </section>

      {/* Looking Ahead */}
      <section className="mt-6">
        <div className="flex items-baseline justify-between mb-3">
          <h3 className="font-bold text-lg text-ink-900">Looking Ahead:</h3>
          <button className="text-xs font-bold hover:underline">Edit</button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {lookingAhead.map((d) => (
            <Card key={d.day} tint={d.tint} className="p-3 min-h-[120px] flex flex-col">
              <div className="text-xs">April</div>
              <div className="font-script text-3xl leading-none mt-0.5">{d.day}</div>
              <div className="mt-2 text-sm font-bold leading-tight flex-1">{d.label}</div>
              {d.detail && <div className="text-xs mt-0.5">{d.detail}</div>}
              <div className="text-[11px] text-right mt-1 font-bold">Edit</div>
            </Card>
          ))}
        </div>
      </section>
    </Layout>
  )
}

// Inline heart-with-pulse icon matching the Figma "heart rate" glyph.
function HeartPulseIcon({ size = 30 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      <path d="M3.5 12h3l2-3 3 5 2-2h7" />
    </svg>
  )
}
