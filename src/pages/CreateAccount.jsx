import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Logo from '../components/Logo.jsx'

export default function CreateAccount() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [pw2, setPw2] = useState('')

  const submit = (e) => {
    e.preventDefault()
    navigate('/track-preference')
  }

  return (
    <div className="min-h-screen bg-paper flex flex-col items-center px-8 pt-16">
      <div className="mt-16 mb-10">
        <Logo size="lg" />
      </div>
      <form onSubmit={submit} className="w-full max-w-sm space-y-4">
        <input type="email" placeholder="Email:" value={email} onChange={(e) => setEmail(e.target.value)} className="field" required />
        <input type="password" placeholder="Password:" value={pw} onChange={(e) => setPw(e.target.value)} className="field" required />
        <input type="password" placeholder="Re-enter Password:" value={pw2} onChange={(e) => setPw2(e.target.value)} className="field" required />
        <div className="pt-2 flex justify-center">
          <button type="submit" className="btn-primary w-[220px]">Continue</button>
        </div>
      </form>
      <p className="mt-6 text-sm font-bold text-ink-900">
        Already have an account?{' '}
        <Link to="/signin" className="font-bold">Sign in</Link>
      </p>
    </div>
  )
}
