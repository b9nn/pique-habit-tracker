import { Star } from 'lucide-react'
import Layout from '../components/Layout.jsx'
import { useApp } from '../contexts/AppContext.jsx'

const TINT_BG = {
  mint: 'bg-tile-mint text-ink-900',
  dark: 'bg-brand-ink text-white',
  blue: 'bg-tile-blue text-ink-900',
  gray: 'bg-tile-gray text-white',
  muted: 'bg-tile-muted text-ink-900',
}

export default function FitnessBingo() {
  const { state, toggleBingoCell } = useApp()
  const b = state.bingo
  const complete = b.cells.every((c) => c.done)

  return (
    <Layout title="Fitness Bingo">
      <section className="-mx-5 bg-brand-ink text-white px-6 py-5 mt-2">
        <div className="text-2xl font-bold">{b.month}</div>
        <div className="text-white/90">{b.daysRemaining} days remaining</div>
      </section>

      {complete ? (
        <div className="mt-8">
          <div className="bg-brand-ink text-white rounded-2xl px-6 py-16 flex flex-col items-center text-center">
            <div className="text-2xl font-bold">Congratulations!</div>
            <div className="mt-4 text-lg">You've earned your reward!</div>
            <Star size={56} strokeWidth={2} className="mt-6 text-white" fill="none" />
            {b.daysRemaining <= 2 && (
              <div className="mt-6 text-base">See you next month</div>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="mt-5 text-sm font-bold">Edit Fitness Bingo</div>

          <div className="grid grid-cols-4 gap-1.5 mt-3">
            {b.cells.map((cell, i) => (
              <button
                key={i}
                onClick={() => toggleBingoCell(i)}
                className={`relative aspect-square flex items-center justify-center text-center text-[11px] leading-tight font-bold p-2 ${TINT_BG[cell.tint]}`}
              >
                <span className={cell.done ? 'opacity-40' : ''}>{cell.text}</span>
                {cell.done && (
                  <Star
                    size={40}
                    strokeWidth={2}
                    className="absolute text-white drop-shadow"
                    fill="none"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="mt-8">
            <div className="font-script text-brand-500 text-4xl leading-none">reward</div>
            <div className="mt-1 text-lg">{b.reward}</div>
            <button className="text-xs font-bold mt-2">Edit my reward</button>
          </div>
        </>
      )}
    </Layout>
  )
}
