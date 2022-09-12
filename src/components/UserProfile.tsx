// modules
import Link from 'next/link'
import { useCallback, useEffect, useMemo } from 'react'
import { Passage } from '@passageidentity/passage-js'

// project files
import { useToggle } from '../utils/hooks'
import { trpc } from '../utils/trpc'
import { useRouter } from 'next/router'
import { ProfileIcon } from './icons'

const UserProfile: React.FC<{ appID: string }> = ({ appID }) => {
  const router = useRouter()
  const [isOpen, toggleOpen] = useToggle(false)
  const {
    data: user,
    isLoading,
    error,
  } = trpc.useQuery(['auth.getUserData'], { retry: false })
  const { invalidateQueries, setQueryData } = trpc.useContext()
  const passage = useMemo(() => new Passage(appID), [])
  const logout = useCallback(() => {
    passage.signOut()
    invalidateQueries(['auth.getUserData'], {
      refetchActive: false,
      refetchInactive: false,
    }).then(() => {
      router.push('/')
    })
  }, [invalidateQueries])

  useEffect(() => console.log('user: ', user), [user])

  if (isLoading) return null
  if (user == null || error?.data?.code === 'FORBIDDEN')
    return (
      <Link href='/login'>
        <span
          role='menuitem'
          className='py-2 px-6 rounded-md bg-emerald-700 hover:bg-emerald-600 hover:shadow-xl transition-all focus:outline-none focus-visible:ring-4 ring-neutral-900 ring-offset-4 ring-offset-navy-600 dark:ring-offset-navy-500 text-neutral-300 hover:text-neutral-900 font-bold select-none cursor-pointer'
        >
          Login
        </span>
      </Link>
    )

  return (
    <div>
      <div className='w-full xl:hidden flex flex-col gap-4'>
        <h2 className='w-full border-b border-b-neutral-400'>Profile</h2>
        <div className='hover:bg-neutral-900/50 rounded-md px-4 py-1'>
          <Link href='/profile'>{user.email}</Link>
        </div>
        <button
          onClick={logout}
          className='px-4 py-1 bg-emerald-700 hover:bg-emerald-600 text-neutral-100 rounded-md'
        >
          Sign Out
        </button>
      </div>
      <div className='hidden xl:block relative w-10 h-10'>
        <div
          className={`rounded p-2 cursor-pointer select-none z-10 absolute inset-0 flex justify-center items-center ${
            isOpen ? 'bg-neutral-900 hover:bg-white/10' : 'hover:bg-black/40'
          }`}
          onClick={() => toggleOpen()}
        >
          <ProfileIcon className='m-0 w-8 h-8' />
        </div>
        {isOpen && (
          <div className='absolute -right-2 -top-2 pt-14 flex flex-col items-start bg-neutral-900 rounded-md p-4 gap-2 select-none'>
            <p className='w-full border-t border-t-neutral-400 text-left pt-4'>
              Welcome back
            </p>
            <p>{user.email}</p>

            <button
              onClick={logout}
              className='px-4 py-1 bg-emerald-700 hover:bg-emerald-600 text-neutral-100 rounded-md w-full'
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserProfile