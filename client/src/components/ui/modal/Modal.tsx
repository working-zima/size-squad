import { ReactNode, RefObject, SyntheticEvent, useCallback } from 'react';
import styled from 'styled-components';

const Dialog = styled.dialog`
  justify-content: center;
  position: fixed;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  max-height: calc(100vh - 80px);
  max-width: calc(100vw - 80px);
  min-width: 250px;
  border: none;
  background-color: #fff;
  padding: 0;
  border-radius: 3px;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 8px 40px;

  &::backdrop {
    backdrop-filter: blur(2px);
    background-color: rgba(0, 0, 0, 0.3);
  }

  &:not([open]) {
    display: none;
  }
`;

type ModalProps = {
  modalRef: RefObject<HTMLDialogElement>;
  hideOnClickOutside?: boolean;
  children: ReactNode;
  hide: () => void;
  onClose?: (...arg: unknown[]) => void;
  className?: string;
};

const Modal = ({
  children,
  modalRef,
  hideOnClickOutside = false,
  hide,
  onClose,
}: ModalProps) => {
  const handleClose = () => {
    hide();
    onClose?.();
  };

  const handleClick = useCallback(
    (e: SyntheticEvent) => {
      // dialog를 클릭했을 때만 닫힘(dialog의 내부 요소를 클릭한다고 해서 닫히지 않도록)
      if (hideOnClickOutside && modalRef.current === e.target) {
        handleClose();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [hideOnClickOutside],
  );

  return (
    <Dialog ref={modalRef} onClick={handleClick}>
      {children}
    </Dialog>
  );
};

export default Modal;
