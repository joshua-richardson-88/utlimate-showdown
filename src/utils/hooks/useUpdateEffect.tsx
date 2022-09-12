import { useEffect, useRef } from 'react'

export default function useUpdateEffect(
  callback: Function,
  dependencies: any[],
) {
  if (callback == null) throw new Error('callback must be defined')
  if (dependencies == null) throw new Error('dependencies must be defined')
  if (typeof callback !== 'function')
    throw new Error('callback must be a function')
  if (!Array.isArray(dependencies))
    throw new Error('dependencies must be an array')
  if (dependencies.length < 1)
    throw new Error('dependency array must not be empty')

  const firstRenderRef = useRef(true)

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false
      return
    }
    return callback()
  }, dependencies)
}
