import styled from 'styled-components'

import RemoveButton from './RemoveButton'
import ShowButton from './ShowButton'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    display: flex;
  }
`

const Metrics = styled.div`
  margin: 0 6px 0 6px;
  padding: 0;
  color: ${props => props.theme.colors.unSelectedText};
`

type ButtonsProps = {
  value: string;
  type: 'text' | 'number' | 'password' | 'tel';
  unitType?: 'kg' | 'cm' | 'none';
  isShowPw?: boolean;
  onReset?: () => void;
  handleShowPassword?: () => void;
}

export default function Buttons({
  value,
  type,
  unitType = 'none',
  isShowPw,
  onReset,
  handleShowPassword = undefined
}: ButtonsProps) {
  console.log(value)
  return (
    <Container>
      {unitType !== 'none' && (
        <Metrics>
          <span>{unitType}</span>
        </Metrics>
      )}
      {onReset && value && (
        <RemoveButton onReset={onReset} />
      )}
      {(type === "password" || isShowPw) && (
        <ShowButton
          isShowPw={isShowPw}
          handleShowPassword={handleShowPassword!}
        />
      )}
    </Container>
  )
}
