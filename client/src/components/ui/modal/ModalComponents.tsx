import { ReactNode, RefObject } from "react"
import Modal from "./Modal"
import ModalHeader from "./ModalHeader"
import ModalContent from "./ModalContent"
import ModalFooter from "./ModalFooter"

type ConfirmModalProps = {
  modalRef: RefObject<HTMLDialogElement>
  children: ReactNode
  title?: string
  confirmed: boolean | null
  onConfirm: () => void
  onCancel: () => void
  hide: () => void
}

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
      <ModalHeader title={title} hide={hide}/>
      <ModalContent>{children}</ModalContent>
      <ModalFooter>
      <button onClick={onConfirm}>확인</button>
      <button onClick={onCancel}>취소</button>
    </ModalFooter>
    </Modal>
  )
}