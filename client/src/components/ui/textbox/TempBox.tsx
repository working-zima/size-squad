import { ReactNode } from 'react';

import styled, { css } from 'styled-components';

type TextBoxWrapperProps = {
  isFocused: boolean;
  isTouched: boolean;
  isValid: boolean;
  isDuplicated: boolean;
  useBorderColor: boolean;
};

const TextBoxWrapper = styled.div<TextBoxWrapperProps>`
  display: flex;
  justify-content: column;
  height: auto;
  align-items: center;
  width: 100%;
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
`

type TempBoxProps = {
  children: ReactNode;
  isTouched: boolean;
  isFocused: boolean;
  isValid?: boolean;
  isDuplicated?: boolean;
  useBorderColor?: boolean;
}

export default function TempBox({
  children,
  isTouched,
  isFocused,
  isValid = false,
  isDuplicated = false,
  useBorderColor = false,
}: TempBoxProps) {

  return (
    <TextBoxWrapper
      isFocused={isFocused}
      isTouched={isTouched}
      isValid={isValid}
      isDuplicated={isDuplicated}
      useBorderColor={useBorderColor}
    >
      {children}
    </TextBoxWrapper>
  );
}