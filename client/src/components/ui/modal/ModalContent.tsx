import { ReactNode } from "react"
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: ${props => props.theme.sizes.contentPadding};
  font-size: 1.4rem;
  line-height: 20px;
  font-weight: 400;

  p {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    white-space: pre-line;
  }
`

const ModalContent = ({ children }: { children: ReactNode }) => {
  return <Container>{children}</Container>
}

export default ModalContent;