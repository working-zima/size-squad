import { RefObject, useEffect, useRef, useState } from "react";

type Elem = Element | null;

const useIntersectionObserver = (
  elemRef: RefObject<Elem>,
  options: IntersectionObserverInit = { threshold: 0 }
) => {
  const observerRef = useRef<IntersectionObserver>();
  const [entries, setEntries] = useState<IntersectionObserverEntry[]>([]);

  useEffect(() => {
    const waitForNode = () => {
      const node = elemRef.current;
      if (!node) {
        requestAnimationFrame(waitForNode);
        return;
      }

      const observer = new IntersectionObserver((entries) => {
        setEntries(entries);
      }, options);

      observer.observe(node);
      observerRef.current = observer;
    };

    waitForNode();

    return () => {
      observerRef.current?.disconnect();
    };
  }, [elemRef.current, options]);

  return {
    entries,
    observerRef,
  };
};

export default useIntersectionObserver;
