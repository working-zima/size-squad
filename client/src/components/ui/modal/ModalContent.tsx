import { ReactNode } from "react"
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
`

const ModalContent = ({ children }: { children: ReactNode }) => {
  return <Container>{children}</Container>
}

export default ModalContent;