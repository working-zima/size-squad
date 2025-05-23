import SignUpConfirmPasswordInput from './SignUpConfirmPasswordInput';
import SignUpPasswordInput from './SignUpPasswordInput';

type SignUpPasswordProps = {
  pwdLabel?: string;
  pwdPlaceholder?: string;
  confirmPlaceholder?: string;
  pwdAutocomplete?: string;
  confirmAutocomplete?: string;
};

export default function PasswordInputs({
  pwdLabel = '',
  pwdPlaceholder = '',
  confirmPlaceholder = '',
  pwdAutocomplete = '',
  confirmAutocomplete = '',
}: SignUpPasswordProps) {
  return (
    <>
      <SignUpPasswordInput
        label={pwdLabel}
        placeholder={pwdPlaceholder}
        pwdAutocomplete={pwdAutocomplete}
      />
      <SignUpConfirmPasswordInput
        placeholder={confirmPlaceholder}
        confirmAutocomplete={confirmAutocomplete}
      />
    </>
  );
}
