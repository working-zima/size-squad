import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { AlertModal } from '../ui/modal/ModalComponents';

import useModal from '../../hooks/useModal';
import useLoginFormStore from '../../hooks/useLoginFormStore';

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
  state: 'loading' | 'fetched' | 'idle' | 'error';
  errorMessage: string;
}

export function LoginUtils({ state, errorMessage }: LoginUtils) {
  const [, store] = useLoginFormStore();
  const { modalRef, openModal, closeModal } = useModal();
  console.log(errorMessage)
  useEffect(() => {
    if (state === 'error') openModal();
  }, [state]);

  const handleConfirm = (event?: React.MouseEvent) => {
    if (event) event.preventDefault();

    store.reset();
    closeModal();
  };

  return (
    <>
      <AlertModal modalRef={modalRef} hide={handleConfirm}>
        <p>로그인 실패</p>
        <p>{errorMessage}</p>
      </AlertModal>
      <ButtonWrapper>
        <p>
          <Link to="/signup">
            스쿼드 합류
          </Link>
        </p>
      </ButtonWrapper>
    </>
  )
}