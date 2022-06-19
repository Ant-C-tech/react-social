import { useRef} from 'react'

export const useScrollTo = () => {
  const htmlElRef = useRef(null)
  const setScrollTo = () => { htmlElRef.current && htmlElRef.current.scrollIntoView({ block: "start" }) }

  return [htmlElRef, setScrollTo]
}
