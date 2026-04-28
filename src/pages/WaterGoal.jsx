import { useState, useRef, useEffect } from 'react'
import { Pencil, RotateCcw, MoreVertical } from 'lucide-react'
import Layout from '../components/Layout.jsx'
import { useApp } from '../contexts/AppContext.jsx'

function Bottle({ goal, filled, onTapSegment }) {
  const width = 220
  const height = 400
  const capH = 18
  const neckH = 28
  const shoulderH = 34
  const bodyTop = capH + neckH
  const shoulderBottom = bodyTop + shoulderH
  const bottomY = height - 4
  const bodyBottomCurve = 18
  const bodyInnerTop = shoulderBottom + 4
  const bodyInnerHeight = bottomY - bodyBottomCurve - bodyInnerTop
  const segH = bodyInnerHeight / goal
  const stroke = '#B8DDE4'
  const fill = '#C5E5EC'

  const leftX = width * 0.14
  const rightX = width * 0.86
  const innerLeftX = width * 0.18
  const innerRightX = width * 0.82

  const bodyPath = `
    M ${leftX},${shoulderBottom}
    L ${leftX},${bottomY - bodyBottomCurve}
    Q ${leftX},${bottomY} ${leftX + bodyBottomCurve},${bottomY}
    L ${rightX - bodyBottomCurve},${bottomY}
    Q ${rightX},${bottomY} ${rightX},${bottomY - bodyBottomCurve}
    L ${rightX},${shoulderBottom}
    Q ${rightX},${bodyTop} ${rightX - 18},${bodyTop}
    L ${leftX + 18},${bodyTop}
    Q ${leftX},${bodyTop} ${leftX},${shoulderBottom}
    Z
  `

  const fillFraction = Math.max(0, Math.min(goal, filled)) / goal
  const fillTop = bottomY - bodyBottomCurve - (bodyInnerHeight + 4) * fillFraction
  const fillClipPath = `
    M ${leftX + 3},${Math.max(shoulderBottom, fillTop)}
    L ${leftX + 3},${bottomY - bodyBottomCurve}
    Q ${leftX + 3},${bottomY - 3} ${leftX + bodyBottomCurve},${bottomY - 3}
    L ${rightX - bodyBottomCurve},${bottomY - 3}
    Q ${rightX - 3},${bottomY - 3} ${rightX - 3},${bottomY - bodyBottomCurve}
    L ${rightX - 3},${Math.max(shoulderBottom, fillTop)}
    Z
  `

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <clipPath id="bottle-body-clip">
          <path d={bodyPath} />
        </clipPath>
      </defs>

      {/* cap */}
      <rect
        x={width * 0.34}
        y={2}
        width={width * 0.32}
        height={capH}
        rx="3"
        fill="none"
        stroke={stroke}
        strokeWidth="3"
      />
      {/* neck */}
      <path
        d={`M ${width * 0.3},${capH + 2} L ${width * 0.3},${bodyTop - 2} M ${width * 0.7},${capH + 2} L ${width * 0.7},${bodyTop - 2}`}
        fill="none"
        stroke={stroke}
        strokeWidth="3"
      />

      {/* body outline */}
      <path d={bodyPath} fill="none" stroke={stroke} strokeWidth="3" strokeLinejoin="round" />

      {/* water fill */}
      <g clipPath="url(#bottle-body-clip)">
        {fillFraction > 0 && (
          <path d={fillClipPath} fill={fill} style={{ transition: 'all .4s ease' }} />
        )}
      </g>

      {/* segment divider lines */}
      {Array.from({ length: goal - 1 }).map((_, i) => {
        const y = bottomY - bodyBottomCurve - segH * (i + 1)
        return (
          <line
            key={`div-${i}`}
            x1={innerLeftX}
            x2={innerRightX}
            y1={y}
            y2={y}
            stroke={stroke}
            strokeWidth="2.5"
          />
        )
      })}

      {/* tap targets (bottom to top) */}
      {Array.from({ length: goal }).map((_, i) => {
        const segBottom = bottomY - bodyBottomCurve - segH * i
        const segTop = segBottom - segH
        return (
          <rect
            key={`tap-${i}`}
            x={leftX}
            y={segTop}
            width={rightX - leftX}
            height={segH}
            fill="transparent"
            style={{ cursor: 'pointer' }}
            onClick={() => onTapSegment?.(i + 1)}
          />
        )
      })}
    </svg>
  )
}

export default function WaterGoal() {
  const { state, setWaterFilled, setWaterGoal } = useApp()
  const { goal, filled } = state.water
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    if (!menuOpen) return
    const onDoc = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [menuOpen])

  const editGoal = () => {
    const n = Number(prompt('How many bottles is your goal?', goal))
    if (n && n >= 1) setWaterGoal(n)
    setMenuOpen(false)
  }

  const resetBottles = () => {
    setWaterFilled(0)
    setMenuOpen(false)
  }

  return (
    <Layout title="Water Tracker" withMenu>
      <div className="flex items-start justify-between mt-4">
        <div>
          <h2 className="text-2xl font-bold">Water Goal: {goal} bottles</h2>
          <button className="text-xs font-bold mt-1" onClick={editGoal}>Edit goal</button>
        </div>
        <div className="relative" ref={menuRef}>
          <button
            aria-label="Water menu"
            className="p-1 rounded-full hover:bg-ink-900/5"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <MoreVertical size={20} className="text-ink-900/70" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-8 bg-white rounded-xl shadow-soft border border-ink-900/10 py-1 min-w-[160px] z-10">
              <button
                onClick={editGoal}
                className="w-full text-left px-3 py-2 text-sm flex items-center gap-2 hover:bg-paper"
              >
                <Pencil size={14} /> Edit goal
              </button>
              <button
                onClick={resetBottles}
                className="w-full text-left px-3 py-2 text-sm flex items-center gap-2 hover:bg-paper"
              >
                <RotateCcw size={14} /> Reset bottles
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center my-6">
        <Bottle
          goal={goal}
          filled={filled}
          onTapSegment={(level) => setWaterFilled(level)}
        />
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => setWaterFilled(filled + 1)}
          className="rounded-full bg-tile-blue text-ink-900 px-12 py-3 font-bold hover:brightness-95 transition"
        >
          Add a bottle
        </button>
      </div>
    </Layout>
  )
}
