import { RefObject, useEffect, useState } from 'react'

export default function useSize<T extends HTMLElement>(ref: RefObject<T>) {
  const [size, setSize] = useState<DOMRectReadOnly | undefined>()

  useEffect(() => {
    if (ref.current == null) return
    const observer = new ResizeObserver(([entry]) => setSize(entry.contentRect))
    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [])

  return size
}
