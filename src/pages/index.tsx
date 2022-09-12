// modules
import Head from 'next/head'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Passage } from '@passageidentity/passage-js'

// project files
import { env } from '../env/server.mjs'
import { LogoPlaceholderIcon, MenuIcon } from '../components/icons/index'
import Slider from '../components/icons/Slider'
import useToggle from '../utils/hooks/useToggle'

// types
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'

const Content: React.FC<{
  appID: string
}> = ({ appID }) => {
  const [username, setUsername] = useState<string>()
  const [authState, setAuthState] = useState<boolean>()
  const passage = useMemo(() => new Passage(appID), [])

  const logout = useCallback(() => {
    passage.signOut()
    setAuthState(false)
  }, [])

  useEffect(() => {
    if (username == null) {
      passage
        .getCurrentUser()
        .userInfo()
        .then((info) => {
          if (info == null || info.email == null || info.phone == null) {
            logout()
            return
          }

          setAuthState(true)
          setUsername(info?.email == null ? info?.phone : info.email)
        })
    }
  }, [username])

  if (authState == null) return <div>Loading...</div>
  if (!authState) return <passage-auth app-id={appID} />

  return (
    <div className='container mx-auto w-1/3 flex flex-col items-stretch p-8'>
      <h2 className='text-2xl'>Welcome back</h2>
      <p>{username}</p>
      <Link href='/dashboard'>
        <button
          type='button'
          className='p-2 mt-4 mb-1 bg-blue-600 hover:bg-blue-500 focus:bg-blue-500 rounded-md'
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
  )
}

const Home: NextPage = ({
  appId,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [isOpen, setOpen] = useToggle(false)
  useEffect(() => {
    require('@passageidentity/passage-elements/passage-auth')
  }, [])

  return (
    <>
      <Head>
        <title>Ultimate Showdown</title>
        <meta
          name='description'
          content='Ultimate Showdown of Ultimate Destiny Card Game'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='max-w-[2000px] w-screen h-screen mx-auto text-neutral-900 bg-white dark:text-neutral-200 dark:bg-neutral-800'>
        <nav className='mx-auto p-4 bg-navy-600 dark:bg-navy-500'>
          <div className='container mx-auto flex items-center justify-between'>
            <Link href='/' passHref>
              <a
                href='/'
                className='focus:outline-none focus-visible:ring-4 ring-neutral-900 rounded-sm ring-offset-4 ring-offset-navy-600 dark:ring-offset-navy-500 lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:top-9 z-50 hover:opacity-70 transition-opacity'
                aria-label='Go to homepage'
              >
                <LogoPlaceholderIcon className='w-32 md:w-48 lg:w-64 text-neutral-300 cursor-pointer' />
              </a>
            </Link>
            <button
              aria-expanded={`${isOpen}`}
              aria-label='Open Menu'
              type='button'
              onClick={() => setOpen()}
              className='lg:hidden focus:outline-none focus-visible:ring-4 ring-neutral-900 rounded-sm ring-offset-4 ring-offset-navy-600 dark:ring-offset-navy-500 text-neutral-900 hover:text-neutral-600 dark:text-neutral-300 dark:hover:text-neutral-400 transition-colors'
            >
              <MenuIcon className='h-8 w-8' />
            </button>
            <div
              role='menubar'
              className={`${
                isOpen ? 'flex' : 'hidden'
              } z-50 flex-col gap-4 absolute right-0 left-0 top-16 bg-navy-600 dark:bg-navy-500 shadow-xl text-center p-6 text-lg items-center lg:flex lg:flex-row lg:static lg:shadow-none lg:justify-between lg:w-full`}
            >
              <Link href='/home'>
                <a
                  href='/home'
                  className='py-1 px-6 focus:outline-none focus-visible:ring-4 ring-neutral-900 rounded-sm ring-offset-4 ring-offset-navy-600 dark:ring-offset-navy-500 text-neutral-900 hover:text-neutral-600 dark:text-neutral-300 dark:hover:text-neutral-400 transition-colors'
                  role='menuitem'
                >
                  Home
                </a>
              </Link>
              <Link href='/contact'>
                <a
                  href='/contact'
                  className='lg:mr-auto py-1 px-6 focus:outline-none focus-visible:ring-4 ring-neutral-900 rounded-sm ring-offset-4 ring-offset-navy-600 dark:ring-offset-navy-500 text-neutral-900 hover:text-neutral-600 dark:text-neutral-300 dark:hover:text-neutral-400 transition-colors'
                  role='menuitem'
                >
                  Contact
                </a>
              </Link>
              <Link href='/login'>
                <a
                  href='/login'
                  className='py-1 px-6 focus:outline-none focus-visible:ring-4 ring-neutral-900 rounded-sm ring-offset-4 ring-offset-navy-600 dark:ring-offset-navy-500 text-neutral-900 hover:text-neutral-600 dark:text-neutral-300 dark:hover:text-neutral-400 transition-colors'
                  role='menuitem'
                >
                  Login
                </a>
              </Link>
              <Link href='/signup'>
                <a
                  href='/signup'
                  className='py-2 px-6 rounded-md bg-purple-400 hover:shadow-xl transition-shadow focus:outline-none focus-visible:ring-4 ring-neutral-900 ring-offset-4 ring-offset-navy-600 dark:ring-offset-navy-500 text-neutral-900 font-bold'
                  role='menuitem'
                >
                  Sign Up
                </a>
              </Link>
            </div>
          </div>
        </nav>
        <header className='relative h-3/4 overflow-hidden'>
          <div className='absolute inset-0 w-full h-full block bg-black bg-[url(/assets/stars.png)] bg-repeat bg-[top center]'></div>
          <div className='absolute inset-0 w-full h-full block bg-transparent bg-[url(/assets/twinkling.png)] bg-repeat bg-[top center] animate-twinkle'></div>
          <Slider />
        </header>
        <main className='grid gap-12 sm:gap-16 md:gap-24 lg:gap-32 px-8 overflow-hidden'>
          <section aria-labelledby='qualities' className='relative'>
            <h2 id='qualities' className='sr-only'>
              Our Qualities
            </h2>
            <div className='container'>
              <div className='grid'>
                <div></div>
              </div>
            </div>
          </section>
        </main>
      </div>
      {/* <main className='w-screen h-screen overscroll-none bg-neutral-800 text-white'>
        <Banner />
        <Content appID={appId} />
      </main> */}
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      appId: env.PASSAGE_APP_ID,
    },
  }
}
