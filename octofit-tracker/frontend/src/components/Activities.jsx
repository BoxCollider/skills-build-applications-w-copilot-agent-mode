import { useEffect, useState } from 'react'
import { getApiUrl } from '../config/api'

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(getApiUrl('/api/activities/'))
      .then((resp) => resp.json())
      .then((data) => {
        setActivities(Array.isArray(data.activities) ? data.activities : data.activities || [])
      })
      .catch((err) => setError(err.message || 'Failed to fetch activities'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="container py-5">
      <h1>Activities</h1>
      <p className="text-muted">
        `VITE_CODESPACE_NAME` should be defined in <code>.env.local</code> for Codespaces URL support.
      </p>
      {loading && <p>Loading activities...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="row gy-3">
          {activities.map((activity) => (
            <div key={activity._id || activity.id} className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{activity.type}</h5>
                  <p className="card-text mb-1">Distance: {activity.distanceKm} km</p>
                  <p className="card-text mb-1">Duration: {activity.durationMinutes} mins</p>
                  <p className="text-muted">{activity.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
