import { FormEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"

import styled from "styled-components"

import SignUpHeightInput from "../components/signUp/SignUpHeightInput"
import SignUpPassword from "../components/signUp/SignUpPasswords"
import OldPasswordInput from "../components/myProfile/OldPasswordInput"

import Button from "../components/ui/Button"

import useSignupFormStore from "../hooks/useSignupFormStore"
import useModal from "../hooks/useModal"
import { AlertModal } from "../components/ui/modal/ModalComponents"

const Container = styled.form`
  display: flex;
  flex-direction: column;
  padding: ${props => props.theme.sizes.contentPadding};
`

const ChangeButton = styled(Button)`
  width: 100%;
  height: 48px;
  margin-top: 4rem;
  border: 1px solid ${props => props.theme.colors.primaryBlack};
  border-radius: ${props => props.theme.sizes.borderRadius};
  background-color: ${props => props.theme.colors.primaryBlack};
  color: ${props => props.theme.colors.primaryWhite};
  font-size: 1.6rem;
  font-weight: 600;

  &:disabled {
      background-color: ${props => props.theme.colors.unSelectedText};
    }
`

// password@123.com
export default function MyProfileInputPage() {
  const params = useParams();
  const navigate = useNavigate();

  const [{ error, errorMessage, EditPasswordValid }, store] = useSignupFormStore()
  const { modalRef, openModal, closeModal } = useModal();

  const path = String(params.path);
  const userId = String(params.id)

  const handleSubmitPassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await store.updatePassword();

    if (error) {
      openModal();
    } else {
      navigate(`/mypage/${userId}/edit`);
    }
  };

  const handleSubmitHeight = () => {

  }

  const handleConfirm = (event?: React.MouseEvent) => {
    if (event) event.preventDefault();

    store.reset();
    closeModal();
  };

  if(path === 'password') {
    return (
      <Container onSubmit={ handleSubmitPassword }>
        <OldPasswordInput
          placeholder="현재 비밀번호를 입력해주세요."
        />
        <SignUpPassword
          pwdPlaceholder="새 비밀번호를 입력해주세요."
          confirmPlaceholder="새 비밀번호를 다시 입력해주세요."
        />
        <ChangeButton type="submit" disabled={!EditPasswordValid}>
          변경
        </ChangeButton>
        <AlertModal modalRef={modalRef} hide={handleConfirm}>
          <p>비밀번호 변경 실패</p>
          <p>{errorMessage}</p>
        </AlertModal>
      </Container>
    )
  }

  if(path === 'height') {
    return (
      <Container onSubmit={ handleSubmitHeight }>
        <SignUpHeightInput placeholder="키를 입력해주세요"/>
        <ChangeButton type="submit">
          변경
        </ChangeButton>
      </Container>
    )
  }
}
