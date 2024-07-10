import React, { useRef, useState } from 'react';

import styled, { css } from 'styled-components';
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

type TextBoxWrapperProps = {
  isFocused: boolean;
  isTouched: boolean;
  isValid: boolean;
  isDuplicated: boolean;
  useBorderColor: boolean;
};

const TextBoxWrapper = styled.div<TextBoxWrapperProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${props => props.theme.colors.borderColor};
  border-radius: 6px;
  margin-top: .8rem;
  border-color: ${props => props.theme.colors.borderColor};

  // 입력 값이 중복되지 않았으며, 유효성 검사를 통과한 상태에서 focus될 경우
  ${(props) =>
    props.useBorderColor
    && props.isFocused
    && props.isValid
    && !props.isDuplicated
    && css`
      border-color: green;`
  }

  // 한번 focus된 적이 있고, 입력 값이 중복되었거나 유효성 검사를 통과하지 못한 상태일 경우
  ${(props) =>
    props.useBorderColor
      && props.isTouched
      && (!props.isValid || props.isDuplicated)
      && css`
        border-color: red;
      `
  }

    // useBorderColor가 true일 때, isTouched가 false일 때 focus될 경우
  ${(props) =>
    props.useBorderColor
      && !props.isTouched
      && props.isFocused
      && css`
        border-color: ${props => props.theme.colors.primaryBlack};
    `
  }


  // 입력 값이 중복되지 않았으며, 유효성 검사를 통과한 상태에서 focus되지 않은 경우
  ${(props) =>
    !props.isFocused && props.isValid && !props.isDuplicated && css`
      border-color: ${props => props.theme.colors.borderColor};`
  }

  // 색이 있는 테두리를 사용하지 않을 때 focus된 경우
  ${(props) =>
    !props.useBorderColor && props.isFocused && css`
      border-color: ${props => props.theme.colors.primaryBlack};
    `
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
  isValid?: boolean,
  isDuplicated?: boolean,
  useBorderColor?: boolean;
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
  isValid = false,
  isDuplicated = false,
  useBorderColor = false,
  onChangeString = undefined,
  onChangeNumber = undefined
}: TextBoxProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const id = useRef(`textbox-${Math.random().toString().slice(2)}`);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsTouched(true);
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
      <TextBoxWrapper
        isFocused={isFocused}
        isTouched={isTouched}
        isValid={isValid}
        isDuplicated={isDuplicated}
        useBorderColor={useBorderColor}
      >
        {React.createElement(multiline ? 'textarea' : 'input', {
          id: id.current,
          type,
          placeholder,
          value,
          readOnly,
          onFocus: handleFocus,
          onBlur: handleBlur,
          onChange: handleChange,
        })}
          {children}
      </TextBoxWrapper>
    </Container>
  );
}
