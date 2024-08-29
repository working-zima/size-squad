import { ChangeEvent, Dispatch, RefObject, SetStateAction } from 'react'

import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  border: 0px;
  background-color: transparent;
  font-size: 1.6rem;
  line-height: 22px;
  height: 100%;
  color: ${props => props.theme.colors.primaryBlack};

  &::placeholder {
    color: ${props => props.theme.colors.borderColor};
    font-weight: 500;
  }

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
  setIsFocused: Dispatch<SetStateAction<boolean>>;
  onChange?: (value: string) => void;
}

export default function TextSimpleInput({
  idRef,
  placeholder = undefined,
  value,
  type,
  maxLength,
  setIsFocused,
  onChange = undefined,
}: TextInputProps) {
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
      onChange={handleChange}
    />
  )
}
