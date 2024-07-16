import useSignupFormStore from "../../hooks/useSignupFormStore";

import TextBox from "../ui/TextBox";

export default function SignUpDescriptionInput() {
  const [{ description }, store] = useSignupFormStore();

  const handleChangeDescription = (value: string) => {
    store.changeDescription(value);
  };

  return (
    <TextBox
      label="체형"
      placeholder="체형을 입력해주세요."
      type="text"
      value={description}
      multiline={true}
      onChange={handleChangeDescription}
    />
  )
}
