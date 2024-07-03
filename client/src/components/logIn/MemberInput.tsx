import styled from "styled-components";

import { CiRead, CiUnread, CiCircleRemove } from "react-icons/ci";

import TextBox from '../ui/TextBox';
import Button from '../ui/Button';

const TextBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${props => props.theme.colors.borderColor};
  border-radius: 6px;
  margin-top: .8rem;

  input::placeholder  {
    color: ${props => props.theme.colors.unSelectedText};
  }

  button {
    padding: 0;
    margin-right: 6px;
  }

  &:focus-within {
    border-color: ${props => props.theme.colors.primaryBlack};
  }
`

type MemberInputProps = {
  email: string;
  password: string;
  isShowPw: boolean;
  handleChangeEmail: (value: string) => void;
  handleChangePassword: (value: string) => void;
  handleResetEmail: () => void;
  handleShowPassword: () => void;
}

export function MemberInput({
  email, password, isShowPw,
  handleChangeEmail, handleChangePassword, handleResetEmail, handleShowPassword
}: MemberInputProps) {

  return (
    <>
      <TextBoxWrapper>
        <TextBox
          label="E-mail"
          placeholder="이메일"
          value={email}
          onChange={handleChangeEmail}
        />
        <Button onClick={handleResetEmail}>
          <CiCircleRemove size="18" fill='#6e6e6e'/>
        </Button>
      </TextBoxWrapper>
      <TextBoxWrapper>
        <TextBox
          label="Password"
          placeholder="비밀번호"
          type={isShowPw ? "text" : "password"}
          value={password}
          onChange={handleChangePassword}
        />
        <Button onClick={handleShowPassword}>
          {
            isShowPw
              ? <CiRead size="18" fill='#6e6e6e'/>
              : <CiUnread size="18" fill='#6e6e6e'/>
          }
        </Button>
      </TextBoxWrapper>
    </>
  )
}