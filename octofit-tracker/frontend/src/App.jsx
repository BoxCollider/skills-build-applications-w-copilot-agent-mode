import './App.css'

function App() {
  return (
    <main className="container py-5">
      <section className="row align-items-center g-4">
        <div className="col-lg-7">
          <span className="badge bg-primary-subtle text-primary-emphasis mb-3">
            OctoFit Tracker
          </span>
          <h1 className="display-5 fw-bold mb-3">Modern fitness tracking for ambitious teams</h1>
          <p className="lead text-muted mb-4">
            Manage workouts, leaderboards, and member progress from one polished experience.
          </p>
          <div className="d-flex gap-3">
            <a className="btn btn-primary btn-lg" href="http://localhost:8000/api/health">
              Check API health
            </a>
            <a className="btn btn-outline-secondary btn-lg" href="https://vite.dev/guide/" target="_blank" rel="noreferrer">
              Read Vite docs
            </a>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="card shadow-sm border-0">
            <img src="/octofitapp-small.png" className="card-img-top p-4" alt="OctoFit tracker logo" />
            <div className="card-body">
              <h2 className="h5">Ready for multi-tier growth</h2>
              <p className="text-muted mb-0">
                React 19, Express, and MongoDB are scaffolded and ready for the next feature set.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
