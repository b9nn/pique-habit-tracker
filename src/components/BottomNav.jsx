import { Link, useLocation } from 'react-router-dom'
import { Pencil, Zap, Trophy, MessageCircle, UserPlus } from 'lucide-react'

// Bottom nav icons in the Figma file:
// pencil = Exercise Diary, lightning = Goals/Trackers, trophy = Challenges (bingo), chat, user+
const ITEMS = [
  { to: '/diary',     Icon: Pencil,        label: 'Diary' },
  { to: '/trackers',  Icon: Zap,           label: 'Trackers' },
  { to: '/bingo',     Icon: Trophy,        label: 'Challenges' },
  { to: '/chat',      Icon: MessageCircle, label: 'Chat' },
  { to: '/profile',   Icon: UserPlus,      label: 'Profile' },
]

export default function BottomNav() {
  const { pathname } = useLocation()
  return (
    <nav className="fixed bottom-0 inset-x-0 z-30">
      <div className="mx-auto max-w-md">
        <div className="bg-brand-500 flex items-center justify-around px-3 py-4 text-white">
          {ITEMS.map(({ to, Icon, label }) => {
            const active = pathname.startsWith(to)
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center justify-center w-12 h-10 transition ${
                  active ? 'opacity-100' : 'opacity-90 hover:opacity-100'
                }`}
                aria-label={label}
              >
                <Icon size={28} strokeWidth={active ? 2.5 : 2} />
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
