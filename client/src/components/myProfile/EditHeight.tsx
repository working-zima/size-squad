import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

import { ConfirmTrigger } from "../ui/modal/ModalTrigger";
import { AlertModal } from "../ui/modal/ModalComponents";

import useSignupFormStore from "../../hooks/useSignupFormStore";
import useModal from "../../hooks/useModal";
import BodyMetricInput from "../signUp/BodyMetricInput";

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

export default function EditHeight() {
  const [confirmed, setConfirmed] = useState<boolean | null>(false);
  const navigate = useNavigate();

  const [{ errorMessage, user, HeightValid }, store] = useSignupFormStore()
  const { modalRef, openModal, closeModal } = useModal()

  const handleSubmitEditGender = async () => {
    try {
      await store.updateHeight();
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
      handleSubmitEditGender();
    }
  }, [confirmed]);

  return (
    <>
      <BodyMetricInput
        label="키"
        placeholder="키를 입력해주세요."
        value={user.height}
        unitType='cm'
        onChange={(value) => store.changeHeight(value)}
      />
      <ButtonWrapper>
        <ConfirmTrigger
          buttonText="변경"
          confirmed={confirmed}
          setConfirmed={setConfirmed}
          disabled={HeightValid}
        >
          <p>키를 변경하시겠습니까?</p>
        </ConfirmTrigger>
      </ButtonWrapper>
      <AlertModal
        modalRef={modalRef}
        hide={closeModal}
      >
        <p>키 변경 실패</p>
        <p>{errorMessage}</p>
      </AlertModal>
    </>
  )
}