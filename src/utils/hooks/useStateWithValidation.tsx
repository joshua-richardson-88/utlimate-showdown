import { useCallback, useState } from 'react'

export default function useStateWithValidation<T>(
  predicate: (x: T) => boolean,
  value: T,
) {
  const [state, setState] = useState(value)
  const [isValid, setIsValid] = useState(() => predicate(state))

  const onChange = useCallback(
    (nextState: T) => {
      const next =
        typeof nextState === 'function' ? nextState(state) : nextState
      setState(next)
      setIsValid(predicate(next))
    },
    [predicate],
  )

  return [state, onChange, isValid]
}
