import { useState } from 'react'
import { useEventListener } from './useEventListener'

export default function useOnlineStatus() {
  const [online, setOnline] = useState(navigator.onLine)
  const onChange = () => setOnline(navigator.onLine)

  useEventListener('online', onChange)
  useEventListener('offline', onChange)

  return online
}
