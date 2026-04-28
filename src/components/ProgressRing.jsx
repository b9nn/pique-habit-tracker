// Circular progress ring with optional center content.
// Used on Dashboard (activity ring — multi-segment) and Steps Tracker.
//
// Single-ring usage (backward compatible):
//   <ProgressRing value={60} size={160} stroke={18} color="#5EB788" />
//
// Multi-ring usage — pass `segments`, an outermost-first array:
//   <ProgressRing size={180} segments={[
//     { value: 70, color: '#5EB788', track: '#C5E5EC', stroke: 14 },
//     { value: 85, color: '#BCE3C8', track: '#D6EEDE', stroke: 14 },
//   ]} />
export default function ProgressRing({
  value = 0, // 0-100 (single-ring mode)
  size = 160,
  stroke = 18,
  color = '#5EB788',
  track = '#E8EAE8',
  segments,
  children,
}) {
  const rings =
    segments && segments.length > 0
      ? segments
      : [{ value, color, track, stroke }]

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        {rings.map((r, i) => {
          const segStroke = r.stroke ?? stroke
          const innerPadding = rings
            .slice(0, i)
            .reduce((acc, prev) => acc + (prev.stroke ?? stroke) * 2 + 2, 0)
          const radius = (size - segStroke - innerPadding) / 2
          if (radius <= 0) return null
          const circumference = 2 * Math.PI * radius
          const clamped = Math.max(0, Math.min(100, r.value ?? 0))
          const offset = circumference - (clamped / 100) * circumference
          return (
            <g key={i}>
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={r.track ?? track}
                strokeWidth={segStroke}
                fill="transparent"
              />
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={r.color ?? color}
                strokeWidth={segStroke}
                strokeLinecap="round"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                className="transition-[stroke-dashoffset] duration-700 ease-out"
              />
            </g>
          )
        })}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  )
}
