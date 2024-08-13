import useSignupFormStore from "../../hooks/useSignupFormStore";

import { TextareaBox } from "../ui/textbox/TextBoxComponents";

type SignUpDescriptionInputProps = {
  label?: string;
  placeholder?: string;
}

export default function SignUpDescriptionInput({
  label = "",
  placeholder = ""
}: SignUpDescriptionInputProps) {
  const [, store] = useSignupFormStore();

  const handleChangeDescription = (value: string) => {
    store.changeDescription(value);
  };

  return (
    <TextareaBox
      label={label}
      placeholder={placeholder}
      maxLength={100}
      onChange={handleChangeDescription}
    />
  )
}
