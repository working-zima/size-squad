import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

import SignUpWeightInput from "../signUp/BodyMetricInput";
import { ConfirmTrigger } from "../ui/modal/ModalTrigger";
import { AlertModal } from "../ui/modal/ModalComponents";

import useSignupFormStore from "../../hooks/useSignupFormStore";
import useModal from "../../hooks/useModal";
import BodyMetricInput from "../signUp/BodyMetricInput";
import useAuthStore from "../../hooks/useAuthStore";

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

export default function EditWeight() {
  const [confirmed, setConfirmed] = useState<boolean | null>(false);
  const navigate = useNavigate();

  const [{ errorMessage, user, WeightValid }, store] = useSignupFormStore()
  const [, authStore] = useAuthStore();
  const { modalRef, openModal, closeModal } = useModal()

  const handleSubmitEditWeight = async () => {
    try {
      await store.updateWeight();
      await authStore.fetchMyUserData();
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
      handleSubmitEditWeight();
    }
  }, [confirmed]);

  return (
    <>
      <BodyMetricInput
        label="몸무게"
        placeholder="몸무게를 입력해주세요."
        value={user.weight}
        unitType="kg"
        onChange={(value) => store.changeWeight(value)}
      />
      <ButtonWrapper>
        <ConfirmTrigger
          buttonText="변경"
          confirmed={confirmed}
          setConfirmed={setConfirmed}
          disabled={WeightValid}
        >
          <p>몸무게를 변경하시겠습니까?</p>
        </ConfirmTrigger>
      </ButtonWrapper>
      <AlertModal
        modalRef={modalRef}
        hide={closeModal}
      >
        <p>몸무게 변경 실패</p>
        <p>{errorMessage}</p>
      </AlertModal>
    </>
  )
}