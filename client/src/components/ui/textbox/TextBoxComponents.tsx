import { Dispatch, SetStateAction, useRef, useState } from "react";

import { CiSearch } from "react-icons/ci";

import Label from "./Label";
import TextBox from "./TextBox";
import TextareaInput from "./TextareaInput";
import TextInput from "./TextInput";
import TextSimpleInput from './TextSimpleInput';
import TextSimpleBox from "./TextSimpleBox";
import Buttons from "./Buttons";
import Button from "../Button";

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
      <TextBox
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
      </TextBox>
    </>
  )
}

type TextInputProps = {
  value: string;
  placeholder: string;
  label?: string;
  type?: 'text' | 'number' | 'password' | 'tel';
  maxLength?: number;
  unitType?: 'kg' | 'cm' | 'none'
  isShowPw?: boolean
  isValid?: boolean,
  isDuplicated?: boolean,
  useBorderColor?: boolean;
  onChange?: (value: string) => void;
  onReset?: () => void;
  handleShowPassword?: () => void;
  required?: boolean;
}

export const TextInputBox = ({
  value,
  placeholder,
  label,
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
      <TextBox
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
      </TextBox>
    </>
  )
}

type TextSimpleInputBoxProps = {
  value: string;
  placeholder: string;
  label?: string;
  type?: 'text' | 'number' | 'password' | 'tel';
  maxLength?: number;
  isShowPw?: boolean
  setIsFocused: Dispatch<SetStateAction<boolean>>;
  onChange?: (value: string) => void;
  onReset?: () => void;
  required?: boolean;
}


export const SearchTextInputBox = ({
  value,
  placeholder,
  label,
  type = 'text',
  maxLength,
  isShowPw,
  setIsFocused,
  onChange = undefined,
  onReset = undefined,
  required = false,
}: TextSimpleInputBoxProps) => {
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
      <TextSimpleBox>
        <TextSimpleInput
          idRef={id}
          placeholder={placeholder}
          value={value}
          type={type}
          maxLength={maxLength}
          setIsFocused={setIsFocused}
          onChange={onChange}
        />
        <Buttons
          value={value}
          isShowPw={isShowPw}
          type={type}
          onReset={onReset}
        />
        <Button type="submit">
          <CiSearch size="24" />
        </Button>
      </TextSimpleBox>
    </>
  )
}