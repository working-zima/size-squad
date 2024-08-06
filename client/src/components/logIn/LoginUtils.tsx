import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { AlertModal } from '../ui/modal/ModalComponents';
import { AlertTrigger } from '../ui/modal/ModalTrigger';
import useModal from '../../hooks/useModal';
import { useEffect } from 'react';

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 28px;
  width: 100%;

  a {
    color: ${props => props.theme.colors.unSelectedText};
    text-decoration-line: underline;
    text-underline-offset: 1.5px;
  }
`

type LoginUtils = {
  error: boolean;
  errorMessage: string;
}

export function LoginUtils({error, errorMessage}: LoginUtils) {
  const { modalRef, openModal, closeModal } = useModal();

  useEffect(() => {
    if (error) openModal();
  }, [error]);

  return (
    <>
    <AlertModal modalRef={modalRef} hide={closeModal}>
      <p>로그인 실패</p>
      <p>{errorMessage}</p>
    </AlertModal>
    <ButtonWrapper>
      <p>
        <Link to="/signup">
          회원 가입
        </Link>
      </p>
    </ButtonWrapper>
    </>
  )
}