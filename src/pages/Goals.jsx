import { ArrowRight } from 'lucide-react'
import Layout from '../components/Layout.jsx'
import Card from '../components/Card.jsx'
import { useApp } from '../contexts/AppContext.jsx'

const BTN_FOR = {
  mint: 'bg-brand-500 text-white',
  dark: 'bg-brand-ink text-white',
  blue: 'bg-tile-blue text-ink-900',
  gray: 'bg-tile-gray text-white',
}

function Heading({ kind }) {
  const k = kind.toLowerCase()
  if (k.includes('yearly')) {
    return (
      <div className="leading-none">
        <div className="font-script text-3xl">yearly goal</div>
        <div className="font-script text-2xl -mt-1">yearly goal</div>
      </div>
    )
  }
  if (k.includes('monthly')) {
    return <div className="font-bold text-lg lowercase">monthly goal</div>
  }
  return <div className="font-bold text-lg">{kind}</div>
}

function ReachedText({ kind }) {
  const k = kind.toLowerCase()
  if (k.includes('daily')) return 'daily'
  if (k.includes('weekly')) return 'weekly'
  if (k.includes('monthly')) return 'daily'
  return 'weekly'
}

export default function Goals() {
  const { state } = useApp()
  return (
    <Layout title="Goals">
      <div className="space-y-6 mt-4">
        {state.goals.map((g, i) => {
          const cardLeft = i % 2 === 0
          const card = (
            <Card tint={g.tint}>
              <div className="flex items-start justify-between">
                <Heading kind={g.kind} />
                <ArrowRight size={18} className="shrink-0 mt-1" />
              </div>
              <p className="mt-4 text-sm">{g.text}</p>
              <div className="flex items-center justify-between mt-5 text-xs">
                <button className="font-bold">Share</button>
                <button className="font-bold">Edit</button>
              </div>
            </Card>
          )
          const reached = ReachedText({ kind: g.kind })
          const info = (
            <div className="text-sm py-2">
              <p>You've reached your {reached} goal</p>
              <p className="my-3">{g.streak}</p>
              <p>Keep it up!</p>
              <button className={`mt-3 rounded-full px-5 py-2 text-sm font-bold ${BTN_FOR[g.tint]}`}>
                Add new goal
              </button>
            </div>
          )
          return (
            <div key={g.kind} className="grid grid-cols-2 gap-3 items-start">
              {cardLeft ? (
                <>
                  {card}
                  {info}
                </>
              ) : (
                <>
                  {info}
                  {card}
                </>
              )}
            </div>
          )
        })}
      </div>
    </Layout>
  )
}
