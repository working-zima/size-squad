import styled from "styled-components";
import { CiCircleRemove } from "react-icons/ci";

import useSignupFormStore from "../../hooks/useSignupFormStore";

import TextBox from "../ui/TextBox";
import Button from "../ui/Button";

const Metrics = styled.div`
  color: ${props => props.theme.colors.unSelectedText};
`

export default function SignUpWeightInput() {
  const [{ weight }, store] = useSignupFormStore();

  const handleChangeWeight = (value: string) => {
    let sanitizedValue = value.replace(/[^0-9]/g, '');

    if (sanitizedValue.length > 3) {
      sanitizedValue = sanitizedValue.slice(0, 3);
    }

    store.changeWeight(sanitizedValue);
  };

  const handleResetWeight = () => {
    store.changeWeight('');
  }

  return (
    <TextBox
      label="몸무게"
      placeholder="몸무게를 입력해주세요."
      type="text"
      value={weight}
      onChange={handleChangeWeight}
    >
      <Metrics>
        <span>kg</span>
      </Metrics>
      <Button onClick={handleResetWeight}>
        {!!weight && <CiCircleRemove size="18" fill='#6e6e6e'/>}
      </Button>
    </TextBox>
  )
}