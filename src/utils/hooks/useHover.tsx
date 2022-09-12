import { RefObject, useState } from 'react'
import useEventListener from './useEventListener'

export default function useHover<T extends HTMLElement>(ref: RefObject<T>) {
  const [hovered, setHovered] = useState(false)

  useEventListener('mouseover', () => setHovered(true), ref)
  useEventListener('mouseout', () => setHovered(false), ref)

  return hovered
}
