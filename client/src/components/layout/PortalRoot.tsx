import { useEffect, useRef } from "react"

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  background-color: ${(props) => props.theme.colors.primaryWhite};
  z-index: 9999;
`

const mutationObserverOption: MutationObserverInit = {
  childList: true,
  subtree: true
}

const PortalRoot = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let observer: MutationObserver
    if (ref.current) {
      observer = new MutationObserver(() => {
        const size = ref.current?.childNodes.length || 0
        document.body.classList.toggle('no-scroll', size > 1)
      })
      observer.observe(ref.current, mutationObserverOption)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return (<Container id="portalRoot" ref={ref} />)
}

export default PortalRoot;
