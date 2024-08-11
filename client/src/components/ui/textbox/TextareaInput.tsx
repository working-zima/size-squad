import { Dispatch, RefObject, SetStateAction, useEffect, useRef } from 'react';

import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  width: 100%;
`

const Textarea = styled.textarea`
  line-height: 1.67;
  font-size: 1.6rem;
  width: 100%;
  resize: none;
  overflow-y: scroll;
  margin: 0;
  padding: 8px;
  outline: none;
  border: none;
  border-radius: 6px;
`;

const CloneTextarea = styled(Textarea)`
  position: absolute;
  padding-top: 0;
  padding-bottom: 0;
  visibility: hidden;
  opacity: 0;
  z-index: -1;
  white-space: pre-wrap;
`;

type TextareaInputProps = {
  idRef?: RefObject<string>;
  placeholder?: string;
  lines?: number;
  defaultValue?: string;
  maxLength?: number;
  setIsTouched: Dispatch<SetStateAction<boolean>>;
  setIsFocused: Dispatch<SetStateAction<boolean>>;
  onChange?: (value: string) => void;
}

export default function TextareaInput ({
  idRef,
  placeholder = undefined,
  lines = 3,
  defaultValue = '',
  maxLength,
  setIsTouched,
  setIsFocused,
  onChange = undefined,
}: TextareaInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const cloneRef = useRef<HTMLTextAreaElement>(null);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  useEffect(() => {
    const elem = textareaRef.current;
    const cloneElem = cloneRef.current;

    if (elem && defaultValue) {
      elem.value = defaultValue; // 여기에 value 설정
    }

    const handleInput = () => {
      if (!elem || !cloneElem) return;

      const val = elem.value;
      cloneElem.value = val;
      elem.rows = Math.min(
        Math.max(
          Math.ceil(cloneElem.scrollHeight / cloneElem.clientHeight), lines
        ), 15
      );

      if (onChange) onChange(val);
      setIsTouched(true);
    };

    if (elem) elem.addEventListener('input', handleInput);

    return () => {
      if (elem) elem.removeEventListener('input', handleInput);
    };
  }, []);

  return (
    <Container>
      <CloneTextarea
        ref={cloneRef}
        rows={1}
        readOnly
      />
      <Textarea
        id={idRef?.current || ''}
        ref={textareaRef}
        placeholder={placeholder}
        rows={lines}
        // maxLength={maxLength}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </Container>
  );
};
