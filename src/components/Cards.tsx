import { useEffect, useState } from 'react'
import { trpc } from '../utils/trpc'
import { CharacterDetail, CharacterTabList, NewCharacter } from './character'

const CardView = () => {
  const { data } = trpc.useQuery(['character.getAll'])
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    if (data != null && data[0] != null) setActiveTab(data[0].id)
  }, [data])

  return (
    <div className='w-full h-[calc(100vh - 72px - 4rem)] container mx-auto bg-black/10 rounded-sm flex flex-row items-stretch'>
      <CharacterTabList data={data} active={activeTab} set={setActiveTab} />
      <div className='hidden md:flex grow p-6'>
        {activeTab === -1 && <NewCharacter set={setActiveTab} />}
        {data && activeTab >= 0 && (
          <CharacterDetail c={data.find((c) => c.id === activeTab)} />
        )}
      </div>
    </div>
  )
}

export default CardView
