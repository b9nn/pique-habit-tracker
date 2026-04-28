import { createContext, useContext, useEffect, useState } from 'react'

const KEY = 'pique_app_v2'

const today = () => {
  const d = new Date()
  return { y: d.getFullYear(), m: d.getMonth() + 1, d: d.getDate() }
}

const DEFAULT_STATE = {
  authed: false,
  onboarded: false,
  user: {
    name: 'Danielle',
    firstName: 'Danielle',
    lastName: 'Kerr',
    email: 'danielle.kerr@live.ca',
    pronouns: 'she/her',
    age: 28,
    plan: 'Gold',
  },
  trackers: [
    'Top 5 Workouts',
    'Workout Types',
    'Joy List',
    'Rest Days',
    'Water Tracker',
    'Stress Tracker',
    'Fitness Bingo',
    'Goals',
    'Period Tracker',
    'Habit Builder: 30 Day Fitness Challenge',
  ],
  water: {
    goal: 6,
    filled: 2, // bottles filled
  },
  steps: {
    goal: 10000,
    today: 7240,
    week: [5800, 9200, 10100, 8700, 9500, 7240, 0], // last 7 days
  },
  workouts: [
    { id: 'w1', name: 'Indoor Cycle', tint: 'mint',  duration: 69.09, hr: 115, active: 331, total: 422, lastDate: 'April 11, 2026' },
    { id: 'w2', name: 'Kickboxing',   tint: 'blue',  duration: 55.6,  hr: 121, active: 270, total: 331, lastDate: 'April 10, 2026' },
    { id: 'w3', name: 'Outdoor Walk', tint: 'gray',  duration: 27,    hr: 101, active: 79,  total: 102, lastDate: 'April 4, 2026',  distance: 1.04 },
    { id: 'w4', name: 'Yoga',         tint: 'mint',  duration: 62.11, hr: 117, active: 190, total: 226, lastDate: 'April 2, 2026' },
  ],
  topWorkouts: [
    { rank: 1, name: 'Upper Body Strength', duration: '1 hour',  tint: 'mint', expanded: true,
      body: "There's something deeply empowering about building my upper body strength—it's not just physical, it's emotional. Every push, pull, and lift reminds me that I'm capable, that I can support my own weight and move through the world with more confidence. It helps clear my mind in a way few things can, turning stress into focus and frustration into progress." },
    { rank: 2, name: 'Peloton',            duration: '1.5 hour', tint: 'blue' },
    { rank: 3, name: 'Yoga',               duration: '1 hour',   tint: 'gray' },
    { rank: 4, name: 'Zumba',              duration: '1 hour',   tint: 'mint' },
    { rank: 5, name: 'Running',            duration: '2 hours',  tint: 'blue' },
  ],
  plan: {
    date: 'April 11, 2026',
    activity: 'Resistance Training',
    location: 'Solo Workout at Goodlife Fitness',
    duration: '1 h 15 m',
    status: null, // 'made' | 'missed' | null
  },
  sleep: { score: 54, duration: '5 h 35 m', interruptions: '4x totalling 20 m 4 s' },
  heartRate: 96,
  lookingAhead: [
    { day: 12, label: 'Zumba',            detail: '1 hr',   tint: 'mintSoft' },
    { day: 13, label: 'Rest Day',         detail: '',       tint: 'mint' },
    { day: 14, label: 'Personal Training', detail: '1 hr',   tint: 'gray' },
    { day: 15, label: 'Long Distance Run', detail: '1.5 hr', tint: 'graySoft' },
  ],
  bingo: {
    month: 'April',
    daysRemaining: 16,
    reward: 'New water bottle',
    cells: [
      { text: 'Walk 8,000 steps',          tint: 'mint',     done: false },
      { text: 'Lift weights for 10 minutes', tint: 'dark',   done: true  },
      { text: 'Workout 3 days in a row',   tint: 'muted',    done: false },
      { text: 'Stretch for 10 minutes',    tint: 'blue',     done: true  },
      { text: 'Try a new healthy recipe',  tint: 'muted',    done: false },
      { text: 'Drink 2 bottles of water',  tint: 'blue',     done: false },
      { text: 'Take a yoga class',         tint: 'mint',     done: true  },
      { text: 'Do 10 push-ups',            tint: 'gray',     done: false },
      { text: 'Workout with a friend',     tint: 'gray',     done: false },
      { text: 'Workout 5 days in a row',   tint: 'mint',     done: false },
      { text: 'Visit the gym twice a week',tint: 'muted',    done: false },
      { text: 'Try a new workout type',    tint: 'muted',    done: true  },
      { text: '30 minutes of cardio',      tint: 'muted',    done: false },
      { text: 'Get 8 hours of sleep',      tint: 'muted',    done: false },
      { text: 'Meditate for 10 minutes',   tint: 'gray',     done: false },
      { text: 'Go on a hike',              tint: 'mint',     done: false },
    ],
  },
  joyList: [
    { n: 1, text: 'A warm cup of chamomile tea',    tint: 'mint' },
    { n: 2, text: 'Long walks in nature',            tint: 'blue' },
    { n: 3, text: 'Getting lost in a good book',     tint: 'dark' },
    { n: 4, text: 'Indulging in your favourite dessert', tint: 'gray' },
    { n: 5, text: 'Listening to the birds sing',     tint: 'mint' },
    { n: 6, text: 'Chocolate eaten slowly and savoured.', tint: 'blue' },
    { n: 7, text: 'A long, deep chat with a friend', tint: 'dark' },
    { n: 8, text: 'Watching the sunset',             tint: 'gray' },
  ],
  goals: [
    { kind: 'Daily Goal',   text: 'No fast food',             streak: '6 days in a row!',  tint: 'mint' },
    { kind: 'Weekly Goal',  text: 'Go to the gym 4 times',    streak: '3 weeks in a row!', tint: 'dark' },
    { kind: 'monthly goal', text: 'Increase my deadlift weight', streak: '6 days in a row!', tint: 'blue' },
    { kind: 'yearly goal',  text: 'Increase my weight',       streak: '3 weeks in a row!', tint: 'mint' },
  ],
  stress: {
    // moods per day of April: happy | okay | sad | stressed | angry
    month: 'April',
    entries: {
      1: 'okay', 2: 'okay', 3: 'happy', 4: 'happy',
      5: 'okay', 6: 'stressed', 7: 'okay', 8: 'okay',
      9: 'angry', 10: 'stressed', 11: 'happy',
      12: 'sad',
    },
  },
  restDays: {
    current: 'April 1, 2026',
    score: '7/10',
    sleep: { score: 54, duration: '5 h 35 m', interruptions: '4x totalling 20 m 4 s', factors: 'You got to bed later than usual, and woke up a few times throughout the night.' },
    checklist: [
      { text: 'Stretch',            done: true  },
      { text: 'Meditate',           done: true  },
      { text: 'Get a good night’s sleep', done: false },
      { text: 'Get some fresh air', done: true  },
      { text: 'Stay hydrated',      done: false },
      { text: 'Foam roll',          done: true  },
      { text: 'Listen to music',    done: true  },
      { text: 'Eat a nourishing meal', done: true },
      { text: 'Set intentions for the week', done: false },
      { text: 'Indulge in something sweet', done: true },
    ],
  },
  chat: {
    partnerInitials: 'JS',
    partnerName: 'John Smith',
    messages: [
      { from: 'them', text: "Hey! Just checked your stats from this week. You've been super consistent 🔥 How are you feeling?" },
      { from: 'me',   text: "Honestly… a lot better than last week. Still tired but in a good way?" },
      { from: 'them', text: "That's exactly what we want. Keep it up!" },
      { from: 'me',   text: "I can tell. The workouts feel a bit easier, which is kinda crazy." },
      { from: 'them', text: "Not crazy — progress 😊 You've also hit 5 workouts this week. That's huge." },
      { from: 'me',   text: "I didn't even realize that… wow" },
      { from: 'them', text: "That's what consistency does. Next step: we'll start pushing intensity a bit." },
      { from: 'me',   text: "Nervous but also excited 😅" },
    ],
  },
  diary: {
    type: 'Resistance Training',
    date: 'April 7 2026',
    motivation: 'I typically try to push my self with some sort of physical exercise daily to improve my mental strength, maintain my bodies strength, maintain my habitual discipline, and meditate under physical stress.',
    before: 'I am eager to get in the gym and do some physical work. Like most people I have a day job where I work for an employer, but when I get the opportunity to work out, I am working for myself. This I find feeling freeing and love to incorporate this into my life everyday. I have a urgency to move in quickly hit my muscles adequately and get out.',
    during: 'If I may feel sluggish sometimes in the start, I know as I go further into a workout, I can defeat that sloth liar. I usually am cognisant of my body from the previous day and what parts of my body need work and how to support my muscle groups. I am used to being the last guy lifting at my gym.',
    after: 'After a workout, I feel rejuvenated and accomplished even if my body is tired and sore. I know that I have reached my physical quota for exercise in the day and can conclude the rest of my day with a triumphant feeling. My mind is centered and more focused and I am able to better control my actions because I have added to the strength of my will.',
    reflection: 'My discipline of physical exercise is immensely important to me. I am very grateful I have this opportunity to have time and space to exercise and maintain my health. I am grateful that I am in good health and have the ability to work out and take care of my health. All the effort I make in the gym reflects into strengthening my mental will in other areas of my life.',
  },
}

