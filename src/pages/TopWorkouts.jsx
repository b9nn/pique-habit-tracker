import Layout from '../components/Layout.jsx'
import Card from '../components/Card.jsx'
import { useApp } from '../contexts/AppContext.jsx'

const BADGE = {
  mint: 'bg-brand-500 text-white',
  blue: 'bg-tile-blueSoft text-ink-900',
  gray: 'bg-tile-gray text-white',
  dark: 'bg-brand-ink text-white',
}

const CARD_TINT = {
  mint: 'mint',
  blue: 'blueSoft',
  gray: 'graySoft',
  dark: 'dark',
}

export default function TopWorkouts() {
  const { state } = useApp()
  return (
    <Layout title="Top 5 Workouts" withMenu>
      <div className="mt-4 space-y-5">
        {state.topWorkouts.map((w) => (
          <div key={w.rank} className="space-y-3">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${BADGE[w.tint]}`}>
                {String(w.rank).padStart(2, '0')}
              </div>
              <div>
                <div className="font-bold text-lg leading-tight">{w.name}</div>
                <div className="text-xs mt-0.5">{w.duration}</div>
              </div>
            </div>
            {w.expanded && w.body && (
              <Card tint={CARD_TINT[w.tint]} className="ml-14">
                <div className="font-bold mb-3">Why I Love It:</div>
                <p className="text-sm leading-relaxed">{w.body}</p>
              </Card>
            )}
          </div>
        ))}
      </div>
    </Layout>
  )
}
