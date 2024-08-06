import { ChangeEvent, Dispatch, RefObject, SetStateAction } from 'react'

import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  height: 50px;
  padding: 0 8px;
  border: 0px;
  border-radius: 6px;
  background-color: ${props => props.theme.colors.primaryWhite};
  font-size: 1.6rem;
  line-height: 22px;
  color: ${props => props.theme.colors.primaryBlack};

  &:focus {
    outline: none;
  }
`

type TextInputProps = {
  idRef?: RefObject<string>;
  placeholder?: string;
  value: string;
  type?: 'text' | 'number' | 'password' | 'tel';
  maxLength?: number;
  setIsTouched: Dispatch<SetStateAction<boolean>>;
  setIsFocused: Dispatch<SetStateAction<boolean>>;
  onChange?: (value: string) => void;
}

export default function TextInput({
  idRef,
  placeholder = undefined,
  value,
  type,
  maxLength,
  setIsTouched,
  setIsFocused,
  onChange = undefined,
}: TextInputProps) {
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsTouched(true);

    if (!onChange) return;
    onChange(event.target.value);
  };

  return (
    <Input
      id={idRef?.current || ''}
      type={type}
      placeholder={placeholder}
      value={value}
      maxLength={maxLength}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
    />
  )
}
