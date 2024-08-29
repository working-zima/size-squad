import { ReactNode } from "react";

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 8px;
  border: 0px;
  border-radius: 4px;
  background-color: ${props => props.theme.colors.dividerColor};
  height: 100%;
  color: ${props => props.theme.colors.primaryBlack};
`

type TextSimpleBoxProps = {
  children: ReactNode;
}

export default function TextSimpleBox({
  children
}: TextSimpleBoxProps) {
  return (
    <Container>
      {children}
    </Container>
  )
}
