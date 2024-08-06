import { TextInputBox } from "../ui/textbox/TextBoxComponents";

type LoginInputProps = {
  email: string;
  password: string;
  isShowPw: boolean;
  handleChangeEmail: (value: string) => void;
  handleChangePassword: (value: string) => void;
  handleResetEmail: () => void;
  handleShowPassword: () => void;
  handleResetPassword: () => void;
}

export function LoginInput({
  email, password, isShowPw,
  handleChangeEmail, handleChangePassword, handleResetEmail, handleShowPassword, handleResetPassword
}: LoginInputProps) {

  return (
    <>
      <TextInputBox
        placeholder="이메일"
        value={email}
        onChange={handleChangeEmail}
        onReset={handleResetEmail}
      />
      <TextInputBox
        placeholder="비밀번호"
        type={isShowPw ? "text" : "password"}
        value={password}
        maxLength={16}
        isShowPw={isShowPw}
        onChange={handleChangePassword}
        onReset={handleResetPassword}
        handleShowPassword={handleShowPassword}
      />
    </>
  )
}