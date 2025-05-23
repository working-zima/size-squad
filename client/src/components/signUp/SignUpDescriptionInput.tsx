import { TextareaBox } from '../ui/textbox/TextBoxComponents';

type SignUpDescriptionInputProps = {
  label?: string;
  placeholder?: string;
  description: string;
  changeDescription: (value: string) => void;
};

export default function SignUpDescriptionInput({
  label = '',
  placeholder = '',
  description,
  changeDescription,
}: SignUpDescriptionInputProps) {
  const handleChangeDescription = (value: string) => {
    changeDescription(value);
  };

  return (
    <TextareaBox
      label={label}
      placeholder={placeholder}
      value={description}
      maxLength={100}
      onChange={handleChangeDescription}
    />
  );
}
