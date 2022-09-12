import { useState } from 'react'

type FilterFn<T> = (x: T, i: number) => boolean

export default function useArray<T>(defaultValue: T[]) {
  if (defaultValue == null) throw new Error('initial value must be provided')
  if (!Array.isArray(defaultValue))
    throw new Error('initial value must be array')

  const [array, setArray] = useState(defaultValue)

  const clear = () => setArray([])
  const filter = (c: FilterFn<T>) => setArray((p) => p.filter(c))
  const push = (x: T) => setArray((p) => [...p, x])
  const remove = (i: number) =>
    setArray((p) => [...p.slice(0, i), ...p.slice(i + 1)])
  const update = (i: number, x: T) =>
    setArray((p) => p.map((e, ci) => (ci === i ? x : e)))

  return { array, set: setArray, push, filter, update, remove, clear }
}
