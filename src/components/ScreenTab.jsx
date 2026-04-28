import { MoreVertical } from 'lucide-react'

// The dark-green rounded tab that sits just above the bottom nav,
// displaying the screen's name with an optional kebab menu.
// Figma pattern: tab grows from the right side of the screen, with the
// kebab icon appearing either on the left edge (Chat) or to the right of
// the title (most other screens).
export default function ScreenTab({
  title,
  withMenu = false,
  menuPosition = 'right',
  fullWidth = false,
}) {
  const menu = withMenu ? (
    <MoreVertical size={18} className="text-white/90 shrink-0" />
  ) : null

  return (
    <div
      className={`fixed bottom-[72px] z-20 left-0 right-0 mx-auto max-w-md px-0`}
    >
      <div className={`flex ${fullWidth ? 'justify-start' : 'justify-end'}`}>
        <div
          className="bg-brand-ink text-white font-bold text-lg flex items-center gap-3 pl-5 pr-5 py-3 rounded-tl-2xl"
          style={{ minWidth: '55%' }}
        >
          {menuPosition === 'left' && menu}
          <span className="flex-1">{title}</span>
          {menuPosition === 'right' && menu}
        </div>
      </div>
    </div>
  )
}
