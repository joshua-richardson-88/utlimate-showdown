// modules
// project files
// types
import type { Character } from '@prisma/client'
import type { CSSProperties } from 'react'

type Props = { c?: Character }
type DataProps = { t: string; c?: string; s?: CSSProperties }
type HeaderProps = { t: string; c?: string }
type LineProps = { h: string; d: string; c?: string }

const Data: React.FC<DataProps> = ({ t, c, s }) => (
  <span className={`mt-2 h-4 ${c}`} style={s}>
    {t}
  </span>
)
const Header: React.FC<HeaderProps> = ({ t, c }) => (
  <span className={`text-lg font-semibold border-b border-b-white ${c}`}>
    {t}
  </span>
)
const Line: React.FC<LineProps> = ({ h, d, c }) => {
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

const CharacterDetail: React.FC<Props> = ({ c }) => {
  if (c == null) return null
  const { id, image_back, isHero, name, style_1, style_2, icon, ...lines } = c
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
          return (
            <Line
              key={k}
              h={h}
              d={`${v}`}
              c={h === 'Icon' ? 'col-span-2' : ''}
            />
          )
        })}
      </div>
    </div>
  )
}
export default CharacterDetail
