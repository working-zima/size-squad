import { TextInputBox } from "../ui/textbox/TextBoxComponents";

type SignUpHeightInputProps = {
  label?: string
  placeholder?: string
  height: number
  changeHeight:(value: number) => void
}

export default function SignUpHeightInput({
  label="",
  placeholder="",
  height,
  changeHeight
}: SignUpHeightInputProps) {
  const handleChangeHeight = (value: string) => {
    let sanitizedValue = value.replace(/[^0-9]/g, '');

    if (sanitizedValue.length > 3) {
      sanitizedValue = sanitizedValue.slice(0, 3);
    }

    changeHeight(Number(sanitizedValue));
  };

  const handleResetHeight = () => {
    changeHeight(0);
  }

  return (
    <TextInputBox
      label={label}
      placeholder={placeholder}
      value={height === 0 ? '' : String(height)}
      maxLength={3}
      unitType={'cm'}
      onChange={handleChangeHeight}
      onReset={handleResetHeight}
    />
  )
}