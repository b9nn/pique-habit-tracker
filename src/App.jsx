import { Navigate, Route, Routes } from 'react-router-dom'
import { useApp } from './contexts/AppContext.jsx'

// Auth / onboarding
import Splash from './pages/Splash.jsx'
import SignIn from './pages/SignIn.jsx'
import CreateAccount from './pages/CreateAccount.jsx'
import TrackPreference from './pages/TrackPreference.jsx'
import SharePreference from './pages/SharePreference.jsx'
import PlanSelection from './pages/PlanSelection.jsx'

// App
import Dashboard from './pages/Dashboard.jsx'
import ExerciseTracker from './pages/ExerciseTracker.jsx'
import ExerciseDiary from './pages/ExerciseDiary.jsx'
import TopWorkouts from './pages/TopWorkouts.jsx'
import FitnessBingo from './pages/FitnessBingo.jsx'
import WaterGoal from './pages/WaterGoal.jsx'
import StepsTracker from './pages/StepsTracker.jsx'
import JoyList from './pages/JoyList.jsx'
import Goals from './pages/Goals.jsx'
import StressTracker from './pages/StressTracker.jsx'
import RestDays from './pages/RestDays.jsx'
import Chat from './pages/Chat.jsx'
import Profile from './pages/Profile.jsx'
import Trackers from './pages/Trackers.jsx'

function RequireAuth({ children }) {
  const { state } = useApp()
  if (!state.authed) return <Navigate to="/" replace />
  return children
}

export default function App() {
  return (
    <Routes>
      {/* Public / onboarding */}
      <Route path="/" element={<Splash />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<CreateAccount />} />
      <Route path="/track-preference" element={<TrackPreference />} />
      <Route path="/share-preference" element={<SharePreference />} />
      <Route path="/plan-selection" element={<PlanSelection />} />

      {/* App (auth-guarded) */}
      <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />

      <Route path="/diary" element={<RequireAuth><ExerciseDiary /></RequireAuth>} />
      <Route path="/exercise" element={<RequireAuth><ExerciseTracker /></RequireAuth>} />
      <Route path="/top-workouts" element={<RequireAuth><TopWorkouts /></RequireAuth>} />

      <Route path="/trackers" element={<RequireAuth><Trackers /></RequireAuth>} />
      <Route path="/water" element={<RequireAuth><WaterGoal /></RequireAuth>} />
      <Route path="/steps" element={<RequireAuth><StepsTracker /></RequireAuth>} />
      <Route path="/joy" element={<RequireAuth><JoyList /></RequireAuth>} />
      <Route path="/goals" element={<RequireAuth><Goals /></RequireAuth>} />
      <Route path="/stress" element={<RequireAuth><StressTracker /></RequireAuth>} />
      <Route path="/rest" element={<RequireAuth><RestDays /></RequireAuth>} />

      <Route path="/bingo" element={<RequireAuth><FitnessBingo /></RequireAuth>} />
      <Route path="/chat" element={<RequireAuth><Chat /></RequireAuth>} />
      <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
