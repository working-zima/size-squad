import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { ERROR_MESSAGES } from '../../constants/messages';
import useDebounce from '../../hooks/useDebounce';
import useSignupFormStore from '../../hooks/useSignupFormStore';
import { TextInputBox } from '../ui/textbox/TextBoxComponents';

const Container = styled.div`
  height: 11rem;
`;

const ValidTextWrapper = styled.p`
  margin-top: 4px;
  font-size: 1.2rem;
  line-height: 16px;
  color: ${(props) => props.theme.colors.primaryRed};
`;

type ErrorMessageProps = {
  name: string;
  isNameDuplicated: boolean;
  isNameValid: boolean;
};

const ErrorMessage = ({
  name,
  isNameDuplicated,
  isNameValid,
}: ErrorMessageProps) => {
  if (name === '') return ERROR_MESSAGES.NAME_EMPTY;
  if (isNameDuplicated) return ERROR_MESSAGES.NAME_DUPLICATED;
  if (!isNameValid) return ERROR_MESSAGES.NAME_INVALID;
  return null;
};

type SignUpNameInputProps = {
  label?: string;
  placeholder?: string;
};

export default function SignUpNameInput({
  label = '',
  placeholder = '',
}: SignUpNameInputProps) {
  const [
    {
      user: { name },
      isNameDuplicated,
      isNameValid,
    },
    store,
  ] = useSignupFormStore();
  const [isTouched, setIsTouched] = useState(false);

  const debouncedNameInput = useDebounce(name, 300);

  useEffect(() => {
    store.validateAndCheckName(debouncedNameInput);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedNameInput]);

  const handleChangeName = (value: string) => {
    setIsTouched(true);
    store.changeName(value);
  };

  const handleResetName = () => {
    store.changeName('');
  };

  const errorMessage = isTouched
    ? ErrorMessage({ name, isNameDuplicated, isNameValid })
    : null;

  return (
    <Container>
      <TextInputBox
        label={label}
        placeholder={placeholder}
        value={name}
        maxLength={10}
        isValid={isNameValid}
        isDuplicated={isNameDuplicated}
        useBorderColor={true}
        required
        onChange={handleChangeName}
        onReset={handleResetName}
      />
      {errorMessage && <ValidTextWrapper>{errorMessage}</ValidTextWrapper>}
    </Container>
  );
}
