import { useState } from "react";

import styled from "styled-components";

import useSignupFormStore from "../../hooks/useSignupFormStore";

import { ERROR_MESSAGES } from "../../constants";

import { TextInputBox } from "../ui/textbox/TextBoxComponents";

const PasswordWrapper = styled.div`
  max-height: 105px;
  min-height: 80px;
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

type SignUpPasswordInputProps = {
  label: string;
  placeholder: string;
}

export default function SignUpPasswordInput({
  label,
  placeholder,
}: SignUpPasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isTouched, setIsTouched] = useState({
    passwordIsTouched: false,
    confirmIsTouched: false
  });

  const [{ user: { password }, isPasswordValid}, store] = useSignupFormStore();

  const handleChangePassword = (value: string) => {
    setIsTouched(prev => ({ ...prev, passwordIsTouched: true }));
    store.changePassword(value);
    store.validatePassword(value)
  };

  const handleResetPassword = () => {
    store.changePassword('')
  }

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const passwordErrorMessage = isTouched.passwordIsTouched
    ? PasswordErrorMessage({ password, isPasswordValid })
    : null;

  return (
    <PasswordWrapper>
      <TextInputBox
        label={label}
        placeholder={placeholder}
        value={password}
        type={showPassword ? "text" : "password"}
        maxLength={16}
        isShowPw={showPassword}
        onChange={handleChangePassword}
        handleShowPassword={handleShowPassword}
        isValid={isPasswordValid}
        useBorderColor={true}
        required
        onReset={handleResetPassword}
      />
      {!!passwordErrorMessage
        && <ValidTextWrapper>{passwordErrorMessage}</ValidTextWrapper>
      }
    </PasswordWrapper>
  )
}