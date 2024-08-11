import { useState } from "react";

import styled from "styled-components";

import useSignupFormStore from "../../hooks/useSignupFormStore";

import { ERROR_MESSAGES } from "../../constants";

import { TextInputBox } from "../ui/textbox/TextBoxComponents";

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

type SignUpPassword = {
  pwdLabel: string;
  pwdPlaceholder: string;
  confirmPlaceholder: string;
}

export default function SignUpPassword({
  pwdLabel,
  pwdPlaceholder,
  confirmPlaceholder
}: SignUpPassword) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isTouched, setIsTouched] = useState({
    passwordIsTouched: false,
    confirmIsTouched: false
  });

  const [{
    user: { password }, passwordConfirmation, isPasswordValid, isPasswordConfirmationValid
  }, store] = useSignupFormStore();

  const handleChangePassword = (value: string) => {
    setIsTouched(prev => ({ ...prev, passwordIsTouched: true }));
    store.changePassword(value);
    store.validatePassword(value)
  };

  const handleResetPassword = () => {store.changePassword('')}

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const passwordErrorMessage = isTouched.passwordIsTouched
  ? PasswordErrorMessage({ password, isPasswordValid })
  : null;

  const handleChangePasswordConfirmation = (value: string) => {
    setIsTouched(prev => ({ ...prev, confirmIsTouched: true }));
    store.changePasswordConfirmation(value);
    store.validatePasswordConfirmation(value);
  };

  const handleResetPasswordConfirmation = () => {
    store.changePasswordConfirmation('');
  }

  const handleShowConfirmation = () => {
    setShowConfirmation((prev) => !prev);
  };

  const confirmErrorMessage = isTouched.confirmIsTouched
    ? ConfirmErrorMessage({ passwordConfirmation, isPasswordConfirmationValid })
    : null;

  return (
    <>
      <PasswordWrapper>
        <TextInputBox
          label={pwdLabel}
          placeholder={pwdPlaceholder}
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
      <ConfirmationWrapper>
        <TextInputBox
          placeholder={confirmPlaceholder}
          value={passwordConfirmation}
          type={showConfirmation ? "text" : "password"}
          maxLength={16}
          isShowPw={showConfirmation}
          onChange={handleChangePasswordConfirmation}
          handleShowPassword={handleShowConfirmation}
          isValid={isPasswordConfirmationValid}
          useBorderColor={true}
          onReset={handleResetPasswordConfirmation}
        />
        {!!confirmErrorMessage
          && <ValidTextWrapper>{confirmErrorMessage}</ValidTextWrapper>}
      </ConfirmationWrapper>
    </>
  )
}