import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

import OldPasswordInput from "./OldPasswordInput";
import SignUpPasswords from "../signUp/SignUpPasswords";

import useSignupFormStore from "../../hooks/useSignupFormStore";
import useModal from "../../hooks/useModal";
import { ConfirmTrigger } from "../ui/modal/ModalTrigger";
import { AlertModal } from "../ui/modal/ModalComponents";

const ButtonWrapper = styled.div`
  & > button {
    width: 100%;
    height: 48px;
    margin-top: 4rem;
    border: 1px solid ${props => props.theme.colors.primaryBlack};
    border-radius: ${props => props.theme.sizes.borderRadius};
    background-color: ${props => props.theme.colors.primaryBlack};
    color: ${props => props.theme.colors.primaryWhite};
    font-size: 1.6rem;
    font-weight: 600;
  }

  & > button:disabled {
    background-color: ${props => props.theme.colors.unSelectedText};
  }
`

export default function ChangePasswordForm({ userId }: {userId: string}) {
  const [confirmed, setConfirmed] = useState<boolean | null>(false);
  const navigate = useNavigate();

  const [{ errorMessage, EditPasswordValid }, store] = useSignupFormStore()
  const { modalRef, openModal, closeModal } = useModal();

  const handleSubmitEditPassword = async () => {
    try {
      await store.updatePassword();
      navigate(`/mypage/${userId}/edit`);
    } catch (error) {
      openModal();
    } finally {
      store.reset();
      setConfirmed(false);
    }
  };

  useEffect(() => {
    if (confirmed) {
      handleSubmitEditPassword();
    }
  }, [confirmed]);

  return (
    <>
      <OldPasswordInput
        placeholder="현재 비밀번호를 입력해주세요."
      />
      <SignUpPasswords
        pwdPlaceholder="새 비밀번호를 입력해주세요."
        confirmPlaceholder="새 비밀번호를 다시 입력해주세요."
      />
      <ButtonWrapper>
        <ConfirmTrigger
          buttonText="변경"
          confirmed={confirmed}
          disabled={EditPasswordValid}
          setConfirmed={setConfirmed}
        >
          <p>비밀번호를 변경하시겠습니까?</p>
        </ConfirmTrigger>
      </ButtonWrapper>
      <AlertModal
          modalRef={modalRef}
          hide={closeModal}
        >
          <p>비밀번호 변경 실패</p>
          <p>{errorMessage}</p>
        </AlertModal>
    </>
  )
}