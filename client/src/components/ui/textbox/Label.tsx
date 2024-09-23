import styled from "styled-components"
import { requiredStar } from "../../../utils/requiredStar"
import { RefObject } from "react";

type ContainerProps = {
  required: boolean;
}

const Container = styled.label<ContainerProps>`
  display: inline-block;
  margin: 12px 0 4px;
  font-size: 1.4rem;
  width: 100%;
  ${(props) => props.required && requiredStar('after')}
`

type LabelProps = {
  idRef?: RefObject<string>;
  label?: string;
  required?: boolean;
}

export default function Label({
  idRef,
  label = '',
  required = false
}: LabelProps) {
  return (
    <Container
      htmlFor={idRef?.current || ''}
      required={required}
    >
      {label}
    </Container>
  )
}
