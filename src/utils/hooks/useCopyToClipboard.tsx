import { useState } from 'react'

export default function useCopyToClipboard() {
  const [value, setValue] = useState<string | null>()
  const copy = async (text: string) => {
    if (!navigator.clipboard) return false

    try {
      await navigator.clipboard.writeText(text)
      setValue(text)
      return true
    } catch (error) {
      setValue(null)
      return false
    }
  }

  return [value, copy] as const
}
