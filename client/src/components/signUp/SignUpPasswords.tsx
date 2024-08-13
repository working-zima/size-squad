import SignUpPasswordInput from "./SignUpPasswordInput";
import SignUpConfirmPasswordInput from "./SignUpConfirmPasswordInput";

type SignUpPasswordProps = {
  pwdLabel?: string;
  pwdPlaceholder?: string;
  confirmPlaceholder?: string;
}

export default function SignUpPasswords({
  pwdLabel="",
  pwdPlaceholder="",
  confirmPlaceholder=""
}: SignUpPasswordProps) {

  return (
    <>
      <SignUpPasswordInput
        label={pwdLabel}
        placeholder={pwdPlaceholder}
      />
      <SignUpConfirmPasswordInput
        placeholder={confirmPlaceholder}
      />
    </>
  )
}