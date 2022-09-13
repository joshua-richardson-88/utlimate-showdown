import {
  PassageUser,
  PassageUserInfo,
} from '@passageidentity/passage-elements/passage-user'
import { useCallback, useEffect, useMemo, useState } from 'react'

const useAuth = () => {
  const [passage, setPassage] = useState<PassageUser>()
  const [onClient, setOnClient] = useState(typeof window != null)
  const [isLoading, setLoading] = useState(true)
  const [isAuthenticated, setAuthenticated] = useState(false)
  const [info, setInfo] = useState<PassageUserInfo>()

  const getToken = useCallback(async () => {
    if (passage) {
      const t = await passage.getAuthToken()
      setAuthenticated(t != null)

      return t
    }
  }, [passage])
  const logout = useCallback(() => {
    if (passage) passage.signOut()
  }, [passage])
  const refresh = useCallback(() => {
    if (passage) passage.refresh()
  }, [passage])

  useEffect(() => {
    if (typeof window != null) setOnClient(true)
  }, [window])

  useEffect(() => {
    if (onClient) {
      const user = new PassageUser()
      setPassage(user)
      Promise.allSettled([user.getAuthToken(), user.userInfo()])
        .then(([t, u]) => {
          if (t.status === 'fulfilled') setAuthenticated(t.value != null)
          if (u.status === 'fulfilled') setInfo(u.value)
        })
        .catch(console.error)
        .finally(() => setLoading(false))
    }
  }, [onClient, PassageUser])

  useEffect(() => {
    if (onClient && passage && isAuthenticated)
      passage
        .userInfo()
        .then((u) => setInfo(u))
        .catch(console.error)
  }, [onClient, isAuthenticated, passage])

  setLoading(false)
  return [
    isLoading,
    isAuthenticated,
    {
      getToken,
      logout,
      refresh,
      user: info,
    },
  ] as const
}

export default useAuth
