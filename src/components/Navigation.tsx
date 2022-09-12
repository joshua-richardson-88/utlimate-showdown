import Link from 'next/link'
import { useState } from 'react'

import { LogoPlaceholderIcon, MenuIcon } from './icons'

const Nav = () => {
  const [isOpen, setOpen] = useState(false)
  const toggle = () => setOpen((p) => !p)
  return (
    <nav className='p-4 bg-navy-600 dark:bg-navy-500'>
      <div className='container mx-auto flex items-center justify-between'>
        <Link href='/' passHref>
          <a
            href='/'
            className='focus:outline-none focus-visible:ring-4 ring-neutral-900 rounded-sm ring-offset-4 ring-offset-navy-600 dark:ring-offset-navy-500 lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:top-9 z-50 hover:opacity-70 transition-opacity'
            aria-label='Go to homepage'
          >
            <div className='text-neutral-400 cursor-pointer flex flex-row'>
              <LogoPlaceholderIcon className='w-6' />
              <h1 className='ml-2 text-neutral-200 font-title tracking-widest'>
                Ultimate Showdown
              </h1>
            </div>
          </a>
        </Link>
        <button
          aria-expanded={`${isOpen}`}
          aria-label='Open Menu'
          type='button'
          onClick={toggle}
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
          <Link href='/login'>
            <a
              href='/login'
              className='py-2 px-6 rounded-md bg-purple-400 hover:shadow-xl transition-shadow focus:outline-none focus-visible:ring-4 ring-neutral-900 ring-offset-4 ring-offset-navy-600 dark:ring-offset-navy-500 text-neutral-900 font-bold'
              role='menuitem'
            >
              Login
            </a>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Nav
