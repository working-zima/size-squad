import { ReactNode, RefObject } from "react"

import Modal from "./Modal"
import ModalHeader from "./ModalHeader"
import ModalContent from "./ModalContent"
import ModalFooter from "./ModalFooter"
import Button from "../Button"

type AlertModalProps = {
  modalRef: RefObject<HTMLDialogElement>
  children: ReactNode;
  hide: () => void;
}

/**
 * 알림 모달
 * @param props
 * @param modalRef
 * @param children
 * @param hide
 */
export const AlertModal = ({
  modalRef,
  children,
  hide,
}: AlertModalProps) => {
  return (
    <Modal modalRef={modalRef} hide={hide}>
      <ModalContent>
        <p>{children}</p>
      </ModalContent>
      <ModalFooter>
        <button onClick={hide}>확인</button>
      </ModalFooter>
    </Modal>
  )
}

type ConfirmModalProps = {
  modalRef: RefObject<HTMLDialogElement>
  children: ReactNode
  title?: string
  confirmed: boolean | null
  onConfirm: () => void
  onCancel: () => void
  hide: () => void
}

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
  modalRef,
  children,
  title,
  confirmed,
  onConfirm,
  onCancel,
  hide,
}: ConfirmModalProps) => {
  return (
    <Modal modalRef={modalRef} hide={hide} hideOnClickOutside>
      {title && (<ModalHeader title={title} hide={hide} />)}
      <ModalContent>{children}</ModalContent>
      <ModalFooter>
      <Button onClick={onConfirm}>확인</Button>
      <Button onClick={onCancel} className="red-button">취소</Button>
    </ModalFooter>
    </Modal>
  )
}