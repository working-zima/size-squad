import { ReactNode, RefObject } from 'react';

import Button from '../Button';
import Modal from './Modal';
import ModalContent from './ModalContent';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';

type AlertModalProps = {
  modalRef: RefObject<HTMLDialogElement>;
  children: ReactNode;
  hide: () => void;
};

/**
 * 알림 모달
 * @param props
 * @param modalRef
 * @param children
 * @param hide
 */
export const AlertModal = ({ modalRef, children, hide }: AlertModalProps) => {
  return (
    <Modal modalRef={modalRef} hide={hide}>
      <ModalContent>{children}</ModalContent>
      <ModalFooter>
        <Button onClick={hide}>확인</Button>
      </ModalFooter>
    </Modal>
  );
};

type ConfirmModalProps = {
  modalRef: RefObject<HTMLDialogElement>;
  children: ReactNode;
  title?: string;
  confirmed: boolean | null;
  onConfirm: () => void;
  onCancel: () => void;
  hide: () => void;
};

/**
 * 확인 모달
 * @param props
 * @param modalRef
 * @param children
 * @param title
 * @param confirmed
 * @param onConfirm
 * @param onCancel
 * @param hide
 */
export const ConfirmModal = ({
  children,
  modalRef,
  title,
  onConfirm,
  onCancel,
  hide,
}: ConfirmModalProps) => {
  return (
    <Modal modalRef={modalRef} hide={hide} hideOnClickOutside>
      {title && <ModalHeader title={title} hide={hide} />}
      <ModalContent>{children}</ModalContent>
      <ModalFooter>
        <Button onClick={onCancel} className="red-button">
          취소
        </Button>
        <Button onClick={onConfirm}>확인</Button>
      </ModalFooter>
    </Modal>
  );
};
