import { useCallback, useEffect, useState } from 'react'

function read(): string {
  const raw = window.location.hash.replace(/^#/, '')
  return raw.length > 1 ? raw : '/website'
}

let listeners: Array<() => void> = []

export function navigate(to: string, opts?: { replace?: boolean }) {
  const next = '#' + to
  if (window.location.hash === next) return
  if (opts?.replace) window.history.replaceState(null, '', next)
  else window.history.pushState(null, '', next)
  listeners.forEach((l) => l())
}

export function useRoute() {
  const [path, setPath] = useState(read)

  useEffect(() => {
    const onChange = () => setPath(read())
    listeners.push(onChange)
    window.addEventListener('hashchange', onChange)
    window.addEventListener('popstate', onChange)
    return () => {
      listeners = listeners.filter((l) => l !== onChange)
      window.removeEventListener('hashchange', onChange)
      window.removeEventListener('popstate', onChange)
    }
  }, [])

  return path
}

export function useNavigate() {
  return useCallback((to: string) => navigate(to), [])
}

/** Splits "/app/fall/reuter" into ["app","fall","reuter"] */
export function segments(path: string) {
  return path.split('/').filter(Boolean)
}
