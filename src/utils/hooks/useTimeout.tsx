import { useCallback, useEffect, useRef } from 'react'

export default function useTimeout(callback: () => void, delay: number) {
  if (callback == null) throw new Error('callback must be defined')
  if (delay == null) throw new Error('delay must be defined')
  if (typeof callback !== 'function')
    throw new Error('callback must be a function')
  if (typeof delay !== 'number') throw new Error('delay must be a number')

  const callbackRef = useRef(callback)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const set = useCallback(() => {
    timeoutRef.current = setTimeout(() => callbackRef.current(), delay)
  }, [delay])

  const clear = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current)
  }, [])

  useEffect(() => {
    set()
    return clear
  }, [delay, set, clear])

  const reset = useCallback(() => {
    clear()
    set()
  }, [clear, set])

  return { reset, clear }
}
