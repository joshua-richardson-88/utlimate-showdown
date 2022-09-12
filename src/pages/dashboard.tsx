// modules
import Link from 'next/link'
import Router from 'next/router'
import { Passage } from '@passageidentity/passage-js'
import { useEffect, useMemo } from 'react'

// project files
import { env } from '../env/server.mjs'
import { trpc } from '../utils/trpc'
import CardView from '../components/Cards'

// types
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Navigation from '../components/Navigation'

const Unauthorized = () => (
  <div className='w-full h-full p-4 flex flex-col items-center text-white'>
    <h1 className='text-3xl mb-8 font-bold'>Unauthorized</h1>
    <p>You are not logged in, either refresh after a few moments or</p>
    <div className='flex flex-row'>
      <div className='text-white underline decoration-white hover:text-blue-100'>
        <Link href='/'>Login</Link>
      </div>
      <div>&nbsp;to continue</div>
    </div>
  </div>
)

const Dashboard = ({
  appID,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data: isAuthenticated, error } = trpc.useQuery([
    'auth.isAuthenticated',
  ])
  const passage = useMemo(() => new Passage(appID), [])

  // useEffect(() => {
  //   if (error && error.data?.code === 'FORBIDDEN') {
  //     passage.signOut()
  //     Router.push('/')
  //   }
  // }, [passage, error])

  return (
    <div className='w-screen h-screen bg-neutral-700 text-white flex flex-col overflow-hidden overkill'>
      <Navigation appID={appID} />
      <div className='grow p-8'>
        {isAuthenticated ? <CardView /> : <Unauthorized />}
      </div>
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
