import { useEffect, useState } from 'react'
import { getApiUrl } from '../config/api'

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const leaderboardCodespacesEndpoint = `https://${import.meta.env.VITE_CODESPACE_NAME || 'your-codespace'}-8000.app.github.dev/api/leaderboard/`

  useEffect(() => {
    fetch(getApiUrl('/api/leaderboard/'))
      .then((resp) => resp.json())
      .then((data) => {
        setLeaderboard(Array.isArray(data.leaderboard) ? data.leaderboard : data.leaderboard || [])
      })
      .catch((err) => setError(err.message || 'Failed to fetch leaderboard'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="container py-5">
      <h1>Leaderboard</h1>
      <p className="text-muted">
        The application supports Codespaces with <code>VITE_CODESPACE_NAME</code> and falls back to localhost. Example endpoint: <code>{leaderboardCodespacesEndpoint}</code>
      </p>
      {loading && <p>Loading leaderboard...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="row gy-3">
          {leaderboard.map((entry) => (
            <div key={entry._id || entry.id} className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{entry.name}</h5>
                  <p className="card-text mb-1">Points: {entry.points}</p>
                  <p className="text-muted">{entry.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
