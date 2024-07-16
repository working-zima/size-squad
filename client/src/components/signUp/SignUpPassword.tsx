import { useState } from "react";

import styled from "styled-components";
import { CiCircleRemove, CiRead, CiUnread } from "react-icons/ci";

import useSignupFormStore from "../../hooks/useSignupFormStore";

import TextBox from "../ui/TextBox";
import Button from "../ui/Button";
import { ERROR_MESSAGES } from "../../constants";

const PasswordWrapper = styled.div`
  height: 105px;
`

const ConfirmationWrapper = styled.div`
  height: 70px;
`

const ValidTextWrapper = styled.p`
  margin-top: 4px;
  font-size: 1.2rem;
  line-height: 16px;
  color: #e72a1d;
`

type PasswordErrorMessageProps = {
  password: string;
  isPasswordValid: boolean;
}

const PasswordErrorMessage = ({
  password, isPasswordValid
}: PasswordErrorMessageProps) => {
  if (password === "") return ERROR_MESSAGES.PASSWORD_EMPTY_MESSAGE;
  if (!isPasswordValid) return ERROR_MESSAGES.PASSWORD_INVALID_MESSAGE;
  return null;
};

type ConfirmErrorMessageProps = {
  passwordConfirmation: string;
  isPasswordConfirmationValid: boolean;
}

const ConfirmErrorMessage = ({
  isPasswordConfirmationValid
}: ConfirmErrorMessageProps) => {
  if (!isPasswordConfirmationValid) {
    return ERROR_MESSAGES.CONFIRM_INVALID_MESSAGE;
  }

  return null;
};

export default function SignUpPassword() {
  const [isShowPw, setIsShowPw] = useState({
    showPassword: false,
    showConfirmation: false
  });
  const [isTouched, setIsTouched] = useState({
    passwordIsTouched: false,
    confirmIsTouched: false
  });

  const [{
    password, passwordConfirmation, isPasswordValid, isPasswordConfirmationValid
  }, store] = useSignupFormStore();

  const handleChangePassword = (value: string) => {
    setIsTouched(prev => ({ ...prev, passwordIsTouched: true }));
    store.changePassword(value);
    store.validatePassword(value)
  };

  const handleResetPassword = () => {
    store.changePassword('')
  }

  const handleChangePasswordConfirmation = (value: string) => {
    setIsTouched(prev => ({ ...prev, confirmIsTouched: true }));
    store.changePasswordConfirmation(value);
    store.validatePasswordConfirmation(value);
  };

  const handleResetPasswordConfirmation = () => {
    store.changePasswordConfirmation('');
  }

  const handleShowPassword = () => {
    setIsShowPw(prev => ({...prev, showPassword: !prev.showPassword}));
  }

  const handleShowConfirmation = () => {
    setIsShowPw(prev => ({...prev, showConfirmation: !prev.showConfirmation}));
  }

  const passwordErrorMessage = isTouched.passwordIsTouched
    ? PasswordErrorMessage({ password, isPasswordValid })
    : null;

  const confirmErrorMessage = isTouched.confirmIsTouched
    ? ConfirmErrorMessage({ passwordConfirmation, isPasswordConfirmationValid })
    : null;


  return (
    <>
      <PasswordWrapper>
        <TextBox
          label="비밀번호"
          placeholder="영문, 숫자, 특수문자 포함한 8 ~ 16자리를 사용합니다."
          type={isShowPw.showPassword ? "text" : "password"}
          value={password}
          onChange={handleChangePassword}
          isValid={isPasswordValid}
          useBorderColor={true}
          required
        >
          <Button onClick={handleResetPassword}>
            {!!password && <CiCircleRemove size="18" fill='#6e6e6e'/>}
          </Button>
          <Button onClick={handleShowPassword}>
            {isShowPw.showPassword
              ? <CiRead size="18" fill='#6e6e6e'/>
              : <CiUnread size="18" fill='#6e6e6e'/>
            }
          </Button>
        </TextBox>
        {!!passwordErrorMessage
          && <ValidTextWrapper>{passwordErrorMessage}</ValidTextWrapper>}
      </PasswordWrapper>
      <ConfirmationWrapper>
        <TextBox
          placeholder="비밀번호를 다시 입력해주세요."
          type={isShowPw.showConfirmation ? "text" : "password"}
          value={passwordConfirmation}
          onChange={handleChangePasswordConfirmation}
          isValid={isPasswordConfirmationValid}
          useBorderColor={true}
          required
        >
          <Button onClick={handleResetPasswordConfirmation}>
            {!!passwordConfirmation
              && <CiCircleRemove size="18" fill='#6e6e6e'/>}
          </Button>
          <Button onClick={handleShowConfirmation}>
            {isShowPw.showConfirmation
              ? <CiRead size="18" fill='#6e6e6e'/>
              : <CiUnread size="18" fill='#6e6e6e'/>
            }
          </Button>
        </TextBox>
        {!!confirmErrorMessage
          && <ValidTextWrapper>{confirmErrorMessage}</ValidTextWrapper>}
      </ConfirmationWrapper>
    </>
  )
}