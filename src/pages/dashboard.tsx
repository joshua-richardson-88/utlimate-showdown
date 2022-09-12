// modules
import Link from 'next/link'
import Router from 'next/router'
import { Passage } from '@passageidentity/passage-js'
import { useEffect } from 'react'

// project files
import { env } from '../env/server.mjs'
import { trpc } from '../utils/trpc'
import CardView from '../components/Cards'

// types
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'

const Loading = () => (
  <div className='border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto'>
    <div className='animate-pulse flex space-x-4'>
      <div className='rounded-full bg-slate-700 h-10 w-10'></div>
      <div className='flex-1 space-y-6 py-1'>
        <div className='h-2 bg-slate-700 rounded'></div>
        <div className='space-y-3'>
          <div className='grid grid-cols-3 gap-4'>
            <div className='h-2 bg-slate-700 rounded col-span-2'></div>
            <div className='h-2 bg-slate-700 rounded col-span-1'></div>
          </div>
          <div className='h-2 bg-slate-700 rounded'></div>
        </div>
      </div>
    </div>
  </div>
)
const ViewLogout = () => (
  <div>
    <p className='mb-4'>
      You have not logged in and cannot view the dashboard.
    </p>
    <Link href='/'>Login to continue</Link>
  </div>
)

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

  if (isLoading) return <Loading />

  return (
    <div className='w-screen h-screen bg-neutral-700 text-white p-10'>
      <div className='text-3xl'>
        {isAuthenticated ? 'Welcome' : 'Unauthorized'}
      </div>
      {isAuthenticated ? <CardView /> : <ViewLogout />}
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
