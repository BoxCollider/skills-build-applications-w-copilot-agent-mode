import { useEffect, useState } from 'react'
import { getApiUrl } from '../config/api'

export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const usersCodespacesEndpoint = `https://${import.meta.env.VITE_CODESPACE_NAME || 'your-codespace'}-8000.app.github.dev/api/users/`

  useEffect(() => {
    fetch(getApiUrl('/api/users/'))
      .then((resp) => resp.json())
      .then((data) => {
        setUsers(Array.isArray(data.users) ? data.users : data.users || [])
      })
      .catch((err) => setError(err.message || 'Failed to fetch users'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="container py-5">
      <h1>Users</h1>
      <p className="text-muted">
        Use <code>VITE_CODESPACE_NAME</code> to construct the API URL for Codespaces, or leave it unset to use localhost. Example endpoint: <code>{usersCodespacesEndpoint}</code>
      </p>
      {loading && <p>Loading users...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="row gy-3">
          {users.map((user) => (
            <div key={user._id || user.id} className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{user.name}</h5>
                  <p className="card-text mb-1">Role: {user.role}</p>
                  <p className="text-muted">{user.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
