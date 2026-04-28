import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'
import Logo from './Logo.jsx'
import { useApp } from '../contexts/AppContext.jsx'

export default function AppHeader() {
  const { state } = useApp()
  const dateLabel = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <header className="flex items-start justify-between pt-5 pb-4">
      <Link to="/dashboard" className="block pt-1">
        <Logo size="sm" />
      </Link>
      <div className="flex items-start gap-3 pt-2">
        <div className="text-left leading-tight">
          <div className="text-sm font-bold text-brand-500">{dateLabel}</div>
          <div className="text-xl font-bold text-ink-900 mt-1">
            Hi, {state.user.firstName}
          </div>
        </div>
        <Link
          to="/dashboard"
          aria-label="Home"
          className="mt-0.5 text-brand-500 hover:text-brand-600 transition"
        >
          <Home size={30} strokeWidth={1.75} />
        </Link>
      </div>
    </header>
  )
}
