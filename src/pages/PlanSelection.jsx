import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card.jsx'
import { useApp } from '../contexts/AppContext.jsx'

const PLANS = [
  {
    name: 'Pique Gold',
    price: '$21/month',
    features: [
      'Unlimited features',
      'First-look access to new app features',
      'Seamless integration across fitness tools',
      '25% discount with training partner',
    ],
    tint: 'blue',
    pillTint: 'blue',
  },
  {
    name: 'Pique Silver',
    price: '$14/month',
    features: [
      'Up to 8 customizable features',
      'Seamless integration across fitness tools',
      'Free with training partner',
    ],
    tint: 'mint',
    pillTint: 'mint',
  },
  {
    name: 'Pique Bronze',
    price: 'FREE',
    features: [
      'Up to 5 customizable features',
      'Seamless integration across fitness tools',
    ],
    tint: 'graySoft',
    pillTint: 'graySoft',
  },
]

const PILL_BG = {
  blue: 'bg-tile-blue text-ink-900',
  mint: 'bg-tile-mint text-ink-900',
  graySoft: 'bg-tile-graySoft text-ink-900',
}

export default function PlanSelection() {
  const navigate = useNavigate()
  const { finishOnboarding, setPlan } = useApp()
  const [chosen, setChosen] = useState('Pique Gold')

  const confirm = () => {
    setPlan(chosen.replace('Pique ', ''))
    finishOnboarding()
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-paper px-6 pt-16 pb-32">
      <h1 className="text-2xl font-bold text-ink-900 mb-6 max-w-md">
        Based on your selections,<br />we recommend:
      </h1>

      <div className="max-w-md mx-auto space-y-2">
        {PLANS.map((p, i) => {
          const selected = chosen === p.name
          const [first, second] = p.name.split(' ')
          return (
            <div key={p.name}>
              {i === 1 && (
                <h2 className="text-sm font-bold text-ink-900 mt-4 mb-2">Additional Plans</h2>
              )}
              <Card tint={p.tint} className="flex gap-4 items-center py-6">
                <div className="w-28 shrink-0">
                  <div className="text-2xl font-bold leading-tight">{first}</div>
                  <div className="text-2xl font-bold leading-tight">{second}</div>
                </div>
                <div className="flex-1 text-sm space-y-1.5">
                  {p.features.map((f) => <div key={f}>{f}</div>)}
                  <div className="font-bold pt-1">{p.price}</div>
                </div>
              </Card>

              <div className="flex justify-center mt-3 mb-2">
                <button
                  onClick={() => setChosen(p.name)}
                  className={`rounded-full font-medium px-8 py-2.5 transition text-sm min-h-[40px] w-[220px] ${PILL_BG[p.pillTint]}`}
                >
                  {selected ? 'Select this plan' : ' '}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex justify-center pt-6">
        <button onClick={confirm} className="btn-primary text-2xl px-16 py-4 w-[260px]">Continue</button>
      </div>
    </div>
  )
}
