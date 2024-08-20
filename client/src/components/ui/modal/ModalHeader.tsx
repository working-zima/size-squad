import { ReactNode } from "react"

import styled from "styled-components"

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  padding: ${props => props.theme.sizes.contentPadding};

  p {
    margin: 0;
    line-height: 22px;
    font-size: 1.6rem;
    font-weight: 600;
  }

  button {
    position: absolute;
    right: 10px;
    width: 40px;
    height: 40px;
    flex: 0 0 40px;
    border: 0;
    padding: 0;
    background-color: transparent;
    text-align: center;
    cursor: pointer;

    // 좌우상하 대칭 X 구현
    &::before,
    &::after {
      content: '';
      position: absolute;
      width: 25px;
      height: 0;
      border-top: 2px solid #333;
      transform-origin: 50% 1px;
      left: 10px;
      top: 19px;
    }
    &::before {
      transform: rotate(-45deg);
    }
    &::after {
      transform: rotate(45deg);
    }
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
      <p>{title}</p>
      {children}
      <button onClick={hide} />
    </Container>
  )
}

export default ModalHeader;