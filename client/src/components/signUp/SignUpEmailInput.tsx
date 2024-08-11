import { useEffect, useState } from "react";

import styled from "styled-components";
import { CiCircleRemove } from "react-icons/ci";

import useSignupFormStore from "../../hooks/useSignupFormStore";
import useDebounce from "../../hooks/useDebounce";

import { ERROR_MESSAGES } from "../../constants";
import { TextInputBox } from "../ui/textbox/TextBoxComponents";

const Container = styled.div`
  height: 10rem;
`
const ValidTextWrapper = styled.p`
  margin-top: 4px;
  font-size: 1.2rem;
  line-height: 1.67;
  color: #e72a1d;
`

type ErrorMessageProps = {
  email: string;
  isEmailDuplicated: boolean;
  isEmailValid: boolean;
}

const ErrorMessage = ({
  email, isEmailDuplicated, isEmailValid
}: ErrorMessageProps) => {
  if (email === "") return ERROR_MESSAGES.EMAIL_EMPTY_MESSAGE;
  if (isEmailDuplicated) return ERROR_MESSAGES.EMAIL_DUPLICATED_MESSAGE;
  if (!isEmailValid) return ERROR_MESSAGES.EMAIL_INVALID_MESSAGE;
  return null;
};

type SignUpEmailInputProps = {
  label: string;
  placeholder: string;
}

export default function SignUpEmailInput({
  label,
  placeholder
}: SignUpEmailInputProps) {
  const [
    { user: {email}, isEmailDuplicated, isEmailValid }, store
  ] = useSignupFormStore();
  const [isTouched, setIsTouched] = useState(false);

  const debouncedEmailInput = useDebounce(email, 100);

  useEffect(() => {
    store.validateAndCheckEmail(debouncedEmailInput);
  }, [debouncedEmailInput]);

  const handleChangeEmail = (value: string) => {
    setIsTouched(true);
    store.changeEmail(value);
  };

  const handleResetEmail = () => {
    store.changeEmail('');
  }

  const errorMessage = isTouched
    ? ErrorMessage({ email, isEmailDuplicated, isEmailValid }) : null;

  return (
    <Container>
      <TextInputBox
        label={label}
        placeholder={placeholder}
        value={email}
        isValid={isEmailValid}
        isDuplicated={isEmailDuplicated}
        useBorderColor={true}
        onChange={handleChangeEmail}
        onReset={handleResetEmail}
        required
      />
      {errorMessage && (
        <ValidTextWrapper>
          {errorMessage}
        </ValidTextWrapper>
      )}
    </Container>
  )
}