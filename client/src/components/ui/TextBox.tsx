import React, { useRef } from 'react';

import styled from 'styled-components';
import { RequiredStar } from '../../utils/RequiredStar';

type ContainerProps = {
  required: boolean;
}

const Container = styled.div<ContainerProps>`
  label {
    display: inline-block;
    margin: 12px 0 4px;
    font-size: 1.4rem;
    width: 100%;
    ${(props) => props.required && RequiredStar('after')}
  }
`;

const TextBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${props => props.theme.colors.borderColor};
  border-radius: 6px;
  margin-top: .8rem;

  &:focus-within {
    border-color: ${props => props.theme.colors.primaryBlack};
  }

  textarea {
    resize: none;
  }

  input, textarea {
    width: 100%;
    height: 50px;
    padding: 0 8px;
    border: 0px;
    border-radius: 6px;
    background-color: ${props => props.theme.colors.primaryWhite};
    font-size: 1.6rem;
    line-height: 22px;
    color: ${props => props.theme.colors.primaryBlack};
  }

  input, textarea:focus {
    outline: none;
  }

  button {
    display: flex;
    padding: 0;
    margin: 0 6px 0 6px;
  }
`

type TextBoxProps = {
  label?: string;
  placeholder?: string;
  type?: 'text' | 'number' | 'password' | 'tel';
  value: string | number;
  readOnly?: boolean;
  children?: React.ReactNode;
  required?: boolean;
  multiline?: boolean,
  onChangeString?: (value: string) => void;
  onChangeNumber?: (value: number) => void;
}

export default function TextBox({
  label = '',
  placeholder = undefined,
  type = 'text',
  value,
  children,
  readOnly = false,
  required = false,
  multiline = false,
  onChangeString = undefined,
  onChangeNumber = undefined
}: TextBoxProps) {
  const id = useRef(`textbox-${Math.random().toString().slice(2)}`);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'number' && onChangeNumber) {
      onChangeNumber(Number(event.target.value));
      return;
    }
    if (onChangeString) {
      onChangeString(event.target.value);
    }
  };

  return (
    <Container required={required}>
      {!!label && (
        <label htmlFor={id.current}>
          {label}
        </label>)
      }
      <TextBoxWrapper>
      {React.createElement(multiline ? 'textarea' : 'input', {
        id: id.current,
        type,
        placeholder,
        value,
        onChange: handleChange,
        readOnly,
      })}
        {children}
      </TextBoxWrapper>
    </Container>
  );
}
