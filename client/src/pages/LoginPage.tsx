import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LoginForm from '../components/logIn/LoginForm';

import { accessTokenUtil } from '../auth/accessTokenUtil';
import { authService } from '../auth/AuthService';

import { FETCH_STATE } from '../constants/constants';
import { ERROR_MESSAGES } from '../constants/messages';
import useAuthStore from '../hooks/useAuthStore';

export default function LoginPage() {
  const navigate = useNavigate();
  const [, authStore] = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accessToken, setAccessToken] = useState(accessTokenUtil.getAccessToken());
  const [errorMessage, setErrorMessage] = useState('');
  const [state, setState] = useState(FETCH_STATE.IDLE);

  useEffect(() => {
    resetForm()
  }, []);

  useEffect(() => {
    if (accessToken) {
      resetForm();
      authStore.fetchMyUserData();
      navigate('/');
    }
  }, [accessToken]);

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setErrorMessage('');
    setState(FETCH_STATE.IDLE);
  };

  const login = async () => {
    try {
      setState(FETCH_STATE.LOADING);
      const accessToken = await authService.login({ email, password });
      setAccessToken(accessToken);
      accessTokenUtil.setAccessToken(accessToken);
    } catch (error) {
      const typedError = error as { status?: number; message: string };
      if (typedError.status === 400) {
        setErrorMessage(ERROR_MESSAGES.INVALID_LOGIN);
      } else {
        setErrorMessage(typedError.message || ERROR_MESSAGES.UNEXPECTED);
      }
      setState(FETCH_STATE.ERROR);
    }
  }

  return (
    <LoginForm
      email={email}
      password={password}
      errorMessage={errorMessage}
      state={state}
      setEmail={setEmail}
      setPassword={setPassword}
      login={login}
      resetForm={resetForm}
    />
  );
}
