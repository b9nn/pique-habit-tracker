# Pique — Habit Tracker

A faithful web implementation of the Pique Figma prototype — a fitness/wellness tracker with trainer chat, workout diary, fitness bingo, water & step goals, mood tracking, and more.

Built with **React + Vite + Tailwind CSS** and **React Router**. Data persists in `localStorage`.

## Routes / screens built from the Figma file

**Auth & Onboarding**
- `/` — Splash (green, "pique HABIT TRACKER" wordmark + Log In / Sign Up)
- `/signin` — Sign In
- `/signup` — Create Account
- `/track-preference` — Pill-select what to track
- `/plan-selection` — Pique Gold / Silver / Bronze plan chooser

**Main app (authenticated, with header + bottom nav)**
- `/dashboard` — Motivation banner, activity ring, "Plan for Today", Sleep Score, Heart Rate, Looking Ahead week grid
- `/diary` — Exercise Diary (Motivation, Before/During/After, Reflection)
- `/exercise` — Exercise Tracker (workout cards + Add Workout modal)
- `/top-workouts` — Top 5 Workouts with "Why I Love It"
- `/trackers` — Grid of all trackers
- `/water` — Water Goal with tappable bottle
- `/steps` — Step Goal with multi-segment ring + weekly line chart
- `/joy` — Joy List with Add Entry (Gratitude) modal
- `/goals` — Daily / Weekly / Monthly / Yearly goals
- `/stress` — Mood calendar with Add Mood modal
- `/rest` — Rest Days: friendly reminder, sleep score, rest-day checklist
- `/bingo` — Fitness Bingo 4×4 grid with reward
- `/chat` — Trainer chat (John Smith)
- `/profile` — My Account (Training Partner, Payment, Integrations, etc.)

## Running it

```bash
npm install
npm run dev
```

Then open the printed URL (typically `http://localhost:5173`). First run lands on the green splash screen.

## Design tokens (from Figma PNGs)

| Token | Value |
|---|---|
| `brand-500` (primary) | `#5EB788` |
| `brand-ink` (header/tab) | `#1F4130` |
| `tile.mint` | `#BCE3C8` |
| `tile.blue` | `#C5E5EC` |
| `tile.gray` | `#A9A9A9` |
| `tile.dark` | `#3D5C4E` |
| `paper` (bg) | `#F7F8F6` |
| Script font | Great Vibes |
| Sans font | Lato |

## Project structure

```
src/
├── main.jsx               # Router + provider setup
├── App.jsx                # Routes
├── index.css              # Tailwind layers + component classes
├── contexts/AppContext.jsx  # Global state + localStorage
├── components/
│   ├── Logo.jsx           # "pique HABIT TRACKER" wordmark
│   ├── AppHeader.jsx      # Date + "Hi, <name>" + home icon
│   ├── BottomNav.jsx      # Green nav bar (Pencil / Zap / Trophy / Chat / User+)
│   ├── ScreenTab.jsx      # Dark-green title tab above the nav
│   ├── Layout.jsx         # Page chrome wrapper
│   ├── Card.jsx           # Tinted tile (mint/blue/gray/dark/muted)
│   ├── Modal.jsx          # Dark-green modal used for Gratitude / Add Workout / Mood
│   ├── ProgressRing.jsx   # SVG ring
│   └── MoodIcon.jsx       # Happy/Okay/Sad/Stressed/Angry SVGs
└── pages/
    ├── Splash.jsx            ExerciseTracker.jsx  FitnessBingo.jsx
    ├── SignIn.jsx            ExerciseDiary.jsx    JoyList.jsx
    ├── CreateAccount.jsx     TopWorkouts.jsx      Goals.jsx
    ├── TrackPreference.jsx   WaterGoal.jsx        StressTracker.jsx
    ├── PlanSelection.jsx     StepsTracker.jsx     RestDays.jsx
    ├── Dashboard.jsx         Trackers.jsx         Chat.jsx
    └── Profile.jsx
```

## Things to polish next

- Tighten Figma-fidelity on bottle rendering, step ring angles, bingo star placement
- Add remaining tracker screens referenced but not exported (e.g. Period, Food Diary)
- Wire Dashboard "activity ring" to real data instead of fixed demo percentages
- Desktop layout (currently mobile-only width)
