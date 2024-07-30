import { ReactNode } from "react"
import styled from "styled-components"

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #ccc;

  h2 {
    margin: 0 20px;
    flex-grow: 1;
  }

  button {
    position: relative;
    width: 40px;
    height: 40px;
    flex: 0 0 40px;
    border: 0;
    padding: 0;
    background-color: transparent;
    text-align: center;
    cursor: pointer;
  }
`

type ModalHeaderProps = {
  title?: string
  children?: ReactNode
  hide?: () => void
}

const ModalHeader = ({
  title,
  children,
  hide,
}: ModalHeaderProps) => {
  return (
    <Container>
      <h2>{title}</h2>
      {children}
      <button onClick={hide}>X</button>
    </Container>
  )
}

export default ModalHeader;