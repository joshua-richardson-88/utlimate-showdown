import { useState } from 'react'

export default function useToggle(defaultValue: boolean) {
  if (defaultValue == null)
    throw new TypeError('initial value must be included')
  if (typeof defaultValue != 'boolean')
    throw new Error('initial value must be a boolean')

  const [value, setValue] = useState(defaultValue)

  const toggleValue = (x?: boolean) => setValue((p) => (x != null ? x : p))

  return [value, toggleValue] as const
}
