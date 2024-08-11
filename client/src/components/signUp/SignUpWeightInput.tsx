import useSignupFormStore from "../../hooks/useSignupFormStore";

import { TextInputBox } from "../ui/textbox/TextBoxComponents";

export default function SignUpWeightInput() {
  const [{ user: { weight } }, store] = useSignupFormStore();

  const handleChangeWeight = (value: string) => {
    let sanitizedValue = value.replace(/[^0-9]/g, '');

    if (sanitizedValue.length > 3) {
      sanitizedValue = sanitizedValue.slice(0, 3);
    }

    store.changeWeight(Number(sanitizedValue));
  };

  const handleResetWeight = () => {
    store.changeWeight(0);
  }

  return (
    <TextInputBox
      label="몸무게"
      placeholder="몸무게를 입력해주세요."
      value={weight === 0 ? '' : String(weight)}
      maxLength={3}
      unitType={'kg'}
      onChange={handleChangeWeight}
      onReset={handleResetWeight}
    />
  )
}