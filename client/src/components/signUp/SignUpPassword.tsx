import { useState } from "react";

import { CiCircleRemove, CiRead, CiUnread } from "react-icons/ci";

import useSignupFormStore from "../../hooks/useSignupFormStore";

import TextBox from "../ui/TextBox";
import Button from "../ui/Button";

export default function SignUpPassword() {
  const [isShowPw, setIsShowPw] = useState({
    showPassword: false,
    showConfirmation: false
  });

  const [{ password, passwordConfirmation }, store] = useSignupFormStore();

  const handleChangePassword = (value: string) => {
    store.changePassword(value);
  };

  const handleResetPassword = () => {
    store.changePassword('')
  }

  const handleChangePasswordConfirmation = (value: string) => {
    store.changePasswordConfirmation(value);
  };

  const handleResetPasswordConfirmation = () => {
    store.changePasswordConfirmation('');
  }

  const handleShowPassword = () => {
    setIsShowPw(prev => ({...prev, showPassword: !prev.showPassword}));
  }

  const handleShowConfirmation = () => {
    setIsShowPw(prev => ({...prev, showConfirmation: !prev.showConfirmation}));
  }

  return (
    <div>
      <TextBox
        label="비밀번호"
        placeholder="8 ~ 16자리를 사용합니다."
        type={isShowPw.showPassword ? "text" : "password"}
        value={password}
        onChangeString={handleChangePassword}
        required
      >
        <Button onClick={handleResetPassword}>
          {!!password && <CiCircleRemove size="18" fill='#6e6e6e'/>}
        </Button>
        <Button onClick={handleShowPassword}>
          {isShowPw.showPassword
            ? <CiRead size="18" fill='#6e6e6e'/>
            : <CiUnread size="18" fill='#6e6e6e'/>
          }
        </Button>
      </TextBox>
      <TextBox
        placeholder="비밀번호를 다시 입력해주세요."
        type={isShowPw.showConfirmation ? "text" : "password"}
        value={passwordConfirmation}
        onChangeString={handleChangePasswordConfirmation}
      >
        <Button onClick={handleResetPasswordConfirmation}>
          {!!passwordConfirmation
            && <CiCircleRemove size="18" fill='#6e6e6e'/>}
        </Button>
        <Button onClick={handleShowConfirmation}>
          {isShowPw.showConfirmation
            ? <CiRead size="18" fill='#6e6e6e'/>
            : <CiUnread size="18" fill='#6e6e6e'/>
          }
        </Button>
      </TextBox>
    </div>
  )
}