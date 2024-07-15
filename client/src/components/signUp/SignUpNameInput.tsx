import { useEffect, useState } from 'react'

import styled from "styled-components";
import { CiCircleRemove } from "react-icons/ci";

import useSignupFormStore from '../../hooks/useSignupFormStore';
import useDebounce from '../../hooks/useDebounce';

import TextBox from "../ui/TextBox";
import Button from "../ui/Button";

import { ERROR_MESSAGES } from '../../constants';

const Container = styled.div`
  height: 11rem;
`

const ValidTextWrapper = styled.p`
  margin-top: 4px;
  font-size: 1.2rem;
  line-height: 16px;
  color: #e72a1d;
`

type ErrorMessageProps = {
  name: string;
  isNameDuplicated: boolean;
  isNameValid: boolean;
}

const ErrorMessage = ({
  name, isNameDuplicated, isNameValid
}: ErrorMessageProps) => {
  if (name === "") return ERROR_MESSAGES.NAME_EMPTY_MESSAGE;
  if (isNameDuplicated) return ERROR_MESSAGES.NAME_DUPLICATED_MESSAGE;
  if (!isNameValid) return ERROR_MESSAGES.NAME_INVALID_MESSAGE;
  return null;
};

export default function SignUpNameInput() {
  const [
    { name, isNameDuplicated, isNameValid }, store
  ] = useSignupFormStore();
  const [isTouched, setIsTouched] = useState(false);

  const debouncedNameInput = useDebounce(name, 300);

  useEffect(() => {
    store.validateAndCheckName(debouncedNameInput);
  }, [debouncedNameInput]);

  const handleChangeName = (value: string) => {
    setIsTouched(true);
    store.changeName(value);
  };

  const handleResetName = () => {
    store.changeName('');
  }

  const errorMessage = isTouched
  ? ErrorMessage({ name, isNameDuplicated, isNameValid }) : null;

  return (
    <Container>
      <TextBox
          label="닉네임"
          placeholder="닉네임을 입력해주세요."
          value={name}
          onChange={handleChangeName}
          isValid={isNameValid}
          isDuplicated={isNameDuplicated}
          useBorderColor={true}
          required
      >
        <Button onClick={handleResetName}>
          {!!name && <CiCircleRemove size="18" fill='#6e6e6e'/>}
        </Button>
      </TextBox>
      {errorMessage && <ValidTextWrapper>{errorMessage}</ValidTextWrapper>}
    </Container>
  )
}