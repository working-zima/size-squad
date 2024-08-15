import { TextInputBox } from "../ui/textbox/TextBoxComponents";

type SignUpWeightInputProps = {
  label?: string
  placeholder?: string
  weight: number
  changeWeight: (value: number) => void
}

export default function SignUpWeightInput({
  label = "",
  placeholder = "",
  weight,
  changeWeight
}: SignUpWeightInputProps) {
  const handleChangeWeight = (value: string) => {
    let sanitizedValue = value.replace(/[^0-9]/g, '');

    if (sanitizedValue.length > 3) {
      sanitizedValue = sanitizedValue.slice(0, 3);
    }

    changeWeight(Number(sanitizedValue));
  };

  const handleResetWeight = () => {
    changeWeight(0);
  }

  return (
    <TextInputBox
      label={label}
      placeholder={placeholder}
      value={weight === 0 ? '' : String(weight)}
      maxLength={3}
      unitType={'kg'}
      onChange={handleChangeWeight}
      onReset={handleResetWeight}
    />
  )
}