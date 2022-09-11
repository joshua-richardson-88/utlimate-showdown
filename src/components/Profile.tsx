import Router from 'next/router'
import { useEffect } from 'react'
import { trpc } from '../utils/trpc'

const Profile: React.FC<{ appID: string; logout: () => void }> = ({
  appID,
  logout,
}) => {
  const { data: user, isLoading, error } = trpc.useQuery(['auth.getUserData'])
  useEffect(() => {
    require('@passageidentity/passage-elements/passage-profile')
  }, [])

  useEffect(() => {
    if (error && error.data?.code === 'FORBIDDEN') {
      logout()
      Router.push('/')
    }
  }, [error, logout])

  if (isLoading) return <div />
  return <passage-profile app-id={appID} />
}
export default Profile
