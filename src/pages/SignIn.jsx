import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Logo from '../components/Logo.jsx'
import { useApp } from '../contexts/AppContext.jsx'

export default function SignIn() {
  const navigate = useNavigate()
  const { login } = useApp()
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')

  const submit = (e) => {
    e.preventDefault()
    login()
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-paper flex flex-col items-center px-8 pt-16">
      <div className="mt-20 mb-12">
        <Logo size="lg" />
      </div>
      <form onSubmit={submit} className="w-full max-w-sm space-y-4">
        <input
          type="email"
          placeholder="Email:"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="field"
          required
        />
        <input
          type="password"
          placeholder="Password:"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          className="field"
          required
        />
        <div className="pt-2 flex justify-center">
          <button type="submit" className="btn-primary w-[220px]">
            Sign In
          </button>
        </div>
      </form>
      <p className="mt-6 text-sm font-bold text-ink-900">
        Don't have an account?{' '}
        <Link to="/signup" className="font-bold">Sign up</Link>
      </p>
    </div>
  )
}
