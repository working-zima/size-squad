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

type OldPasswordErrorMessageProps = {
  oldPassword: string;
  isOldPasswordValid: boolean;
};

const PasswordErrorMessage = ({
  oldPassword, isOldPasswordValid
}: OldPasswordErrorMessageProps) => {
  if (oldPassword === "") return ERROR_MESSAGES.PASSWORD_EMPTY_MESSAGE;
  if (!isOldPasswordValid) return ERROR_MESSAGES.PASSWORD_INVALID_MESSAGE;
  return null;
};

type OldPasswordInputProps = {
  label?: string;
  placeholder: string;
};

export default function OldPasswordInput({
  label,
  placeholder,
}: OldPasswordInputProps) {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const [{ oldPassword, isOldPasswordValid}, store] = useSignupFormStore();

  const handleChangeOldPassword = (value: string) => {
    setIsTouched(true);
    store.changeOldPassword(value);
    store.validateOldPassword(value);
  };

  const handleResetPassword = () => { store.changeOldPassword('') };

  const handleShowOldPassword = () => {
    setShowOldPassword((prev) => !prev);
  };

  const passwordErrorMessage = isTouched
    ? PasswordErrorMessage({ oldPassword, isOldPasswordValid })
    : null;

  return (
    <PasswordWrapper>
      <TextInputBox
        label={label}
        placeholder={placeholder}
        value={oldPassword}
        type={showOldPassword ? "text" : "password"}
        maxLength={16}
        isShowPw={showOldPassword}
        onChange={handleChangeOldPassword}
        handleShowPassword={handleShowOldPassword}
        isValid={isOldPasswordValid}
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