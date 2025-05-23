import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import useModal from '../../hooks/useModal';
import { AlertModal } from '../ui/modal/ModalComponents';

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 28px;
  width: 100%;

  a {
    color: ${(props) => props.theme.colors.unSelectedText};
    text-decoration-line: underline;
    text-underline-offset: 1.5px;
  }
`;

type LoginUtils = {
  state: 'loading' | 'fetched' | 'idle' | 'error';
  errorMessage: string;
  resetForm: () => void;
};

export function LoginUtils({ state, errorMessage, resetForm }: LoginUtils) {
  const { modalRef, openModal, closeModal } = useModal();

  useEffect(() => {
    if (state === 'error') openModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const handleConfirm = (event?: React.MouseEvent) => {
    if (event) event.preventDefault();

    resetForm();
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
          <Link to="/signup">스쿼드 합류</Link>
        </p>
      </ButtonWrapper>
    </>
  );
}
