import styled from "styled-components"
import Button from "../ui/Button"
import useUserStore from "../../hooks/useUserStore"
import { useParams } from "react-router-dom"
import { TextInputBox } from "../ui/textbox/TextBoxComponents"
import SignUpHeightInput from "../signUp/SignUpHeightInput"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${props => props.theme.sizes.contentPadding};
`

const ChangeButton = styled(Button)`
  width: 100%;
  height: 48px;
  border: 1px solid ${props => props.theme.colors.primaryBlack};
  border-radius: ${props => props.theme.sizes.borderRadius};
  background-color: ${props => props.theme.colors.primaryBlack};
  font-size: 1.6rem;
  font-weight: 600;
`

export default function MyProfileInput() {
  const params = useParams();
  const userId = String(params.id);
  const path = String(params.path);

  const [{ }, store] = useUserStore()

  return (
    <Container>
      <SignUpHeightInput />
      <ChangeButton>
        변경
      </ChangeButton>
    </Container>
  )
}
