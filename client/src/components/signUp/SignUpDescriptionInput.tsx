import useSignupFormStore from "../../hooks/useSignupFormStore";

import { TextareaBox } from "../ui/textbox/TextBoxComponents";

export default function SignUpDescriptionInput() {
  const [, store] = useSignupFormStore();

  const handleChangeDescription = (value: string) => {
    store.changeDescription(value);
  };

  return (
    <TextareaBox
      label="체형"
      placeholder="체형을 100자 이내로 설명해주세요."
      maxLength={100}
      onChange={handleChangeDescription}
    />
  )
}
