import { useState } from 'react';
import styled from 'styled-components';

import { ERROR_MESSAGES } from '../../constants/messages';
import useSignupFormStore from '../../hooks/useSignupFormStore';
import { TextInputBox } from '../ui/textbox/TextBoxComponents';

const ConfirmationWrapper = styled.div`
  height: 70px;
`;

const ValidTextWrapper = styled.p`
  margin-top: 4px;
  font-size: 1.2rem;
  line-height: 16px;
  color: ${(props) => props.theme.colors.primaryRed};
`;

type ConfirmErrorMessageProps = {
  passwordConfirmation: string;
  isPasswordConfirmationValid: boolean;
};

const ConfirmErrorMessage = ({
  isPasswordConfirmationValid,
}: ConfirmErrorMessageProps) => {
  if (!isPasswordConfirmationValid) {
    return ERROR_MESSAGES.CONFIRM_INCORRECT;
  }
  return null;
};

type SignUpConfirmPasswordInputProps = {
  placeholder: string;
  confirmAutocomplete?: string;
};

export default function SignUpConfirmPasswordInput({
  placeholder,
  confirmAutocomplete = '',
}: SignUpConfirmPasswordInputProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isTouched, setIsTouched] = useState({
    passwordIsTouched: false,
    confirmIsTouched: false,
  });

  const [{ passwordConfirmation, isPasswordConfirmationValid }, store] =
    useSignupFormStore();

  const handleChangePasswordConfirmation = (value: string) => {
    setIsTouched((prev) => ({ ...prev, confirmIsTouched: true }));
    store.changePasswordConfirmation(value);
    store.validatePasswordConfirmation(value);
  };

  const handleResetPasswordConfirmation = () => {
    store.changePasswordConfirmation('');
  };

  const handleShowConfirmation = () => {
    setShowConfirmation((prev) => !prev);
  };

  const confirmErrorMessage = isTouched.confirmIsTouched
    ? ConfirmErrorMessage({ passwordConfirmation, isPasswordConfirmationValid })
    : null;

  return (
    <ConfirmationWrapper>
      <TextInputBox
        placeholder={placeholder}
        value={passwordConfirmation}
        type={showConfirmation ? 'text' : 'password'}
        maxLength={16}
        isShowPw={showConfirmation}
        isValid={isPasswordConfirmationValid}
        useBorderColor={true}
        autocomplete={confirmAutocomplete}
        onChange={handleChangePasswordConfirmation}
        handleShowPassword={handleShowConfirmation}
        onReset={handleResetPasswordConfirmation}
      />
      {!!confirmErrorMessage && (
        <ValidTextWrapper>{confirmErrorMessage}</ValidTextWrapper>
      )}
    </ConfirmationWrapper>
  );
}
