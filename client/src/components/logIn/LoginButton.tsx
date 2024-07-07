import styled from "styled-components";

import Button from '../ui/Button';
import CheckBox from '../ui/CheckBox';

const ButtonWrapper = styled.div`
  margin-top: 28px;

  button {
    width: 100%;
    height: 48px;
    background-color: ${props => props.theme.colors.primaryBlack};
    color: ${props => props.theme.colors.primaryWhite};
    font-size: 1.6rem;
    font-weight: 600;
    border-color: ${props => props.theme.colors.primaryBlack};
    border-radius: 6px;
  }
`

const CheckBoxWrapper = styled.div`
  margin-top: 1.2rem;
`

type LoginButtonProps = {
  valid: boolean;
  isAutoLogin: boolean;
  toggleAutoLogin: () => void;
}

export function LoginButton({
  valid, isAutoLogin, toggleAutoLogin
}: LoginButtonProps) {
  return (
    <>
      <ButtonWrapper>
        <Button type="submit" disabled={!valid}>
            로그인
          </Button>
      </ButtonWrapper>
      <CheckBoxWrapper>
        <CheckBox
          label='자동 로그인'
          checked={isAutoLogin}
          onChange={toggleAutoLogin}
        />
      </CheckBoxWrapper>
    </>
  )
}