import styled from "styled-components";
import { CiCircleRemove } from "react-icons/ci";

import useSignupFormStore from "../../hooks/useSignupFormStore";

import TextBox from "../ui/TextBox";
import Button from "../ui/Button";

const Metrics = styled.div`
  color: ${props => props.theme.colors.unSelectedText};
`

export default function SignUpHeightInput() {
  const [{ height }, store] = useSignupFormStore();

  const handleChangeHeight = (value: string) => {
    let sanitizedValue = value.replace(/[^0-9]/g, '');

    if (sanitizedValue.length > 3) {
      sanitizedValue = sanitizedValue.slice(0, 3);
    }

    store.changeHeight(sanitizedValue);
  };

  const handleResetHeight = () => {
    store.changeHeight('');
  }

  return (
    <TextBox
      label="키"
      placeholder="키를 입력해주세요."
      type="text"
      value={height}
      maxLength={3}
      onChange={handleChangeHeight}
    >
      <Metrics>
        <span>cm</span>
      </Metrics>
      <Button onClick={handleResetHeight}>
        {!!height && <CiCircleRemove size="18" fill='#6e6e6e'/>}
      </Button>
    </TextBox>
  )
}