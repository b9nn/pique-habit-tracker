// SVG mood icons matching the Stress Tracker calendar in Figma.
const COLORS = {
  happy: '#5EB788',
  okay: '#B5D9DF',
  sad: '#A9A9A9',
  stressed: '#60A8B0',
  angry: '#3D5C4E',
}

export default function MoodIcon({ mood, size = 28 }) {
  const c = COLORS[mood] || '#D4D4D4'
  const stroke = 2
  const r = (size - stroke) / 2
  const cx = size / 2
  const cy = size / 2

  const face = {
    happy:    <path d={`M${cx - 6},${cy + 1} q6,6 12,0`} fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" />,
    okay:     <path d={`M${cx - 6},${cy + 3} h12`} fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" />,
    sad:      <path d={`M${cx - 6},${cy + 4} q6,-6 12,0`} fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" />,
    stressed: <path d={`M${cx - 6},${cy + 3} q2,-3 4,0 q2,3 4,0 q2,-3 4,0`} fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" />,
    angry:    (
      <>
        <path d={`M${cx - 6},${cy + 3} q2,-3 4,0 q2,3 4,0 q2,-3 4,0`} fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" />
        <path d={`M${cx - 7},${cy - 3} l5,2`} stroke={c} strokeWidth="1.5" strokeLinecap="round" />
        <path d={`M${cx + 7},${cy - 3} l-5,2`} stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
  }

  const eyes = (
    <>
      <circle cx={cx - 4} cy={cy - 2} r="1" fill={c} />
      <circle cx={cx + 4} cy={cy - 2} r="1" fill={c} />
    </>
  )

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={c} strokeWidth={stroke} />
      {eyes}
      {face[mood]}
    </svg>
  )
}

export const MOODS = ['happy', 'okay', 'sad', 'stressed', 'angry']
