// modules
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { trpc } from '../../utils/trpc'

// project files
// types
import type { Playstyle } from '@prisma/client'
import type { FormEvent, FC } from 'react'
import { useClickOutside, useToggle } from '../../utils/hooks'
import { HexColorInput, HexColorPicker } from 'react-colorful'
import { useQueryClient } from 'react-query'

type ItemProps<T> = {
  title: string
  value: T
  update: (x: T) => void
}
type ChooseProps<T> = {
  title: string
  update: (x: T) => void
}
const TextInput: FC<ItemProps<string>> = ({ title, update, value }) => (
  <label className='flex flex-col col-span-4 lg:col-span-3'>
    {title}
    <input
      className='outline-none bg-inherit rounded-t-md border-b-2 pt-2 pl-2 border-b-white hover:bg-white/20 active:bg-white/20 active:border-b-blue-600 focus:bg-white/20 focus:border-b-blue-600'
      onChange={(e) => update(e.currentTarget.value)}
      name='character'
      type='text'
      value={value}
    />
  </label>
)
const NumberInput: FC<ItemProps<number>> = ({ title, update, value }) => (
  <label className='flex flex-col col-span-2 lg:col-span-1'>
    {title}
    <input
      autoComplete='off'
      className='outline-none bg-inherit rounded-t-md border-b-2 pt-2 pl-2 border-b-white hover:bg-white/20 active:bg-white/20 active:border-b-blue-600 focus:bg-white/20 focus:border-b-blue-600'
      onChange={(e) => update(+e.currentTarget.value)}
      type='number'
      min={1}
      value={value}
    />
  </label>
)
const CheckInput: FC<ItemProps<boolean>> = ({ title, update, value }) => (
  <div className='flex flex-col gap-2 lg:items-center col-span-2'>
    {title}
    <label className='inline-flex relative items-center ml-2 mr-5 cursor-pointer select-none'>
      <input
        type='checkbox'
        value=''
        className='sr-only peer'
        checked={value}
        onChange={(e) => update(e.currentTarget.checked)}
      />
      <div
        className={`
        w-11 h-6 
        bg-gray-200 
        rounded-full 
        peer 
        peer:bg-red-600
        peer-focus:ring-1 peer-focus:ring-red-300 
        dark:peer-focus:ring-neutral-100/50 dark:bg-red-600 
        peer-checked:after:translate-x-full peer-checked:after:border-white 
        after:content-[''] 
        after:absolute 
        after:top-0.5 after:left-[2px] 
        after:bg-white 
        after:rounded-full 
        after:h-5 after:w-5 
        after:transition-all 
        peer-checked:bg-green-600
      `}
      />
      <span className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
        {value ? '👼' : '👿'}
      </span>
    </label>
  </div>
)
const ChooseInput: FC<ChooseProps<Playstyle>> = ({ title, update }) => {
  const [state, setState] = useState(0)
  const options = [title, 'Controller', 'Defender', 'Leader', 'Striker']

  useEffect(() => {
    state !== 0 && update((options[state] as string).toLowerCase() as Playstyle)
  }, [state])
  return (
    <>
      <label htmlFor={title} className='sr-only'>
        {title} select
      </label>
      <select
        id={title}
        className='col-span-2 form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-neutral-300 bg-neutral-800 bg-clip-padding bg-no-repeat border border-solid border-neutral-500 rounded transition ease-in-out m-0 focus:text-white focus:bg-white/20 focus:border-blue-600 focus:border-b-2 focus:outline-none'
        value={state}
        onChange={(e) => setState(+e.currentTarget.value)}
      >
        {options.map((o, i) => (
          <option
            key={i}
            className={`${
              i === 0
                ? 'mt-0 border-b border-b-dashed border-b-neutral-100 '
                : ''
            } bg-neutral-800 mt-10`}
            value={i}
          >
            {o}
          </option>
        ))}
      </select>
    </>
  )
}
const ColorInput: FC<ItemProps<string>> = ({ title, update, value }) => {
  const [isOpen, toggle] = useToggle(false)
  const menu = useRef<HTMLDivElement>(null)
  useClickOutside(menu, () => toggle(false))
  return (
    <div className='flex flex-col col-span-2 lg:col-span-1 gap-2 items-center relative'>
      {title}
      <div
        className='w-4 h-4 rounded border border-neutral-200'
        style={{ backgroundColor: value }}
        onClick={() => toggle(true)}
      />
      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } absolute top-12 left-2 rounded shadow-lg p-2 bg-neutral-800`}
        ref={menu}
      >
        <HexColorPicker color={value} onChange={update} />
        <HexColorInput
          className='w-full mt-2 p-2 rounded-md bg-neutral-700 text-neutral-100'
          color={value}
          alpha={true}
          prefixed={true}
          onChange={update}
        />
      </div>
    </div>
  )
}
const FileInput: FC<ItemProps<string | null>> = ({ title, update, value }) => {
  const [fileInput, setFileInput] = useState<File | null | undefined>()
  const [previewSource, setPreviewSource] = useState<string | null>(null)
  const [previewError, setPreviewError] = useState(false)

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    setPreviewError(false)
    const file = e.currentTarget.files && e.currentTarget.files[0]
    setFileInput(file)
  }
  useEffect(() => {
    if (fileInput != null) {
      const reader = new FileReader()
      reader.readAsDataURL(fileInput)
      reader.onloadend = () => {
        setPreviewSource(reader.result as string)
        update(reader.result as string)
      }
    }
  }, [fileInput])

  return (
    <div className='col-span-2 lg:col-span-3 flex flex-col gap-2'>
      <h3 className=''>{title}</h3>
      <label className='p-2 bg-blue-500 rounded cursor-pointer select-none text-center'>
        Select File
        <input
          type='file'
          name={title}
          onChange={handleFileInput}
          className='sr-only'
        />
      </label>
      {previewSource && !previewError && (
        <img
          className={`${
            title === 'Icon' && 'aspect-square rounded-full '
          }overflow-hidden p-1 bg-cover bg-center w-20 self-center`}
          src={`${previewSource}`}
          alt={`preview of ${title}`}
          onError={() => setPreviewError(true)}
        />
      )}
      {previewError && (
        <span className='text-red-500'>
          Can't Preview image, unsupported file type
        </span>
      )}
    </div>
  )
}
type Props = {
  set: (x: number) => void
}
const NewCharacter: FC<Props> = ({ set }) => {
  const queryClient = useQueryClient()
  const [name, setName] = useState('')
  const [isHero, setIsHero] = useState(true)
  const [style_1, setStyle_1] = useState<Playstyle>('controller')
  const [style_2, setStyle_2] = useState<Playstyle>('controller')
  const [health, setHealth] = useState(1)
  const [image, setImage] = useState<string | null>(null)
  const [icon, setIcon] = useState<string | null>(null)
  const [color, setColor] = useState('#000000')
  const [border, setBorder] = useState('#000000')

  const { mutate, error, status } = trpc.useMutation(['character.addNew'], {
    onSuccess: () => {
      queryClient.invalidateQueries(['character.getAll'])
    },
  })
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (image == null || icon == null) return
    mutate({
      name,
      isHero,
      style_1,
      style_2,
      health,
      image_back: image,
      icon,
      bg_border: border,
      bg_color: color,
    })
  }

  useEffect(() => {
    console.log('status: ', status)
    if (status === 'success') {
      setName('')
      setIsHero(true)
      setStyle_1('controller')
      setStyle_2('controller')
      setHealth(1)
      setImage('')
      setIcon('')
      setColor('#000000')
      setBorder('#000000')
      set(0)
    }
  }, [status])

  return (
    <div className='w-full max-w-screen-sm p-6 flex flex-col'>
      <h2 className='text-3xl font-bold'>Create Character</h2>
      <form onSubmit={handleSubmit} className='w-full h-full p-4 flex flex-col'>
        <div className='grid grid-cols-4 lg:grid-cols-6 gap-4'>
          <TextInput title='Character Name' value={name} update={setName} />
          <CheckInput title='Hero/Villain' value={isHero} update={setIsHero} />
          <NumberInput title='Health' value={health} update={setHealth} />
          <ChooseInput title='Primary Playstyle' update={setStyle_1} />
          <ChooseInput title='Secondary Playstyle' update={setStyle_2} />
          <ColorInput title='Color' value={color} update={setColor} />
          <ColorInput title='Border' value={border} update={setBorder} />
          <FileInput title='Icon' value={icon} update={setIcon} />
          <FileInput title='Card Back' value={image} update={setImage} />
          <button
            className={`${
              status === 'loading' ? 'bg-emerald-900 ' : 'bg-emerald-500 '
            }mt-4 p-2 rounded flex flex-row items-center justify-center col-span-4 lg:col-span-2`}
            type='submit'
            disabled={status === 'loading'}
          >
            {status === 'loading' && (
              <svg
                role='status'
                className='inline mr-3 w-4 h-4 text-white animate-spin'
                viewBox='0 0 100 101'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                  fill='#E5E7EB'
                />
                <path
                  d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                  fill='currentColor'
                />
              </svg>
            )}
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewCharacter
