import { useCallback, useRef, useState } from 'react'

export default function useStateWithHistory<T>(
  init: T,
  { capacity = 10 }: { capacity?: number } = {},
) {
  if (init == null) throw new TypeError('initial value must be included')

  const [state, setState] = useState(init)
  const historyRef = useRef([init])
  const pointerRef = useRef(0)

  const set = useCallback(
    (v: unknown) => {
      const resolvedValue = typeof v === 'function' ? v(state) : v

      // if we are adding history, and not at the end of the history array
      // cut the rest of the history out - we're replacing it
      if (pointerRef.current < historyRef.current.length - 1) {
        historyRef.current.splice(pointerRef.current + 1)
      }

      // add the new value into the history array
      historyRef.current.push(resolvedValue)

      // if we've reached the max length of the history array
      // get rid of the oldest piece of history
      while (historyRef.current.length > capacity) {
        historyRef.current.shift()
      }

      // move the pointer to the end of the history array
      pointerRef.current = historyRef.current.length - 1

      // update the state with the new value
      setState(resolvedValue)
    },
    [capacity, state],
  )

  const back = useCallback(() => {
    if (pointerRef.current <= 0) return
    pointerRef.current--
    setState(historyRef.current[pointerRef.current])
  }, [])
  const forward = useCallback(() => {
    if (pointerRef.current >= historyRef.current.length - 1) return
    pointerRef.current++
    setState(historyRef.current[pointerRef.current])
  }, [])
  const go = useCallback((x: number) => {
    if (x < 0 || x >= historyRef.current.length - 1) return
    pointerRef.current = x
    setState(historyRef.current[pointerRef.current])
  }, [])

  return [
    state,
    set,
    {
      history: historyRef.current,
      pointer: pointerRef.current,
      back,
      forward,
      go,
    },
  ] as const
}
