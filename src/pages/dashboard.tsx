// modules
import Link from 'next/link'
import Router from 'next/router'
import { Passage } from '@passageidentity/passage-js'
import { useEffect } from 'react'

// project files
import { env } from '../env/server.mjs'
import { trpc } from '../utils/trpc'

// types
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'

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

const Dashboard = ({
  appID,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const {
    data: isAuthenticated,
    isLoading,
    error,
  } = trpc.useQuery(['auth.isAuthenticated'])
  const passage = new Passage(appID)

  useEffect(() => {
    if (error && error.data?.code === 'FORBIDDEN') {
      passage.signOut()
      Router.push('/')
    }
  }, [passage, error])

  if (isLoading) return

  return (
    <div className='w-screen h-screen bg-neutral-700 text-white p-10'>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className='text-3xl'>
            {isAuthenticated ? 'Welcome' : 'Unauthorized'}
          </div>
          {isAuthenticated ? (
            <Profile appID={appID} logout={passage.signOut} />
          ) : (
            <div>
              <p className='mb-4'>
                You have not logged in and cannot view the dashboard.
              </p>
              <Link href='/'>Login to continue</Link>
            </div>
          )}
        </>
      )}
    </div>
  )
}
export default Dashboard

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      appID: env.PASSAGE_APP_ID,
    },
  }
}
