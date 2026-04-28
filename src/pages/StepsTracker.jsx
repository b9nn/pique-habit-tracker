import Layout from '../components/Layout.jsx'
import Card from '../components/Card.jsx'
import { useApp } from '../contexts/AppContext.jsx'

function ShoeIcon({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="#0E1E16" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 32 C 6 24, 14 20, 22 22 L 40 26 C 44 27, 44 32, 39 33 L 8 34 Z" />
      <path d="M8 34 L 8 36 M 39 33 L 39 36" />
      <path d="M18 26 l-2 -3 M22 27 l-2 -3 M26 28 l-2 -3 M30 29 l-2 -3" />
    </svg>
  )
}

// Multi-segment donut: three arcs (green = progress, blue, dark)
function StepsRing({ pct }) {
  const size = 300
  const stroke = 56
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r

  const greenLen = Math.max(0.05, Math.min(0.95, pct)) * c
  const blueLen = c * 0.22
  const darkLen = c * 0.08
  const gap = c * 0.01

  // Offsets chosen so the segments sit where the Figma shows:
  // dark at lower-left, blue at bottom-left-ish, green spanning top-right
  const greenOffset = -c * 0.72
  const blueOffset = -c * 0.5
  const darkOffset = -c * 0.42

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#1F4130"
          strokeWidth={stroke}
          strokeDasharray={`${darkLen - gap} ${c}`}
          strokeDashoffset={darkOffset}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#C5E5EC"
          strokeWidth={stroke}
          strokeDasharray={`${blueLen - gap} ${c}`}
          strokeDashoffset={blueOffset}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#5EB788"
          strokeWidth={stroke}
          strokeDasharray={`${greenLen - gap} ${c}`}
          strokeDashoffset={greenOffset}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white rounded-full w-28 h-28 flex items-center justify-center">
          <ShoeIcon size={56} />
        </div>
      </div>
    </div>
  )
}

function WeekLineChart({ data }) {
  const w = 340
  const h = 160
  const padX = 20
  const padTop = 14
  const padBottom = 28
  const max = Math.max(1, ...data)
  const step = (w - padX * 2) / (data.length - 1)
  const points = data.map((v, i) => {
    const x = padX + i * step
    const y = padTop + (1 - v / max) * (h - padTop - padBottom)
    return { x, y }
  })
  const polyline = points.map((p) => `${p.x},${p.y}`).join(' ')
  const dows = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      {/* dashed baseline */}
      <line
        x1={padX - 6}
        x2={w - padX + 6}
        y1={padTop}
        y2={padTop}
        stroke="#0E1E16"
        strokeWidth="1"
        strokeDasharray="3 3"
        opacity="0.35"
      />
      {points.map((p, i) => (
        <text
          key={i}
          x={p.x}
          y={padTop - 4}
          fontSize="10"
          fill="#8A9992"
          textAnchor="middle"
        >
          {dows[i]}
        </text>
      ))}
      <polyline
        fill="none"
        stroke="#1F4130"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={polyline}
      />
    </svg>
  )
}

export default function StepsTracker() {
  const { state } = useApp()
  const { goal, today, week } = state.steps
  const pct = Math.min(1, today / goal)

  const toGo = Math.max(0, goal - today)
  const headline =
    toGo === 0
      ? 'Goal hit!'
      : toGo <= 3000
        ? "You're almost there!"
        : `You've got ${toGo.toLocaleString()} steps to go`
  const sub =
    toGo === 0
      ? 'Great work today!'
      : `Less than ${Math.ceil(toGo / 1000) * 1000} steps to go`

  return (
    <Layout title="Steps Tracker" withMenu>
      <h2 className="text-2xl font-bold mt-4 text-center">Step Goal: {goal.toLocaleString()}</h2>
      <div className="text-center">
        <button className="text-xs font-bold mt-1">Edit goal</button>
      </div>

      <div className="flex justify-center my-6">
        <StepsRing pct={pct} />
      </div>

      <h3 className="text-center text-2xl font-bold">{headline}</h3>
      <p className="text-center text-brand-500 font-bold mt-1">{sub}</p>

      <div className="grid grid-cols-3 gap-3 mt-6">
        <Card tint="mint" className="py-4 text-center">
          <div className="font-bold text-base">Av. Pace</div>
        </Card>
        <Card tint="blue" className="py-4 text-center">
          <div className="font-bold text-base">Av. Pace</div>
        </Card>
        <Card tint="gray" className="py-4 text-center">
          <div className="font-bold text-base">Av. Pace</div>
        </Card>
      </div>

      <div className="mt-6">
        <WeekLineChart data={week} />
      </div>
    </Layout>
  )
}
