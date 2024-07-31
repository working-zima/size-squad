import { ReactNode } from "react"
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  padding: ${props => props.theme.sizes.contentPadding};
  text-align: right;
  user-select: none;

  button {
    font-size: 1.6rem;
    font-weight: 600;
  }

  .red-button {
    color: red;
  }
`

const ModalFooter = ({ children }: { children: ReactNode }) => {
  return <Container>{children}</Container>
}

export default ModalFooter;