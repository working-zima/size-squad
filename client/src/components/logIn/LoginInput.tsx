import styled from "styled-components";

import { CiRead, CiUnread, CiCircleRemove } from "react-icons/ci";

import TextBox from '../ui/TextBox';
import Button from '../ui/Button';

type LoginInputProps = {
  email: string;
  password: string;
  isShowPw: boolean;
  handleChangeEmail: (value: string) => void;
  handleChangePassword: (value: string) => void;
  handleResetEmail: () => void;
  handleShowPassword: () => void;
  handleResetPassword: () => void;
}

export function LoginInput({
  email, password, isShowPw,
  handleChangeEmail, handleChangePassword, handleResetEmail, handleShowPassword, handleResetPassword
}: LoginInputProps) {

  return (
    <>
      <TextBox
        label=""
        placeholder="이메일"
        value={email}
        onChangeString={handleChangeEmail}
      >
        <Button onClick={handleResetEmail}>
          {!!email && <CiCircleRemove size="18" fill='#6e6e6e'/>}
        </Button>
      </TextBox>
      <TextBox
        label=""
        placeholder="비밀번호"
        type={isShowPw ? "text" : "password"}
        value={password}
        onChangeString={handleChangePassword}
      >
        <Button onClick={handleResetPassword}>
          {!!password && <CiCircleRemove size="18" fill='#6e6e6e'/>}
        </Button>
        <Button onClick={handleShowPassword}>
          {isShowPw
            ? <CiRead size="18" fill='#6e6e6e'/>
            : <CiUnread size="18" fill='#6e6e6e'/>
          }
        </Button>
      </TextBox>
    </>
  )
}