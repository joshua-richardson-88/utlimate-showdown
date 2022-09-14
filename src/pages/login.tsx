// modules
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'

// project files
import Navigation from '../components/Navigation'
import { env } from '../env/server.mjs'
import useAuth from '../utils/hooks/useAuth'

// types
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'

const Login: NextPage = ({
  appID,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [isLoading, isAuthenticated, { user, logout }] = useAuth()

  useEffect(() => {
    require('@passageidentity/passage-elements/passage-auth')
  }, [])

  return (
    <div className='w-screen h-screen flex flex-col text-neutral-900 bg-white dark:text-neutral-200 dark:bg-neutral-800 overkill'>
      <Navigation appID={appID} />
      <div className='flex grow flex-col jusftify-center items-center p-8'>
        {!isLoading && isAuthenticated ? (
          <div className='w-64'>
            <h2 className='text-2xl'>Welcome back</h2>
            <p>{user && user.email}</p>
            <Link href='/dashboard'>
              <button
                type='button'
                className='w-full p-2 mt-4 mb-1 bg-blue-600 hover:bg-blue-500 focus:bg-blue-500 rounded-md'
              >
                Go to Dashboard
              </button>
            </Link>
            <div className='flex grow flex-row justify-between'>
              <span>Not you?</span>
              <button type='button' onClick={logout} className='underline'>
                Log out
              </button>
            </div>
          </div>
        ) : (
          <passage-auth app-id={appID} />
        )}
      </div>
    </div>
  )
}

export default Login

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      appID: env.PASSAGE_APP_ID,
    },
  }
}
