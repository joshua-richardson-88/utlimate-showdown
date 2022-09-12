import useAsync from './useAsync'

const DEFAULT_OPTIONS = {
  headers: { 'Content-Type': 'application/json' },
}

export default function useFetch(
  url: URL,
  options: RequestInit = {},
  dependencies: unknown[] = [],
) {
  return useAsync(() => {
    return fetch(url, { ...DEFAULT_OPTIONS, ...options }).then((res) => {
      if (res.ok) return res.json()

      // fetch never fails, so we fail here to simulate unsuccessful call
      return res.json().then((json) => Promise.reject(json))
    })
  }, dependencies)
}
