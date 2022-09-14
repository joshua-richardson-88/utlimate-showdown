import { CSSProperties, useEffect, useState } from 'react'
import { trpc } from '../utils/trpc'
import type { Character } from '@prisma/client'

type CharTabProps = {
  c: Character
  isActive: boolean
  setActive: (x: number) => void
}
type CharDetailProps = {
  c?: Character
}
const heroBadgeStyle = (i: string, b: string, c: string) => ({
  overflow: 'hidden',
  aspectRatio: '1 / 1',
  padding: '0.25rem',
  borderRadius: '9999px',
  borderWidth: '4px',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  width: '4rem',
  backgroundImage: `url(${i})`,
  borderColor: `${b}`,
  backgroundColor: `${c}`,
})
const CharacterTab: React.FC<CharTabProps> = ({
  c: { bg_border, bg_color, id, icon, name },
  isActive,
  setActive,
}) => {
  const [effect, setEffect] = useState(false)

  const setter = () => {
    setEffect(true)
    setActive(id)
    console.log('colors: ', bg_border, bg_color)
  }
  return (
    <div
      className={`${
        isActive
          ? 'bg-white/30 hover:bg-white/40 focus:bg-white/40'
          : 'bg-white/10 hover:bg-white/20 focus:bg-white/20'
      } p-2 rounded-md flex flex-row justify-between items-center cursor-pointer select-none ${
        effect && 'animate-wiggle'
      }`}
      onAnimationEnd={() => setEffect(false)}
      onClick={setter}
    >
      <div
        style={heroBadgeStyle(`/assets/icons/${icon}`, bg_border, bg_color)}
      />
      {name}
    </div>
  )
}
const Data: React.FC<{ t: string; c?: string; s?: CSSProperties }> = ({
  t,
  c,
  s,
}) => (
  <span className={`mt-2 h-4 ${c}`} style={s}>
    {t}
  </span>
)
const Header: React.FC<{ t: string; c?: string }> = ({ t, c }) => (
  <span className={`text-lg font-semibold border-b border-b-white ${c}`}>
    {t}
  </span>
)
const Line: React.FC<{ h: string; d: string; c?: string }> = ({ h, d, c }) => {
  const isColor = h === 'Color' || h === 'Border'
  const info = {
    t: isColor ? '' : d,
    c: isColor ? 'rounded-full w-4 self-center' : 'text-center',
    s: { backgroundColor: d },
  }
  return (
    <div className={`flex flex-col ${c}`}>
      <Header t={h} c={'text-center'} />
      <Data {...info} />
    </div>
  )
}
const CharacterDetail: React.FC<CharDetailProps> = ({ c }) => {
  if (c == null) return null
  const { id, image_back, isHero, name, style_1, style_2, ...lines } = c
  const type = `
    ${style_1[0]?.toUpperCase()}${style_1.slice(1)}
    ${
      style_2 != null && style_2 !== style_1
        ? ` / ${style_2[0]?.toUpperCase()}${style_2.slice(1)}`
        : ''
    }
  `

  return (
    <div className='grow p-6 flex flex-col'>
      <div className='flex flex-row gap-2 items-end'>
        <h2 className='text-2xl font-bold'>{name}</h2>
        <span className='text-2xl'>{isHero ? '👼' : '👿'}</span>
        <span>{type}</span>
        <p></p>
      </div>
      <div className='grid grid-cols-5 m-2'>
        {Object.entries(lines).map(([k, v]) => {
          const h =
            k === 'bg_color'
              ? 'Color'
              : k === 'bg_border'
              ? 'Border'
              : `${k[0]?.toUpperCase()}${k.slice(1)}`
          console.log('icon:', h === 'Icon')
          return (
            <Line
              key={k}
              h={h}
              d={`${v}`}
              c={h === 'Icon' ? 'col-span-2' : ''}
            />
          )
        })}
        {/* <div className='flex flex-col'>
          <span className='text-lg font-semibold border-b border-b-white'>
            Health
          </span>
          <span className='mt-2 h-4'>{c.health}</span>
        </div>
        <div className='flex flex-col col-span-2'>
          <span className='text-lg font-semibold border-b border-b-white'>
            Type
          </span>
          <span className='mt-2 h-4'>{c.type}</span>
        </div>
        <div className='flex flex-col'>
          <span className='text-lg font-semibold border-b border-b-white'>
            Border Color
          </span>
          <div className='flex justify-center mt-2 h-4'>
            <span
              className={`w-4 h-4 rounded-full mr-10`}
              style={{ backgroundColor: c.bg_border }}
            />
          </div>
        </div>
        <div className='flex flex-col'>
          <span className='text-lg font-semibold border-b border-b-white'>
            Icon
          </span>
          <span className='mt-2 h-4'>
            {c.icon.replace('/assets/icons/', '')}
          </span>
        </div> */}
      </div>
    </div>
  )
}

const CardView = () => {
  const { data } = trpc.useQuery(['character.getAll'])
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    if (data != null && data[0] != null) setActiveTab(data[0].id)
  }, [data])

  return (
    <div className='w-full h-[calc(100vh - 72px - 4rem)] container mx-auto bg-black/10 rounded-sm flex flex-row items-stretch'>
      <div className='w-full md:w-[250px] xl:w-[300px] h-[86.2vh] shrink-0 p-2 bg-black/10 grid grid-rows-[2rem_1fr_2.5rem] gap-3 overflow-hidden'>
        <h2 className='text-2xl text-center'>Characters</h2>
        <div className='grow flex flex-col gap-2 overflow-y-auto scrollbar'>
          {data &&
            data.map((c) => (
              <CharacterTab
                c={c}
                key={c.id}
                isActive={c.id === activeTab}
                setActive={setActiveTab}
              />
            ))}
        </div>
        <button className='w-full p-2 text-xl text-bold rounded-md bg-emerald-600 hover:bg-emerald-500 focus:bg-emerald-500 select-none cursor-pointer'>
          +
        </button>
      </div>
      <div className='hidden md:flex grow p-6'>
        {data && <CharacterDetail c={data.find((c) => c.id === activeTab)} />}
      </div>
    </div>
  )
}

export default CardView
