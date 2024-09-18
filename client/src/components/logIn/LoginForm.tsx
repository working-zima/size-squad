import { FormEvent, useEffect, useState } from 'react';

import styled from 'styled-components';

import { LoginInput } from './LoginInput';
import { LoginButton } from './LoginButton';
import { LoginUtils } from './LoginUtils';

import Divider from '../ui/Divider';

import useAccessToken from '../../hooks/useAccessToken';
import useLoginFormStore from '../../hooks/useLoginFormStore';

import { apiService } from '../../services/ApiService';

const Container = styled.div.attrs({ className: 'MemberWrapper' })`
  padding: 20px ${props => props.theme.sizes.contentPadding} 0;
  user-select: none;

  h2 {
    display: none;
  }
`;

export default function LoginForm() {
  const [isShowPw, setIsShowPw] = useState(false);

  const { isAutoLogin, setAccessToken, setIsAutoLogin } = useAccessToken();

  const [
    { email, password, valid, state, errorMessage, accessToken }, store
  ] = useLoginFormStore();

  useEffect(() => {
    if (accessToken) {
      setAccessToken(accessToken);
    }
  }, [accessToken]);

  const toggleAutoLogin = () => {
    setIsAutoLogin(prev => !prev)
  }

  const handleChangeEmail = (value: string) => {
    store.changeEmail(value);
  };

  const handleChangePassword = (value: string) => {
    store.changePassword(value);
  };

  const handleResetPassword = () => {
    store.changePassword('');
  }

  const handleResetEmail = () => {
    store.changeEmail('');
  }

  const handleShowPassword = () => {
    setIsShowPw(prev => !prev);
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    store.login();

    apiService.setIsAutoLogin(isAutoLogin);
    setAccessToken('')
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
          valid={valid}
          isAutoLogin={isAutoLogin}
          toggleAutoLogin={toggleAutoLogin}
        />
        <Divider>
          또는
        </Divider>
        <LoginUtils state={state} errorMessage={errorMessage} />
      </form>
    </Container>
  );
}
