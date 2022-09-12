import React, { useEffect, useState } from 'react'
import { useToggle } from '../../../utils/hooks'
import { BlankCard } from './Blank'
import { Chariot } from './Chariot'
import { Death } from './Death'
import { Devil } from './Devil'
import { Emperor } from './Emperor'
import { Empress } from './Empress'
import { Fool } from './Fool'
import { HangedMan } from './HangedMan'
import { Hermit } from './Hermit'
import { Hierophant } from './Hierophant'
import { HighPriestess } from './HighPriestess'
import { Judgement } from './Judgement'
import { Justice } from './Justice'
import { Lovers } from './Lovers'
import { Magician } from './Magician'
import { Moon } from './Moon'
import { Star } from './Star'
import { Strength } from './Strength'
import { Sun } from './Sun'
import { Temperance } from './Temperance'
import { Tower } from './Tower'
import { WheelOfFortune } from './WheelOfFortune'
import { World } from './World'

const DECK_SIZE = 22
type SelectedProps = {
  index: number
  className?: string
  clickHandler?: () => void
}
const Selected: React.FC<SelectedProps> = ({ index, ...rest }) => {
  if (index === 0) return <Chariot {...rest} />
  if (index === 1) return <Death {...rest} />
  if (index === 2) return <Devil {...rest} />
  if (index === 3) return <Emperor {...rest} />
  if (index === 4) return <Empress {...rest} />
  if (index === 5) return <Fool {...rest} />
  if (index === 6) return <HangedMan {...rest} />
  if (index === 7) return <Hermit {...rest} />
  if (index === 8) return <Hierophant {...rest} />
  if (index === 9) return <HighPriestess {...rest} />
  if (index === 10) return <Judgement {...rest} />
  if (index === 11) return <Justice {...rest} />
  if (index === 12) return <Lovers {...rest} />
  if (index === 13) return <Magician {...rest} />
  if (index === 14) return <Moon {...rest} />
  if (index === 15) return <Star {...rest} />
  if (index === 16) return <Strength {...rest} />
  if (index === 17) return <Sun {...rest} />
  if (index === 18) return <Temperance {...rest} />
  if (index === 19) return <Tower {...rest} />
  if (index === 20) return <WheelOfFortune {...rest} />

  return <World {...rest} />
}

type CardProps = {
  chosen: number[]
  set: React.Dispatch<React.SetStateAction<number[]>>
  title: string
}
export const Card: React.FC<CardProps> = ({ chosen, set, title }) => {
  const [isShown, setIsShown] = useToggle(false)
  const [isReversed, setIsReversed] = useToggle(false)
  const [selectedCard, setSelectedCard] = useState<number>(0)

  const toggleShown = () => {
    if (!isShown) {
      console.log('clicked')
      let chosenCard = Math.floor(Math.random() * DECK_SIZE)
      while (chosen.includes(chosenCard)) {
        chosenCard = Math.floor(Math.random() * DECK_SIZE)
      }
      set((prev) => [...prev, chosenCard])
      setIsReversed(Boolean(Math.round(Math.random())))
      setSelectedCard(chosenCard)
      setIsShown(true)
    }
  }

  return (
    <div className="h-56 md:h-72 lg:h-96 w-[196px] perspective">
      <div
        className={`${
          isShown ? 'flip-horizontal ' : ''
        }relative w-full h-full preserve-3d transition-transform duration-1000`}
      >
        <Selected
          className={`${
            isReversed ? 'flip-vertical ' : ''
          }absolute inset-0 h-full w-full backface-hidden flip-horizontal`}
          index={selectedCard}
        />
        <BlankCard
          className="absolute inset-0 h-full w-full backface-hidden"
          clickHandler={() => toggleShown()}
        />
      </div>
      {isShown && <h4 className="w-full text-center font-title">{title}</h4>}
    </div>
  )
}

export const Tarot = () => {
  const [chosen, setChosen] = useState<number[]>([])
  useEffect(() => {
    console.log(chosen)
  }, [chosen])

  return (
    <div className="absolute inset-0 z-10 w-full h-full flex justify-center items-center gap-4">
      <div className="absolute top-44 left-0 right-0 mx-auto w-full text-center">
        <h2 className="text-3xl font-bold">
          {chosen.length === 3 ? 'Your Path is revealed' : 'Reveal Your Fate'}
        </h2>
      </div>
      <Card chosen={chosen} set={setChosen} title="Past" />
      <Card chosen={chosen} set={setChosen} title="Present" />
      <Card chosen={chosen} set={setChosen} title="Future" />
    </div>
  )
}
