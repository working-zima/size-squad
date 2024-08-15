import { ReactNode } from "react";

import { AlertModal, ConfirmModal } from "./ModalComponents";

import Button from "../Button";
import useModal from "../../../hooks/useModal";

type AlertTriggerProps = {
  children: ReactNode
  buttonText?: string
}

/** 모달 버튼이 필요한 경우 trigger 사용 */
export const AlertTrigger = ({ children, buttonText }: AlertTriggerProps) => {
  const { modalRef, openModal, closeModal } = useModal()

  return (
    <>
      {buttonText && (<Button onClick={openModal}>{buttonText}</Button>)}
      <AlertModal modalRef={modalRef} children={children} hide={closeModal} />
    </>
  )
}

type ConfirmTriggerProps = {
  title?: string
  buttonType?: string
  buttonText: string
  disabled?: boolean | null
  confirmed: boolean | null
  children: ReactNode
  setConfirmed: (confirm: boolean) => void
}

export const ConfirmTrigger = ({
  title,
  buttonType,
  buttonText,
  disabled=true,
  children,
  confirmed,
  setConfirmed,
}: ConfirmTriggerProps
) => {
  const { modalRef, openModal, closeModal } = useModal()

  return (
    <>
      <Button
        onClick={openModal}
        type={buttonType = 'button'}
        disabled={!disabled}
      >
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