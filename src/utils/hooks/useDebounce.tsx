import { useEffect } from 'react'
import useTimeout from './useTimeout'

export default function useDebounce(
  callback: () => void,
  delay: number,
  dependencies: any[],
) {
  if (callback == null) throw new Error('callback must be defined')
  if (delay == null) throw new Error('delay must be defined')
  if (dependencies == null) throw new Error('dependencies must be defined')

  if (typeof callback !== 'function')
    throw new Error('callback must be a function')
  if (typeof delay !== 'number') throw new Error('delay must be a number')
  if (!Array.isArray(dependencies))
    throw new Error('dependencies must be an array')
  if (dependencies.length < 1)
    throw new Error('dependency array must not be empty')

  const { reset, clear } = useTimeout(callback, delay)

  useEffect(reset, [...dependencies, reset])
  useEffect(clear, [])
}
