import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import styled from 'styled-components';

import { accessTokenUtil } from '../../auth/accessTokenUtil';
import { ApiState } from '../../types';
import Divider from '../ui/Divider';
import { LoginButton } from './LoginButton';
import { LoginInput } from './LoginInput';
import { LoginUtils } from './LoginUtils';

const Container = styled.div.attrs({ className: 'MemberWrapper' })`
  padding: 20px ${(props) => props.theme.sizes.contentPadding} 0;
  user-select: none;

  h2 {
    display: none;
  }
`;

type LoginFormProps = {
  email: string;
  password: string;
  errorMessage: string;
  state: ApiState;
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  login: () => void;
  resetForm: () => void;
};

export default function LoginForm({
  email,
  password,
  errorMessage,
  state,
  setEmail,
  setPassword,
  login,
  resetForm,
}: LoginFormProps) {
  const [isShowPw, setIsShowPw] = useState(false);
  const [isAutoLogin, setIsAutoLogin] = useState(
    accessTokenUtil.getIsAutoLogin(),
  );

  const toggleAutoLogin = () => {
    accessTokenUtil.setIsAutoLogin(!isAutoLogin);
    setIsAutoLogin((prev) => !prev);
  };

  const handleChangeEmail = (value: string) => {
    setEmail(value);
  };

  const handleChangePassword = (value: string) => {
    setPassword(value);
  };

  const handleResetPassword = () => {
    setPassword('');
  };

  const handleResetEmail = () => {
    setEmail('');
  };

  const handleShowPassword = () => {
    setIsShowPw((prev) => !prev);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login();
    accessTokenUtil.setAccessToken('');
  };

  return (
    <Container>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <LoginInput
          email={email}
          password={password}
          isShowPw={isShowPw}
          handleChangeEmail={handleChangeEmail}
          handleChangePassword={handleChangePassword}
          handleResetEmail={handleResetEmail}
          handleShowPassword={handleShowPassword}
          handleResetPassword={handleResetPassword}
        />
        <LoginButton
          valid={email.includes('@') && !!password}
          isAutoLogin={isAutoLogin}
          toggleAutoLogin={toggleAutoLogin}
        />
        <Divider>또는</Divider>
        <LoginUtils
          state={state}
          errorMessage={errorMessage}
          resetForm={resetForm}
        />
      </form>
    </Container>
  );
}
