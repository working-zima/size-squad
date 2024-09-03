import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

import SignUpDescriptionInput from "../signUp/SignUpDescriptionInput";

import { ConfirmTrigger } from "../ui/modal/ModalTrigger";
import { AlertModal } from "../ui/modal/ModalComponents";

import useSignupFormStore from "../../hooks/useSignupFormStore";
import useModal from "../../hooks/useModal";

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
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export default function EditDescription() {
  const [confirmed, setConfirmed] = useState<boolean | null>(false);
  const navigate = useNavigate();

  const [{ errorMessage, user, DescriptionValid }, store] = useSignupFormStore()
  const { modalRef, openModal, closeModal } = useModal()

  const handleSubmitEditDescription = async () => {
    try {
      await store.updateDescription();
      navigate(-1);
    } catch (error) {
      openModal();
    } finally {
      store.reset();
      setConfirmed(false);
    }
  };

  useEffect(() => {
    if (confirmed) {
      handleSubmitEditDescription();
    }
  }, [confirmed]);

  return (
    <>
      <SignUpDescriptionInput
        label="체형"
        placeholder="체형을 100자 이내로 입력해주세요."
        description={user.description}
        changeDescription={(value) => store.changeDescription(value)}
      />
      <ButtonWrapper>
        <ConfirmTrigger
          buttonText="변경"
          confirmed={confirmed}
          setConfirmed={setConfirmed}
          disabled={DescriptionValid}
        >
          <p>체형을 변경하시겠습니까?</p>
        </ConfirmTrigger>
      </ButtonWrapper>
      <AlertModal
        modalRef={modalRef}
        hide={closeModal}
      >
        <p>체형 변경 실패</p>
        <p>{errorMessage}</p>
      </AlertModal>
    </>
  )
}