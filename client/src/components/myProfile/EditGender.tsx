import { useEffect, useState } from "react";

import styled from "styled-components";

import SignUpGenderInput from "../signUp/SignUpGenderInput";

import { ConfirmTrigger } from "../ui/modal/ModalTrigger";

import useFetchInitialData from "../../hooks/useFetchInitialData";
import useFetchUserStore from "../../hooks/useFetchUserStore";
import useSignupFormStore from "../../hooks/useSignupFormStore";
import useModal from "../../hooks/useModal";
import { useNavigate } from "react-router-dom";

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

type EditGenderProps = {
  userId: string
}

export default function EditGender({ userId }: EditGenderProps) {
  const [confirmed, setConfirmed] = useState<boolean | null>(false);
  const navigate = useNavigate();

  const { user, loading } = useFetchUserStore()
  const { genders } = useFetchInitialData()
  const [{ errorMessage, EditPasswordValid }, store] = useSignupFormStore()
  const { modalRef, openModal, closeModal } = useModal()

  const handleSubmitEditGender = async () => {
    try {
      await store.updateGender();
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
      handleSubmitEditGender();
    }
  }, [confirmed]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <SignUpGenderInput
        genders={genders}
        gender={user.gender}
        changeGender={(value) => store.changeGender(value)}
      />
      <ButtonWrapper>
        <ConfirmTrigger
          buttonText="변경"
          confirmed={confirmed}
          setConfirmed={setConfirmed}
        >
          <p>비밀번호를 변경하시겠습니까?</p>
        </ConfirmTrigger>
      </ButtonWrapper>
    </>
  )
}