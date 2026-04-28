import { Link } from 'react-router-dom'
import { Zap, Droplet, Footprints, Smile, Target, Moon, HeartPulse, Pencil, BookOpen, Trophy } from 'lucide-react'
import Layout from '../components/Layout.jsx'
import Card from '../components/Card.jsx'

const LINKS = [
  { to: '/exercise',     label: 'Exercise Tracker', tint: 'mint',     Icon: Zap },
  { to: '/diary',        label: 'Exercise Diary',   tint: 'blue',     Icon: Pencil },
  { to: '/top-workouts', label: 'Top 5 Workouts',   tint: 'gray',     Icon: Trophy },
  { to: '/water',        label: 'Water Tracker',    tint: 'blue',     Icon: Droplet },
  { to: '/steps',        label: 'Steps Tracker',    tint: 'mint',     Icon: Footprints },
  { to: '/joy',          label: 'Joy List',         tint: 'mintSoft', Icon: Smile },
  { to: '/goals',        label: 'Goals',            tint: 'dark',     Icon: Target },
  { to: '/stress',       label: 'Stress Tracker',   tint: 'blueSoft', Icon: HeartPulse },
  { to: '/rest',         label: 'Rest Days',        tint: 'graySoft', Icon: Moon },
  { to: '/bingo',        label: 'Fitness Bingo',    tint: 'mint',     Icon: BookOpen },
]

export default function Trackers() {
  return (
    <Layout title="Trackers" withMenu>
      <h2 className="text-2xl font-bold mt-4">Your Trackers</h2>
      <p className="text-sm text-ink-500 mt-1">Pick a tracker to open</p>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {LINKS.map(({ to, label, tint, Icon }) => (
          <Link key={to} to={to} className="block">
            <Card tint={tint} className="aspect-square flex flex-col justify-between hover:brightness-105 transition">
              <Icon size={28} strokeWidth={2} />
              <div className="font-bold text-base leading-tight">{label}</div>
            </Card>
          </Link>
        ))}
      </div>
    </Layout>
  )
}
