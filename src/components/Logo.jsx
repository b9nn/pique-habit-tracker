// The "pique HABIT TRACKER" wordmark, in two sizes/colors.
// - variant="light" → green script + dark subtitle (used on white pages & dashboard header)
// - variant="white" → all white (used on splash screen)
export default function Logo({ size = 'md', variant = 'light', withSub = true }) {
  const scriptSize = {
    sm: 'text-5xl',
    md: 'text-6xl',
    lg: 'text-8xl',
  }[size]

  const subSize = {
    sm: 'text-[10px]',
    md: 'text-xs',
    lg: 'text-base',
  }[size]

  const scriptColor = variant === 'white' ? 'text-white' : 'text-brand-500'
  const subColor = variant === 'white' ? 'text-white' : 'text-ink-900'

  return (
    <div className="inline-flex flex-col items-start leading-none">
      <span className={`font-script ${scriptSize} ${scriptColor}`}>pique</span>
      {withSub && (
        <span
          className={`font-sans font-black uppercase ${subSize} ${subColor} -mt-1`}
          style={{ letterSpacing: '0.15em', alignSelf: 'flex-end' }}
        >
          HABIT TRACKER
        </span>
      )}
    </div>
  )
}
