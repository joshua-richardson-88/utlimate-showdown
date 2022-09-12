import { useEffect } from 'react'
import { trpc } from '../utils/trpc'

const CardView = () => {
  const { data } = trpc.useQuery(['character.getAll'])

  useEffect(() => {
    if (data != null) console.log(data)
  }, [data])
  return (
    <div className='w-full h-[calc(100vh - 72px - 4rem)] container mx-auto bg-black/10 rounded-sm flex flex-row items-stretch'>
      <div className='w-1/5 h-[86.2vh] p-2 bg-black/10 grid grid-rows-[2rem_1fr_2.5rem] gap-3 overflow-hidden'>
        <h2 className='text-2xl text-center'>Characters</h2>
        <div className='grow flex flex-col gap-2 overflow-y-auto scrollbar'>
          {data &&
            data.map((c) => (
              <div
                key={c.id}
                className='bg-white/10 hover:bg-white/20 focus:bg-white/20 p-2 rounded-md flex flex-row justify-between items-center cursor-pointer select-none'
              >
                <div
                  className={`overflow-hidden aspect-square p-1 rounded-full border-4 bg-cover bg-center w-16 ${c.bg_color} ${c.icon} ${c.bg_border}`}
                ></div>
                {c.name}
              </div>
            ))}
        </div>
        <button className='w-full p-2 text-xl text-bold rounded-md bg-emerald-600 hover:bg-emerald-500 focus:bg-emerald-500 select-none cursor-pointer'>
          +
        </button>
      </div>
      <div className='grow'></div>
    </div>
  )
}

export default CardView
