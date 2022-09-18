// modules
import { useState } from 'react'

// project files
// types
import { Character } from '@prisma/client'

type Props = {
  c: Character
  isActive: boolean
  setActive: (x: number) => void
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
const CharacterTab: React.FC<Props> = ({
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
      <div style={heroBadgeStyle(icon, bg_border, bg_color)} />
      {name}
    </div>
  )
}
export default CharacterTab
