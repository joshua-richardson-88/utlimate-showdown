import Link from 'next/link'
import { useRouter } from 'next/router'
import { NavProps } from '.'
import { useClickOutside } from '../../utils/hooks'
import { useRef } from 'react'

type IconProps = { show: boolean }
const CloseIcon: React.FC<IconProps> = ({ show }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className={`h-6 w-6 ${!show && 'invisible'}`}
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
    strokeWidth='2'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M6 18L18 6M6 6l12 12'
    />
  </svg>
)
const CompendiumIcon: React.FC<IconProps> = ({ show }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-8 w-8'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
    strokeWidth='2'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
    />
  </svg>
)
const CampaignIcon: React.FC<IconProps> = ({ show }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-8 w-8'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
    strokeWidth='2'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    />
  </svg>
)
const UserIcon: React.FC<IconProps> = ({ show }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-8 w-8'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
    strokeWidth='2'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z'
    />
  </svg>
)
const SettingsIcon: React.FC<IconProps> = ({ show }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-8 w-8'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
    strokeWidth='2'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
    />
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
    />
  </svg>
)

type LinkProps = {
  currentPath: string
  linkPath: string
  show: boolean
  title: string
}
const NavLink: React.FC<LinkProps> = ({
  currentPath,
  linkPath,
  show,
  title,
}) => {
  let Icon
  switch (title) {
    case 'Compendium':
      Icon = CompendiumIcon
      break
    case 'Campaign Manager':
      Icon = CampaignIcon
      break
    case 'User Profile':
      Icon = UserIcon
      break
    case 'Settings':
      Icon = SettingsIcon
      break
    default:
      break
  }

  return (
    <Link href={linkPath}>
      <a
        className={`w-full font-semibold text-primary flex ${
          !show && 'justify-end'
        } items-center gap-x-2 ${
          currentPath === linkPath ? 'text-primary' : 'text-slate-400'
        }`}
      >
        {Icon && <Icon show={show} />}
        {show && title}
      </a>
    </Link>
  )
}

const Drawer: React.FC<NavProps> = ({ showDrawer, toggle }) => {
  const router = useRouter()
  const drawerRef = useRef<HTMLDivElement>(null)
  useClickOutside(drawerRef, () => toggle(false))

  return (
    <aside
      ref={drawerRef}
      className={`
      absolute left-0 h-screen
      top-0 md:top-12
      w-3/4 md:w-[14rem] 
      bg-neutral-200 dark:bg-neutral-700
      ${
        showDrawer
          ? 'translate-x-0'
          : '-translate-x-full md:-translate-x-[10rem] xl:translate-x-0'
      }
      transition transform duration-500 ease-in-out
    `}
    >
      <div className='flex flex-row-reverse md:p-4 p-8 justify-between w-full'>
        <button
          type='button'
          className={`${!showDrawer && 'md:invisible'}`}
          onClick={() => toggle(false)}
          title='Menu Close'
        >
          <CloseIcon show={showDrawer} />
        </button>
      </div>
      <div className='flex flex-col md:px-4 px-8 space-y-3 h-[calc(100vh-10rem)]'>
        <NavLink
          currentPath={router.pathname}
          linkPath='/home/#'
          show={showDrawer}
          title='Compendium'
        />
        <NavLink
          currentPath={router.pathname}
          linkPath='/home/#'
          show={showDrawer}
          title='Campaign Manager'
        />
        <div className='flex-1' />
        <NavLink
          currentPath={router.pathname}
          linkPath='/home/#'
          show={showDrawer}
          title='User Profile'
        />
        <NavLink
          currentPath={router.pathname}
          linkPath='/home/#'
          show={showDrawer}
          title='Settings'
        />
      </div>
    </aside>
  )
}
export default Drawer
