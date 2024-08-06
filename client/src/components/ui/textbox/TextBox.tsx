import React, { useRef, useState } from 'react';

import styled, { css } from 'styled-components';
import { RequiredStar } from '../../../utils/RequiredStar';

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
        border-color: green;
      `
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
    !props.isFocused
      && props.isValid
      && !props.isDuplicated
      && css`
        border-color: ${props => props.theme.colors.borderColor};
      `
  }

  // 색이 있는 테두리를 사용하지 않을 때 focus된 경우
  ${(props) =>
    !props.useBorderColor
      && props.isFocused
      && css`
        border-color: ${props => props.theme.colors.primaryBlack};
      `
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


  textarea {
    resize: none;
    padding: 8px 8px;
    height: 80px;
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
  maxLength?: number;
  onChange?: (value: string) => void;
}

export default function TextBox({
  label = '',
  placeholder = undefined,
  type,
  value,
  children,
  readOnly = false,
  required = false,
  multiline = false,
  isValid = false,
  isDuplicated = false,
  useBorderColor = false,
  maxLength,
  onChange = undefined,
}: TextBoxProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const id = useRef(`textbox-${Math.random().toString().slice(2)}`);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsTouched(true);

    if (!onChange) return;

    // 1. 현재 커서 위치를 기억
    const cursorPosition = event.target.selectionStart ?? 0;

    let newValue = event.target.value;

    // 최대 길이를 초과하는 경우 잘라내기
    if (maxLength && newValue.length > maxLength) {
      const beforeCursor = newValue.slice(0, cursorPosition - 1);
      const afterCursor = newValue.slice(cursorPosition);
      console.log(beforeCursor, afterCursor)
      newValue = beforeCursor + afterCursor;
    }

    // 2. 값 업데이트(커서 마지막으로 옮겨짐)
    onChange(newValue);

    // 3. 값이 업데이트된 후 비동기적으로 input의 커서 위치를 복원
    setTimeout(() => {
      // cursorPosition은 클로저로 인해 실행 시점의 값을 기억
      if (inputRef.current && cursorPosition !== null) {
        inputRef.current.selectionStart = cursorPosition;
        inputRef.current.selectionEnd = cursorPosition;
      }
    }, 0);
  };

  return (
    <Container required={required}>
      {!!label && (
        <label htmlFor={id.current}>
          {label}
        </label>
      )}
      <TextBoxWrapper
        isFocused={isFocused}
        isTouched={isTouched}
        isValid={isValid}
        isDuplicated={isDuplicated}
        useBorderColor={useBorderColor}
      >
        {React.createElement(multiline ? 'textarea' : 'input', {
          ref: inputRef,
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
