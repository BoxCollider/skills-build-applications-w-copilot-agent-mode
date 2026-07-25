import { useEffect, useState } from 'react'
import { getApiUrl } from '../config/api'

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(getApiUrl('/api/teams/'))
      .then((resp) => resp.json())
      .then((data) => {
        setTeams(Array.isArray(data.teams) ? data.teams : data.teams || [])
      })
      .catch((err) => setError(err.message || 'Failed to fetch teams'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="container py-5">
      <h1>Teams</h1>
      <p className="text-muted">
        The API uses <code>VITE_CODESPACE_NAME</code> when available and falls back to localhost.
      </p>
      {loading && <p>Loading teams...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="row gy-3">
          {teams.map((team) => (
            <div key={team._id || team.id} className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  <p className="card-text mb-1">Focus: {team.focus}</p>
                  <p className="text-muted">{team.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
