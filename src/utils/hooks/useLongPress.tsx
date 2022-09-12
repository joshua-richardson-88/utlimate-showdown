import { RefObject } from 'react'
import useEffectOnce from './useEffectOnce'
import { useEventListener } from './useEventListener'
import useTimeout from './useTimeout'

export default function useLongPress<T extends HTMLElement, Args extends any[]>(
  ref: RefObject<T>,
  cb: (...x: Args) => void,
  { delay = 250 } = {},
) {
  const { reset, clear } = useTimeout(cb, delay)
  useEffectOnce(clear)

  useEventListener('mousedown', reset, ref)
  useEventListener('touchstart', reset, ref)
  useEventListener('mouseup', clear, ref)
  useEventListener('mouseleave', clear, ref)
  useEventListener('touchend', clear, ref)
}
