const DEFAULT_API_HOST = 'http://localhost:8000'

function normalizeApiBaseUrl(value) {
  if (!value) return null
  return value.replace(/\/$/, '')
}

export function getApiBaseUrl() {
  const configured = normalizeApiBaseUrl(import.meta.env.VITE_API_URL)
  if (configured) {
    return configured
  }

  if (import.meta.env.DEV) {
    return ''
  }

  if (typeof window === 'undefined') {
    return DEFAULT_API_HOST
  }

  const { protocol, hostname } = window.location

  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return `${protocol}//${hostname}:8000`
  }

  if (hostname.includes('.app.github.dev')) {
    return `${protocol}//${hostname.replace(/-5173\./, '-8000.')}`
  }

  return DEFAULT_API_HOST
}

export function getApiUrl(path) {
  const baseUrl = getApiBaseUrl()
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${baseUrl}${normalizedPath}`
}
