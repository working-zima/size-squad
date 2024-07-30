import { ReactNode, RefObject } from "react";

import { ConfirmModal } from "./ModalComponents";

type ConfirmTriggerProps = {
  modalRef: RefObject<HTMLDialogElement>
  title: string
  buttonText: string
  confirmed: boolean | null
  children: ReactNode;
  openModal: () => void;
  closeModal: () => void;
  setConfirmed: (confirm: boolean) => void;
}

export const ConfirmTrigger = ({
  modalRef,
  title,
  buttonText,
  children,
  confirmed,
  openModal,
  setConfirmed,
  closeModal
}: ConfirmTriggerProps
) => {


  return (
    <>
      <button onClick={openModal}>
        {buttonText}
      </button>
      <ConfirmModal
        modalRef={modalRef}
        title={title}
        confirmed={confirmed}
        onConfirm={() => {
          setConfirmed(true)
          closeModal()
        }}
        onCancel={() => {
          setConfirmed(false)
          closeModal()
        }}
        hide={closeModal}
      >
        {children}
      </ConfirmModal>
    </>
  )
}