import { useCallback, useEffect, useState } from 'react'

export default function useAsync<E, T>(
  callback: () => Promise<T>,
  dependencies: unknown[] = [],
) {
  if (callback == null) throw new TypeError('callback must be defined')
  if (typeof callback !== 'function')
    throw new TypeError('callback must be a function')
  if (!Array.isArray(dependencies))
    throw new TypeError('dependencies must be an array')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<E>()
  const [value, setValue] = useState<T>()

  const callbackMemoized = useCallback(() => {
    setLoading(true)
    setError(undefined)
    setValue(undefined)

    callback()
      .then(setValue)
      .catch(setError)
      .finally(() => setLoading(false))
  }, dependencies)

  useEffect(() => callbackMemoized(), [callbackMemoized])

  return { loading, error, value }
}
