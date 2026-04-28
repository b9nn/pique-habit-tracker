import { Moon, Bed } from 'lucide-react'
import Layout from '../components/Layout.jsx'
import Card from '../components/Card.jsx'
import { useApp } from '../contexts/AppContext.jsx'

function SleepScoreArc({ value = 54, size = 110 }) {
  const stroke = 6
  const r = (size - stroke) / 2
  const cx = size / 2
  const cy = size / 2
  // Three-quarter arc from 135deg to 405deg (bottom-open C shape)
  const start = 135
  const end = 405
  const totalDeg = end - start
  const pct = Math.max(0, Math.min(100, value)) / 100
  const arcDeg = totalDeg * pct

  const polar = (deg) => {
    const rad = (deg * Math.PI) / 180
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
  }
  const p0 = polar(start)
  const p1 = polar(start + arcDeg)
  const pEnd = polar(end)
  const large = arcDeg > 180 ? 1 : 0
  const largeBg = totalDeg > 180 ? 1 : 0

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <path
        d={`M ${p0.x} ${p0.y} A ${r} ${r} 0 ${largeBg} 1 ${pEnd.x} ${pEnd.y}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.4"
        strokeWidth={stroke}
        strokeLinecap="round"
      />
      <path
        d={`M ${p0.x} ${p0.y} A ${r} ${r} 0 ${large} 1 ${p1.x} ${p1.y}`}
        fill="none"
        stroke="#0E1E16"
        strokeWidth={stroke}
        strokeLinecap="round"
      />
      <text
        x={cx}
        y={cy + 5}
        textAnchor="middle"
        fontSize="18"
        fontWeight="700"
        fill="#0E1E16"
      >
        {value}%
      </text>
    </svg>
  )
}

export default function RestDays() {
  const { state, toggleRestItem } = useApp()
  const r = state.restDays

  return (
    <Layout title="Rest Days" withMenu>
      <Card tint="blue" className="mt-3">
        <div className="font-script text-2xl text-ink-900 leading-none">friendly reminder</div>
        <p className="mt-3 text-sm">
          Rest days are a crucial part of any fitness routine because they're when your body actually recovers and gets stronger.
        </p>
        <p className="mt-2 text-sm">Use them to your advantage.</p>
      </Card>

      <div className="grid grid-cols-[1fr_1.25fr] gap-3 mt-3">
        <Card tint="mint" className="p-4">
          <div className="flex items-center gap-2 font-bold mb-2">
            <Bed size={18} /> Sleep Score
          </div>
          <div className="flex justify-center my-1">
            <SleepScoreArc value={r.sleep.score} />
          </div>
          <div className="text-xs mt-2 space-y-1.5">
            <div><b>Duration:</b> {r.sleep.duration}</div>
            <div><b>Interruptions:</b></div>
            <div>{r.sleep.interruptions}</div>
            <div className="font-bold mt-2">Factors Impacting Your Score:</div>
            <div>{r.sleep.factors}</div>
          </div>
        </Card>

        <Card tint="dark" className="p-4">
          <div className="flex items-center gap-2 font-bold mb-3">
            <Moon size={18} /> Rest Day Checklist
          </div>
          <ul className="space-y-2.5 text-sm">
            {r.checklist.map((it, i) => (
              <li key={i} className="flex items-start gap-2">
                <button
                  onClick={() => toggleRestItem(i)}
                  aria-label={it.text}
                  className={`mt-0.5 w-4 h-4 rounded-full shrink-0 border-2 border-white ${it.done ? 'bg-white' : 'bg-transparent'}`}
                />
                <span className="leading-snug">{it.text}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card tint="blue" className="mt-3">
        <div className="text-sm">
          <b>Current Rest Day:</b><br />
          {r.current}
        </div>
        <div className="text-sm mt-3">
          <b>Rest Day Score:</b><br />
          {r.score}
        </div>
      </Card>
    </Layout>
  )
}
