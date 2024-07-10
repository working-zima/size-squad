import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 40px 0 28px;
  font-size: 14px;
  width: 100%;

  &::before {
    flex: 1;
    width: 100%;
    margin-right: 1.6rem;
    border-top: 1px solid ${props => props.theme.colors.borderColor};
    content: "";
  }

  &::after {
    flex: 1;
    width: 100%;
    margin-left: 1.6rem;
    border-top: 1px solid ${props => props.theme.colors.borderColor};
    content: "";
  }
`

export default function Divider({ children }: {children?: React.ReactNode}){
  return (
    <Container>
      {children}
    </Container>
  )
}