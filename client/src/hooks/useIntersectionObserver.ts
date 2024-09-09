import { RefObject, useEffect, useRef, useState } from 'react'

type Elem = Element | null

const useIntersectionObserver = (
  elemRef: RefObject<Elem>,
  options: IntersectionObserverInit = { threshold: 0 },
) => {
  const observerRef = useRef<IntersectionObserver>()
  const [entries, setEntries] = useState<IntersectionObserverEntry[]>([])

  useEffect(() => {
    const node = elemRef.current
    if (!node) return
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        console.log(entry)
      });
      setEntries(entries);
    }, options)
    observerRef.current.observe(node)

    return () => {
      observerRef.current?.disconnect()
    }
  }, [elemRef, options])

  return {
    entries,
    observerRef,
  }
}

export default useIntersectionObserver
