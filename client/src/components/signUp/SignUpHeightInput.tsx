import useSignupFormStore from "../../hooks/useSignupFormStore";

import { TextInputBox } from "../ui/textbox/TextBoxComponents";

export default function SignUpHeightInput() {
  const [{ user: { height } }, store] = useSignupFormStore();

  const handleChangeHeight = (value: string) => {
    let sanitizedValue = value.replace(/[^0-9]/g, '');

    if (sanitizedValue.length > 3) {
      sanitizedValue = sanitizedValue.slice(0, 3);
    }

    store.changeHeight(Number(sanitizedValue));
  };

  const handleResetHeight = () => {
    store.changeHeight(0);
  }

  return (
    <TextInputBox
      label="키"
      placeholder="키를 입력해주세요."
      value={height === 0 ? '' : String(height)}
      maxLength={3}
      unitType={'cm'}
      onChange={handleChangeHeight}
      onReset={handleResetHeight}
    />
  )
}