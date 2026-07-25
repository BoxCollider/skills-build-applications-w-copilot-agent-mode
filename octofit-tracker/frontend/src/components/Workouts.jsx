import { useEffect, useState } from 'react'

const DEFAULT_API_HOST = 'http://localhost:8000'
const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiHost = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : DEFAULT_API_HOST

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${apiHost}/api/workouts/`)
      .then((resp) => resp.json())
      .then((data) => {
        setWorkouts(Array.isArray(data.workouts) ? data.workouts : data.workouts || [])
      })
      .catch((err) => setError(err.message || 'Failed to fetch workouts'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="container py-5">
      <h1>Workouts</h1>
      <p className="text-muted">
        Set <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> for Codespaces support, otherwise localhost is used.
      </p>
      {loading && <p>Loading workouts...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="row gy-3">
          {workouts.map((workout) => (
            <div key={workout._id || workout.id} className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{workout.title}</h5>
                  <p className="card-text mb-1">Duration: {workout.durationMinutes} mins</p>
                  <p className="card-text mb-1">Focus: {workout.focus}</p>
                  <p className="text-muted">{workout.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
