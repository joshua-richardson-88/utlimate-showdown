import React, { useEffect, useState } from 'react'

type Icon = { id: string; source: string; bg: string; border: string }
const icons: Icon[] = [
  {
    id: 'daenerys',
    source: 'bg-[url(/assets/icons/daenerys-4.webp)]',
    bg: 'bg-red-700',
    border: 'border-red-900',
  },
  {
    id: 'master-chief',
    source: 'bg-[url(/assets/icons/chief-3.webp)]',
    bg: 'bg-green-800',
    border: 'border-green-800',
  },
  {
    id: 'team-rocket',
    source: 'bg-[url(/assets/icons/rocket-3.webp)]',
    bg: 'bg-rose-600',
    border: 'border-rose-600',
  },
  {
    id: 'mega-man',
    source: 'bg-[url(/assets/icons/megaman-3.webp)]',
    bg: 'bg-sky-500',
    border: 'border-sky-500',
  },
  {
    id: 'necron',
    source: 'bg-[url(/assets/icons/necron-2.webp)]',
    bg: 'bg-green-300',
    border: 'border-green-300',
  },
  {
    id: 'goku',
    source: 'bg-[url(/assets/icons/goku-3.webp)]',
    bg: 'bg-orange-600',
    border: 'border-orange-600',
  },
  {
    id: 'skynet',
    source: 'bg-[url(/assets/icons/skynet-3.webp)]',
    bg: 'bg-red-500',
    border: 'border-red-600',
  },
  {
    id: 'voldemort',
    source: 'bg-[url(/assets/icons/voldemort-2.webp)]',
    bg: 'bg-violet-700',
    border: 'border-violet-700',
  },
  {
    id: 'xenomorph',
    source: 'bg-[url(/assets/icons/xenomorph-1.webp)]',
    bg: 'bg-transparent',
    border: 'border-lime-400/80',
  },
]

const Slider = () => {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent((p) => (p === icons.length - 1 ? 0 : p + 1))
    }, 4000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className='absolute inset-0'>
      <div className='w-full h-full flex flex-row justify-around items-center'>
        {icons.map((i) => {
          const end = icons.length - 1
          const prev = icons[current === 0 ? end : current - 1]
          const next = icons[current === end ? 0 : current + 1]
          const baseClass =
            'overflow-hidden aspect-square p-1 rounded-full border-8 bg-cover bg-center'
          const baseAlt = baseClass + ' hidden md:block w-44'
          const currentClass = `${baseClass} w-72 ${i.bg} ${i.source} ${i.border}`
          const prevClass =
            prev != null
              ? `${baseAlt} ${prev.bg} ${prev.source} ${prev.border}`
              : baseAlt
          const nextClass =
            next != null
              ? `${baseAlt} ${next.bg} ${next.source} ${next.border}`
              : baseAlt

          if (i.id !== (icons[current] as Icon).id) return null
          return (
            <React.Fragment key={i.id}>
              {prev && <div className={prevClass} />}
              <div className={currentClass} />
              {next && <div className={nextClass} />}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}

export default Slider
