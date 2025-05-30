import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { GENDER } from '../../constants/apiLocalizationMap';
import useAuthStore from '../../hooks/useAuthStore';
import useInitialData from '../../hooks/useInitialData';
import useModal from '../../hooks/useModal';
import useSignupFormStore from '../../hooks/useSignupFormStore';
import { AlertModal } from '../ui/modal/ModalComponents';
import { ConfirmTrigger } from '../ui/modal/ModalTrigger';
import ComboBox from '../ui/selectbox/ComboBox';

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

export default function EditGender() {
  const [confirmed, setConfirmed] = useState<boolean | null>(false);
  const navigate = useNavigate();

  const { data: initialData } = useInitialData();
  const [{ errorMessage, user }, store] = useSignupFormStore();
  const [, authStore] = useAuthStore();
  const { modalRef, openModal, closeModal } = useModal();

  const handleSubmitEditGender = async () => {
    try {
      await store.updateGender();
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
      <ComboBox
        label={''}
        selectedItem={user.gender}
        items={initialData.genders}
        itemToId={(item) => item?._id}
        itemToText={(item) => GENDER[item?.name]}
        onChange={(value) => value && store.changeGender(value)}
      />
      <ButtonWrapper>
        <ConfirmTrigger
          buttonText="변경"
          confirmed={confirmed}
          setConfirmed={setConfirmed}
        >
          <p>성별을 변경하시겠습니까?</p>
        </ConfirmTrigger>
      </ButtonWrapper>
      <AlertModal modalRef={modalRef} hide={closeModal}>
        <p>성별 변경 실패</p>
        <p>{errorMessage}</p>
      </AlertModal>
    </>
  );
}
