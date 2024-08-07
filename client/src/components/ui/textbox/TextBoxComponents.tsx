import { useRef, useState } from "react";

import Label from "./Label";
import TempBox from "./TempBox";
import TextareaInput from "./TextareaInput";
import TextInput from "./TextInput";
import Buttons from "./Buttons";

type TextareaTextBoxProps = {
  label: string;
  placeholder: string;
  value?: string;
  maxLength?: number;
  onChange?: (value: string) => void;
  required?: boolean;
}

export const TextareaBox = ({
  label,
  placeholder,
  value,
  maxLength,
  onChange = undefined,
  required = false,
}: TextareaTextBoxProps) => {
  const [isTouched, setIsTouched] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const id = useRef(`textbox-${Math.random().toString().slice(2)}`);

  return (
    <>
      {label && (
        <Label
          idRef={id}
          label={label}
          required={required}
        />
      )}
      <TempBox
        isTouched={isTouched}
        isFocused={isFocused}
      >
        <TextareaInput
          idRef={id}
          placeholder={placeholder}
          defaultValue={value}
          maxLength={maxLength}
          setIsTouched={setIsTouched}
          setIsFocused={setIsFocused}
          onChange={onChange}
        />
      </TempBox>
    </>
  )
}

type TextInputProps = {
  label?: string;
  value: string;
  type?: 'text' | 'number' | 'password' | 'tel';
  maxLength?: number;
  unitType?: 'kg' | 'cm' | 'none'
  isShowPw?: boolean
  placeholder: string;
  isValid?: boolean,
  isDuplicated?: boolean,
  useBorderColor?: boolean;
  onChange?: (value: string) => void;
  onReset?: () => void;
  handleShowPassword?: () => void;
  required?: boolean;
}

export const TextInputBox = ({
  label,
  placeholder,
  value,
  type = 'text',
  maxLength,
  unitType = 'none',
  isShowPw,
  isValid = false,
  isDuplicated = false,
  useBorderColor = false,
  onChange = undefined,
  onReset = undefined,
  handleShowPassword = undefined,
  required = false,
}: TextInputProps) => {
  const [isTouched, setIsTouched] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const id = useRef(`textbox-${Math.random().toString().slice(2)}`);

  return (
    <>
      {label && (
        <Label
          idRef={id}
          label={label}
          required={required}
        />
      )}
      <TempBox
        isTouched={isTouched}
        isFocused={isFocused}
        isValid={isValid}
        isDuplicated={isDuplicated}
        useBorderColor={useBorderColor}
      >
        <>
          <TextInput
            idRef={id}
            placeholder={placeholder}
            value={value}
            type={type}
            maxLength={maxLength}
            setIsTouched={setIsTouched}
            setIsFocused={setIsFocused}
            onChange={onChange}
          />
          <Buttons
            value={value}
            isShowPw={isShowPw}
            type={type}
            unitType={unitType}
            onReset={onReset}
            handleShowPassword={handleShowPassword}
          />
        </>
      </TempBox>
    </>
  )
}