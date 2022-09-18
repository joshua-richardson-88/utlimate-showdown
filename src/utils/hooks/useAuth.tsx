import { useCallback, useEffect, useState } from 'react'
import type {
  PassageUser,
  PassageUserInfo,
} from '@passageidentity/passage-elements/passage-user'

import { isSSR } from '../isSSR'

const useAuth = () => {
  const [isLoading, setLoading] = useState(true)
  const [isAuthenticated, setAuthenticated] = useState(false)
  const [p, setP] = useState<PassageUser>()
  const [info, setInfo] = useState<PassageUserInfo>()

  const getToken = useCallback(async () => {
    if (p) {
      const t = await p.getAuthToken()
      setAuthenticated(t != null)

      return t
    }
  }, [p])
  const logout = useCallback(() => {
    if (p != null) p.signOut()
    setAuthenticated(false)
  }, [p])
  const refresh = useCallback(() => {
    if (p != null) p.refresh()
  }, [p])

  useEffect(() => {
    if (!isSSR) {
      import('@passageidentity/passage-elements/passage-user').then(
        ({ PassageUser }) => setP(new PassageUser()),
      )
    }
  }, [])
  useEffect(() => {
    if (p != null) {
      Promise.allSettled([p.getAuthToken(), p.userInfo()])
        .then(([t, u]) => {
          if (t.status === 'fulfilled') setAuthenticated(t.value != null)
          if (u.status === 'fulfilled') setInfo(u.value)
        })
        .catch(console.error)
        .finally(() => setLoading(false))
    }
  }, [p])

  return [
    isLoading,
    isAuthenticated,
    { getToken, logout, refresh, user: info },
  ] as const
}
export default useAuth
