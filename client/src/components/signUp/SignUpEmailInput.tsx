import { useEffect, useState } from "react";

import styled from "styled-components";
import { CiCircleRemove } from "react-icons/ci";

import useSignupFormStore from "../../hooks/useSignupFormStore";
import useDebounce from "../../hooks/useDebounce";

import TextBox from "../ui/TextBox";
import Button from "../ui/Button";

import { ERROR_MESSAGES } from "../../constants";

const Container = styled.div`
  height: 10rem;
`
const ValidTextWrapper = styled.p`
  margin-top: 4px;
  font-size: 1.2rem;
  line-height: 16px;
  color: #e72a1d;
`

type ErrorMessageProps = {
  email: string;
  isEmailDuplicated: boolean;
  isEmailInvalid: boolean;
}

const ErrorMessage = ({
  email, isEmailDuplicated, isEmailInvalid
}: ErrorMessageProps) => {
  if (email === "") return ERROR_MESSAGES.EMAIL_EMPTY_MESSAGE;
  if (isEmailDuplicated) return ERROR_MESSAGES.EMAIL_DUPLICATED_MESSAGE;
  if (!isEmailInvalid) return ERROR_MESSAGES.EMAIL_INVALID_MESSAGE;
  return null;
};

export default function SignUpEmailInput() {
  const [
    { email, isEmailDuplicated, isEmailInvalid }, store
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
    ? ErrorMessage({ email, isEmailDuplicated, isEmailInvalid }) : null;

  return (
    <Container>
      <TextBox
        label="이메일"
        placeholder="이메일을 입력해주세요."
        value={email}
        onChangeString={handleChangeEmail}
        isInvalid={!isEmailInvalid}
        isDuplicated={isEmailDuplicated}
        useBorderColor={true}
        required
      >
      <Button onClick={handleResetEmail}>
        {!!email && <CiCircleRemove size="18" fill='#6e6e6e'/>}
      </Button>
      </TextBox>
      {errorMessage && <ValidTextWrapper>{errorMessage}</ValidTextWrapper>}
    </Container>
  )
}