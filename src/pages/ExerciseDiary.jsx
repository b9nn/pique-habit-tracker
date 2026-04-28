import Layout from '../components/Layout.jsx'
import Card from '../components/Card.jsx'
import { useApp } from '../contexts/AppContext.jsx'

function EditLink() {
  return <div className="text-right mt-2 text-xs font-bold">Edit</div>
}

export default function ExerciseDiary() {
  const { state } = useApp()
  const d = state.diary

  return (
    <Layout title="Exercise Diary" withMenu>
      <div className="mt-4 flex items-start justify-between">
        <div>
          <div className="font-bold text-lg leading-tight">{d.type}</div>
          <div className="text-xs mt-1">Edit workout type</div>
        </div>
        <div className="text-brand-500 font-bold">{d.date}</div>
      </div>

      <Card tint="blueSoft" className="mt-4">
        <h3 className="font-bold text-lg mb-2">Motivation</h3>
        <p className="text-sm leading-relaxed">{d.motivation}</p>
      </Card>

      <Card tint="gray" className="mt-4">
        <h3 className="font-bold text-lg mb-2">Before Workout</h3>
        <p className="text-sm leading-relaxed">{d.before}</p>
        <EditLink />
      </Card>

      <Card tint="blueSoft" className="mt-4">
        <h3 className="font-bold text-lg mb-2">During Workout</h3>
        <p className="text-sm leading-relaxed">{d.during}</p>
        <EditLink />
      </Card>

      <div className="flex justify-center mt-5">
        <button className="btn-primary">Add New Entry</button>
      </div>

      <div className="flex items-center justify-between mt-3 text-sm font-bold">
        <div>Previous Entries</div>
        <button>Share</button>
      </div>

      <Card tint="mint" className="mt-4">
        <h3 className="font-bold text-lg mb-2">After Workout</h3>
        <p className="text-sm leading-relaxed">{d.after}</p>
        <EditLink />
      </Card>

      <Card tint="graySoft" className="mt-4">
        <h3 className="font-bold text-lg mb-2">Reflection</h3>
        <p className="text-sm leading-relaxed">{d.reflection}</p>
        <EditLink />
      </Card>
    </Layout>
  )
}
