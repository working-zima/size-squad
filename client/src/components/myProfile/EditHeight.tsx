import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import useAuthStore from '../../hooks/useAuthStore';
import useModal from '../../hooks/useModal';
import useSignupFormStore from '../../hooks/useSignupFormStore';
import BodyMetricInput from '../signUp/BodyMetricInput';
import { AlertModal } from '../ui/modal/ModalComponents';
import { ConfirmTrigger } from '../ui/modal/ModalTrigger';

const ButtonWrapper = styled.div`
  & > button {
    width: 100%;
    height: 48px;
    margin-top: 4rem;
    border: 1px solid ${(props) => props.theme.colors.primaryBlack};
    border-radius: ${(props) => props.theme.sizes.borderRadius};
    background-color: ${(props) => props.theme.colors.primaryBlack};
    color: ${(props) => props.theme.colors.primaryWhite};
    font-size: 1.6rem;
    font-weight: 600;
  }

  & > button:disabled {
    background-color: ${(props) => props.theme.colors.unSelectedText};
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default function EditHeight() {
  const [confirmed, setConfirmed] = useState<boolean | null>(false);
  const navigate = useNavigate();

  const [{ errorMessage, user, HeightValid }, store] = useSignupFormStore();
  const { modalRef, openModal, closeModal } = useModal();
  const [, authStore] = useAuthStore();

  const handleSubmitEditGender = async () => {
    try {
      await store.updateHeight();
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
      handleSubmitEditGender();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmed]);

  return (
    <>
      <BodyMetricInput
        label="키"
        placeholder="키를 입력해주세요."
        value={user.height}
        unitType="cm"
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
      <AlertModal modalRef={modalRef} hide={closeModal}>
        <p>키 변경 실패</p>
        <p>{errorMessage}</p>
      </AlertModal>
    </>
  );
}
