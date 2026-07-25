import './App.css'
import { Link, Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="container py-5">
      <header className="mb-4">
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
          <div>
            <span className="badge bg-primary-subtle text-primary-emphasis mb-2">
              OctoFit Tracker
            </span>
            <h1 className="display-6 fw-bold">Multi-tier fitness tracking</h1>
            <p className="text-muted mb-0">
              React 19 + Vite frontend with Express/MongoDB backend support for both localhost and Codespaces.
            </p>
          </div>
          <nav>
            <div className="btn-group">
              <Link className="btn btn-outline-primary" to="/users">
                Users
              </Link>
              <Link className="btn btn-outline-primary" to="/teams">
                Teams
              </Link>
              <Link className="btn btn-outline-primary" to="/activities">
                Activities
              </Link>
              <Link className="btn btn-outline-primary" to="/leaderboard">
                Leaderboard
              </Link>
              <Link className="btn btn-outline-primary" to="/workouts">
                Workouts
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="mt-5 text-muted small">
        <p>
          Set <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> for Codespaces URL support; otherwise the app safely falls back to localhost.
        </p>
      </footer>
    </div>
  )
}

export default App
