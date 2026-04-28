import { Link } from 'react-router-dom'

export default function Splash() {
  return (
    <div className="min-h-screen bg-brand-500 flex flex-col items-center px-8 text-white">
      <div className="flex-1 flex items-center justify-center w-full">
        <div className="inline-flex flex-col items-start leading-none">
          <span className="font-script text-white text-[110px] leading-none">pique</span>
          <span
            className="font-sans font-black uppercase text-white text-base -mt-2"
            style={{ letterSpacing: '0.18em', alignSelf: 'flex-end' }}
          >
            HABIT TRACKER
          </span>
        </div>
      </div>
      <div className="w-full max-w-sm pb-24 space-y-5">
        <Link
          to="/signin"
          className="block text-center rounded-full border-2 border-white bg-transparent px-6 py-3.5 text-white text-lg font-semibold hover:bg-white/10 transition"
        >
          Log In
        </Link>
        <Link
          to="/signup"
          className="block text-center rounded-full border-2 border-white bg-transparent px-6 py-3.5 text-white text-lg font-semibold hover:bg-white/10 transition"
        >
          Sign Up
        </Link>
      </div>
    </div>
  )
}
