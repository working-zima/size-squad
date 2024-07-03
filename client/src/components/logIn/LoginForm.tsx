import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import useAccessToken from '../../hooks/useAccessToken';
import useLoginFormStore from '../../hooks/useLoginFormStore';

import useAutoLoginStore from '../../hooks/useAutoLoginStore';
import { MemberInput } from './MemberInput';
import { MemberButton } from './MemberButton';

const Container = styled.div.attrs({ className: 'MemberWrapper' })`
  padding: 20px ${props => props.theme.sizes.contentPadding} 0;

  h2 {
    display: none;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 28px;
  width: 100%;

  a {
    color: ${props => props.theme.colors.unSelectedText};
    text-decoration-line: underline;
  }
`

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 40px 0 28px;
  font-size: 14px;

  &::before {
    flex: 1;
    width: 100%;
    margin-right: 1.6rem;
    border-top: 1px solid ${props => props.theme.colors.borderColor};
    content: "";
  }

  &::after {
    flex: 1;
    width: 100%;
    margin-left: 1.6rem;
    border-top: 1px solid ${props => props.theme.colors.borderColor};
    content: "";
  }
`

export default function LoginForm() {
  const [isShowPw, setIsShowPw] = useState(false);

  const { setAccessToken } = useAccessToken();

  const [
    { email, password, valid, error, accessToken }, store
  ] = useLoginFormStore();

  const [{ isAutoLogin }, AutoLoginstore] = useAutoLoginStore();

  useEffect(() => {
    if (accessToken) {
      setAccessToken(accessToken);
    }
  }, [accessToken]);

  const toggleAutoLogin = () => {
    AutoLoginstore.setIaAutoLogin()
  }

  const handleChangeEmail = (value: string) => {
    store.changeEmail(value);
  };

  const handleChangePassword = (value: string) => {
    store.changePassword(value);
  };

  const handleResetEmail = () => {
    store.changeEmail('');
  }

  const handleShowPassword = () => {
    setIsShowPw(prev => !prev);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    store.login();
    if(!isAutoLogin) localStorage.removeItem('accessToken')
      else sessionStorage.removeItem('accessToken')
  };

  return (
    <Container>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <MemberInput
          email={email}
          password={password}
          isShowPw={isShowPw}
          handleChangeEmail={handleChangeEmail}
          handleChangePassword={handleChangePassword}
          handleResetEmail={handleResetEmail}
          handleShowPassword={handleShowPassword}
          />
        <MemberButton
          valid={valid}
          isAutoLogin={isAutoLogin}
          toggleAutoLogin={toggleAutoLogin }
        />
        <Divider>
          또는
        </Divider>
        {error && (
          <>
            <p>로그인 실패</p>
            <div>{error}</div>
          </>
        )}
        <ButtonWrapper>
          <p>
            <Link to="/signup">
              회원 가입
            </Link>
          </p>
        </ButtonWrapper>
      </form>
    </Container>
  );
}

