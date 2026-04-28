import { useState } from 'react'
import { Flame, Circle, User } from 'lucide-react'
import Layout from '../components/Layout.jsx'
import Modal from '../components/Modal.jsx'
import { useApp } from '../contexts/AppContext.jsx'
import { useNavigate } from 'react-router-dom'

function Row({ label, children }) {
  return (
    <div className="border border-ink-900/20 rounded-xl px-4 py-3 grid grid-cols-[108px_1fr] items-start gap-3">
      <div className="font-bold text-sm pt-0.5">{label}</div>
      <div className="text-sm space-y-1">{children}</div>
    </div>
  )
}

function LabelValue({ label, value, valueClassName = '' }) {
  return (
    <div className="grid grid-cols-[96px_1fr] gap-2">
      <span className="text-ink-900">{label}</span>
      <span className={valueClassName}>{value}</span>
    </div>
  )
}

export default function Profile() {
  const { state, reset, logout } = useApp()
  const u = state.user
  const navigate = useNavigate()
  const [view, setView] = useState(null) // null | 'payment' | 'integrations' | 'logout'

  const onLogOut = () => {
    logout()
    navigate('/')
  }

  const onCloseAccount = () => {
    if (confirm('This will reset all your Pique data and close your account. Continue?')) {
      reset()
      logout()
      navigate('/')
    }
  }

  return (
    <Layout title="My Account" withMenu>
      <section className="flex items-start gap-4 mt-4">
        <div className="w-20 h-20 rounded-full bg-tile-mint flex items-center justify-center text-brand-ink shrink-0 overflow-hidden">
          <User size={40} strokeWidth={1.5} />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-3xl font-bold leading-tight">
            {u.firstName}<br/>{u.lastName}
          </h2>
          <div className="flex items-center justify-between mt-1">
            <div className="text-sm text-ink-500">{u.age} | {u.pronouns}</div>
            <button className="text-xs font-bold">Edit</button>
          </div>
        </div>
      </section>

      <div className="mt-6 space-y-2.5">
        <Row label="Training Partner">
          <div className="flex items-start justify-between gap-2">
            <div>
              John Smith<br/>
              Goodlife Fitness Davisville<br/>
              Toronto, Canada
            </div>
            <button className="text-xs font-bold self-end">Change</button>
          </div>
        </Row>

        <Row label="Personal Info">
          <LabelValue label="Email:" value={u.email} />
          <div className="grid grid-cols-[96px_1fr] gap-2 items-center">
            <span>Password:</span>
            <div className="flex items-center justify-between">
              <span>••••••••••••</span>
              <button className="text-xs font-bold">Edit</button>
            </div>
          </div>
        </Row>

        <Row label="My Stats">
          <div className="grid grid-cols-2 gap-y-1">
            <div className="flex items-center gap-2">
              <Flame size={16} className="text-orange-500 fill-orange-500" />
              <span>7 Day streak</span>
            </div>
            <div className="flex items-center gap-2">
              <Circle size={16} className="text-ink-300" />
              <span>Super Star Award</span>
            </div>
            <div></div>
            <div className="flex items-center gap-2">
              <Circle size={16} className="text-orange-400" />
              <span>Newcomer Award</span>
            </div>
          </div>
        </Row>

        <Row label="Payment Info">
          <button className="w-full text-left" onClick={() => setView('payment')}>
            <LabelValue label="Current Plan:" value={u.plan} />
            <div className="text-xs font-bold mt-1">Change Plan</div>
            <div className="mt-1">
              <LabelValue label="Payment Info:" value="Mastercard" />
              <div className="grid grid-cols-[96px_1fr] gap-2">
                <span></span>
                <span className="tracking-widest">····················1234</span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span>Billing History</span>
              <span className="text-xs font-bold">Edit</span>
            </div>
          </button>
        </Row>

        <Row label="Preferences">
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-1 flex-1">
              <LabelValue label="Units:" value="lbs/km" />
              <LabelValue label="Notifications:" value="on" />
              <LabelValue label="Accessibility:" value="off" />
            </div>
            <button className="text-xs font-bold self-end">Change</button>
          </div>
        </Row>

        <Row label="Integrations">
          <button className="w-full text-left" onClick={() => setView('integrations')}>
            <div className="grid grid-cols-[96px_1fr] gap-2">
              <span>Apple Watch:</span>
              <span className="text-brand-500 font-semibold">connected</span>
            </div>
            <div>Google Fit:</div>
            <div>Fitbit</div>
            <div>Garmin</div>
          </button>
        </Row>

        <Row label="Privacy and Legal">
          <div>Terms of Service</div>
          <div>Resources</div>
          <div className="grid grid-cols-[96px_1fr] gap-2">
            <span>App Version</span>
            <span>1.01</span>
          </div>
          <button onClick={onCloseAccount} className="font-bold text-left">Close Account</button>
        </Row>
      </div>

      <div className="mt-5 flex justify-end">
        <button
          onClick={() => setView('logout')}
          className="text-sm font-bold text-brand-ink hover:underline"
        >
          Log Out
        </button>
      </div>

      <Modal open={view === 'payment'} onClose={() => setView(null)} tint="dark">
        <h3 className="text-xl font-bold mb-4">Payment</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between"><span>Current Plan</span><span className="font-semibold">{u.plan}</span></div>
          <div className="flex justify-between"><span>Card</span><span className="font-semibold">Mastercard ···· 1234</span></div>
          <div className="flex justify-between"><span>Next Billing</span><span>May 11, 2026</span></div>
          <div className="flex justify-between"><span>Billing History</span><button className="underline">View</button></div>
        </div>
        <div className="mt-5 flex gap-3">
          <button onClick={() => setView(null)} className="flex-1 rounded-full bg-white/15 py-2.5 text-sm font-semibold">Close</button>
          <button onClick={() => { setView(null); navigate('/plans') }} className="flex-1 rounded-full bg-brand-500 py-2.5 text-sm font-semibold">Change Plan</button>
        </div>
      </Modal>

      <Modal open={view === 'integrations'} onClose={() => setView(null)} tint="dark">
        <h3 className="text-xl font-bold mb-4">Integrations</h3>
        <ul className="space-y-2.5 text-sm">
          {[
            { name: 'Apple Watch', status: 'connected' },
            { name: 'Google Fit',  status: null },
            { name: 'Fitbit',      status: null },
            { name: 'Garmin',      status: null },
          ].map((i) => (
            <li key={i.name} className="flex items-center justify-between border border-white/20 rounded-full px-4 py-2.5">
              <span>{i.name}</span>
              {i.status
                ? <span className="text-brand-500 font-semibold text-xs">connected</span>
                : <button className="text-xs font-semibold underline">Connect</button>}
            </li>
          ))}
        </ul>
        <button onClick={() => setView(null)} className="mt-5 w-full rounded-full bg-brand-500 py-2.5 text-sm font-semibold">Done</button>
      </Modal>

      <Modal open={view === 'logout'} onClose={() => setView(null)} tint="dark">
        <h3 className="text-xl font-bold mb-2">Log Out?</h3>
        <p className="text-sm text-white/90 mb-5">You'll need to sign in again to access your account.</p>
        <div className="flex gap-3">
          <button onClick={() => setView(null)} className="flex-1 rounded-full bg-white/15 py-2.5 text-sm font-semibold">Cancel</button>
          <button onClick={onLogOut} className="flex-1 rounded-full bg-brand-500 py-2.5 text-sm font-semibold">Log Out</button>
        </div>
      </Modal>
    </Layout>
  )
}
