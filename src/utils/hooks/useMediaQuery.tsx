import { useEffect, useState } from 'react'
import useEventListener from './useEventListener'

export default function useMediaQuery(query: string) {
  const [isMatch, setIsMatch] = useState(false)

  const getMatch = (query: string) =>
    typeof window == null ? false : window.matchMedia(query).matches
  const update = () => setIsMatch(getMatch(query))

  useEffect(() => {
    update()
  }, [query])

  useEventListener('change', update)

  return isMatch
}
