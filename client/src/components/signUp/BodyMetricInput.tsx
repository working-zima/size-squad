import { TextInputBox } from '../ui/textbox/TextBoxComponents';

type BodyMetricInputProps = {
  label?: string;
  placeholder?: string;
  value: number;
  unitType: 'cm' | 'kg';
  onChange: (value: number) => void;
};

export default function BodyMetricInput({
  label = '',
  placeholder = '',
  value,
  unitType,
  onChange,
}: BodyMetricInputProps) {
  const handleChange = (inputValue: string) => {
    let sanitizedValue = inputValue.replace(/[^0-9]/g, '');

    if (sanitizedValue.length > 3) {
      sanitizedValue = sanitizedValue.slice(0, 3);
    }

    onChange(Number(sanitizedValue));
  };

  const handleReset = () => {
    onChange(0);
  };

  return (
    <TextInputBox
      label={label}
      placeholder={placeholder}
      value={value === 0 ? '' : String(value)}
      maxLength={3}
      unitType={unitType}
      onChange={handleChange}
      onReset={handleReset}
    />
  );
}
