import React, { useRef } from 'react';

import styled from 'styled-components';

const Container = styled.div`
  width: 100%;

  label {
    overflow: hidden;
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
  }

  input {
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

  input:focus {
    outline: none; /* 추가된 focus 스타일 */
  }
`;

type TextBoxProps = {
  label: string;
  placeholder?: string;
  type?: 'text' | 'number' | 'password' | 'tel'; // ...and more types...
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
}

export default function TextBox({
  label, placeholder = undefined, type = 'text', value,
  onChange = undefined, readOnly = false,
}: TextBoxProps) {
  const id = useRef(`textbox-${Math.random().toString().slice(2)}`);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange) {
      return;
    }
    onChange(event.target.value);
  };

  return (
    <Container>
      <label htmlFor={id.current}>
        {label}
      </label>
      <input
        id={id.current}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        readOnly={readOnly}
      />
    </Container>
  );
}
