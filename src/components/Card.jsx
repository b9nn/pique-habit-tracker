// Tinted card component with variants matching the Figma palette.
// Variants: mint, mintSoft, blue, blueSoft, gray, graySoft, dark, muted, white
const TINT_CLASS = {
  mint:     'bg-tile-mint text-ink-900',
  mintSoft: 'bg-tile-mintSoft text-ink-900',
  blue:     'bg-tile-blue text-ink-900',
  blueSoft: 'bg-tile-blueSoft text-ink-900',
  gray:     'bg-tile-gray text-white',
  graySoft: 'bg-tile-graySoft text-ink-900',
  dark:     'bg-tile-dark text-white',
  muted:    'bg-tile-muted text-ink-900',
  white:    'bg-white text-ink-900 border border-ink-900/10',
}

export default function Card({ tint = 'mint', className = '', children, ...props }) {
  return (
    <div
      className={`rounded-2xl p-5 ${TINT_CLASS[tint] || TINT_CLASS.mint} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
