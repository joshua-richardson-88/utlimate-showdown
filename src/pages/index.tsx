// modules
import Head from 'next/head'

// project files
import Slider from '../components/icons/Slider'

// types
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Navigation from '../components/Navigation'
import { env } from '../env/server.mjs'

const Home: NextPage = ({
  appID,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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
        <Navigation appID={appID} />
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
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      appID: env.PASSAGE_APP_ID,
    },
  }
}
