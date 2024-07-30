import { ReactNode } from "react"
import styled from "styled-components";

const Container = styled.div`
    padding: 10px 20px;
    text-align: right;

    button {
      background-color: transparent;
    }
`

const ModalFooter = ({ children }: { children: ReactNode }) => {
  return <Container>{children}</Container>
}

export default ModalFooter;