const AppContext = createContext(null)

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return DEFAULT_STATE
    return { ...DEFAULT_STATE, ...JSON.parse(raw) }
  } catch {
    return DEFAULT_STATE
  }
}

export function AppProvider({ children }) {
  const [state, setState] = useState(load)

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(state)) } catch {}
  }, [state])

  const api = {
    state,
    setState,
    update: (patch) => setState((s) => ({ ...s, ...(typeof patch === 'function' ? patch(s) : patch) })),
    login: () => setState((s) => ({ ...s, authed: true })),
    logout: () => setState((s) => ({ ...s, authed: false })),
    finishOnboarding: () => setState((s) => ({ ...s, onboarded: true, authed: true })),
    setPlan: (plan) => setState((s) => ({ ...s, user: { ...s.user, plan } })),
    toggleTracker: (name) =>
      setState((s) => ({
        ...s,
        trackers: s.trackers.includes(name)
          ? s.trackers.filter((t) => t !== name)
          : [...s.trackers, name],
      })),
    setWaterFilled: (n) =>
      setState((s) => ({ ...s, water: { ...s.water, filled: Math.max(0, Math.min(n, s.water.goal)) } })),
    setWaterGoal: (n) =>
      setState((s) => ({ ...s, water: { ...s.water, goal: Math.max(1, n), filled: Math.min(s.water.filled, n) } })),
    toggleBingoCell: (i) =>
      setState((s) => ({
        ...s,
        bingo: { ...s.bingo, cells: s.bingo.cells.map((c, idx) => idx === i ? { ...c, done: !c.done } : c) },
      })),
    toggleRestItem: (i) =>
      setState((s) => ({
        ...s,
        restDays: { ...s.restDays, checklist: s.restDays.checklist.map((c, idx) => idx === i ? { ...c, done: !c.done } : c) },
      })),
    setStressMood: (day, mood) =>
      setState((s) => ({ ...s, stress: { ...s.stress, entries: { ...s.stress.entries, [day]: mood } } })),
    addJoy: (text) =>
      setState((s) => ({ ...s, joyList: [...s.joyList, { n: s.joyList.length + 1, text, tint: ['mint','blue','dark','gray'][s.joyList.length % 4] }] })),
    setDayPlanStatus: (status) =>
      setState((s) => ({ ...s, plan: { ...s.plan, status } })),
    sendMessage: (text) =>
      setState((s) => ({ ...s, chat: { ...s.chat, messages: [...s.chat.messages, { from: 'me', text }] } })),
    reset: () => {
      try { localStorage.removeItem(KEY) } catch {}
      setState(DEFAULT_STATE)
    },
  }

  return <AppContext.Provider value={api}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
