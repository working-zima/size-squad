import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { CiRead, CiUnread, CiCircleRemove } from "react-icons/ci";

import TextBox from '../ui/TextBox';
import Button from '../ui/Button';

import useAccessToken from '../../hooks/useAccessToken';
import useLoginFormStore from '../../hooks/useLoginFormStore';
import CheckBox from '../ui/CheckBox';
import useAutoLoginStore from '../../hooks/useAutoLoginStore';

const Container = styled.div.attrs({ className: 'MemberWrapper' })`
  padding: 20px ${props => props.theme.sizes.contentPadding} 0;

  h2 {
    display: none;
  }
`;

const TextBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${props => props.theme.colors.borderColor};
  border-radius: 6px;
  margin-top: .8rem;

  input::placeholder  {
    color: ${props => props.theme.colors.borderColor};;
  }

  button {
    padding: 0;
    margin-right: 6px;
  }

  &:focus-within {
    border-color: ${props => props.theme.colors.primaryBlack};
  }
`

const ButtonWrappser = styled.div`
  margin-top: 28px;

  button {
    width: 100%;
    height: 48px;
    background-color: ${props => props.theme.colors.primaryBlack};
    color: ${props => props.theme.colors.primaryWhite};
    font-size: 1.6rem;
    font-weight: 600;
    border-color: ${props => props.theme.colors.primaryBlack};
    border-radius: 6px;
  }
`

const CheckBoxWrapper = styled.div`
  margin-top: 1.2rem;
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

  const toggleAutoLogin = () => {
    AutoLoginstore.setIaAutoLogin()
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
        <TextBoxWrapper>
          <TextBox
            label="E-mail"
            placeholder="이메일"
            value={email}
            onChange={handleChangeEmail}
          />
          <Button onClick={handleResetEmail}>
            <CiCircleRemove size="18" fill='#c1c4c9'/>
          </Button>
        </TextBoxWrapper>
        <TextBoxWrapper>
          <TextBox
            label="Password"
            placeholder="비밀번호"
            type={isShowPw ? "text" : "password"}
            value={password}
            onChange={handleChangePassword}
          />
          <Button onClick={handleShowPassword}>
            {
              isShowPw
                ? <CiRead size="18" fill='#c1c4c9'/>
                : <CiUnread size="18" fill='#c1c4c9'/>
            }
          </Button>
        </TextBoxWrapper>
        <ButtonWrappser>
          <Button type="submit" disabled={!valid}>
            로그인
          </Button>
        </ButtonWrappser>
        <CheckBoxWrapper>
          <CheckBox
            label='자동 로그인'
            checked={isAutoLogin}
            onChange={toggleAutoLogin}
          />
        </CheckBoxWrapper>
        {error && (
          <p>로그인 실패</p>
        )}
        <p>
          <Link to="/signup">
            회원 가입
          </Link>
        </p>
      </form>
    </Container>
  );
}

