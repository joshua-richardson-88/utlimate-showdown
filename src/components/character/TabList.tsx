import type { FC } from 'react'
import type { Character } from '@prisma/client'
import CharacterTab from './Tab'

const CharacterTabList: FC<{
  data?: Character[]
  active: number
  set: (x: number) => void
}> = ({ active, data, set }) => {
  return (
    <div className='w-full md:w-[250px] xl:w-[300px] h-[86.2vh] shrink-0 p-2 bg-black/10 grid grid-rows-[2rem_1fr_2.5rem] gap-3 overflow-hidden'>
      <h2 className='text-2xl text-center'>Characters</h2>
      <div className='grow flex flex-col gap-2 overflow-y-auto scrollbar'>
        {data &&
          data.map((c) => (
            <CharacterTab
              c={c}
              key={c.id}
              isActive={c.id === active}
              setActive={set}
            />
          ))}
      </div>
      <button
        onClick={() => set(-1)}
        className='w-full p-2 text-xl text-bold rounded-md bg-emerald-600 hover:bg-emerald-500 focus:bg-emerald-500 disabled:bg-emerald-900 select-none cursor-pointer disabled:cursor-not-allowed'
        disabled={active === -1}
      >
        +
      </button>
    </div>
  )
}
export default CharacterTabList
