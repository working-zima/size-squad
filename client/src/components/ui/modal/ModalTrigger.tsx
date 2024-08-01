import { ReactNode } from "react";

import { AlertModal, ConfirmModal } from "./ModalComponents";

import Button from "../Button";
import useModal from "../../../hooks/useModal";

type AlertTriggerProps = {
  children: ReactNode;
  buttonText: string;
}

export const AlertTrigger = ({ children, buttonText }: AlertTriggerProps) => {
  const { modalRef, openModal, closeModal } = useModal()

  return (
    <>
      <Button onClick={openModal}>{buttonText}</Button>
      <AlertModal modalRef={modalRef} children={children} hide={closeModal} />
    </>
  )
}

type ConfirmTriggerProps = {
  title: string
  buttonText: string
  confirmed: boolean | null
  children: ReactNode;
  setConfirmed: (confirm: boolean) => void;
}

export const ConfirmTrigger = ({
  title,
  buttonText,
  children,
  confirmed,
  setConfirmed,
}: ConfirmTriggerProps
) => {
  const { modalRef, openModal, closeModal } = useModal()

  return (
    <>
      <Button onClick={openModal} className="delete-link">
        {buttonText}
      </Button>
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