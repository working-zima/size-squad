import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import LoginForm from '../components/logIn/LoginForm';

import useLoginFormStore from '../hooks/useLoginFormStore';

export default function LoginPage() {
  const navigate = useNavigate();

  const [{ accessToken, error }, store] = useLoginFormStore();
  console.log(`LoginPage`, error)
  useEffect(() => {
    store.reset();
  }, []);

  useEffect(() => {
    if (accessToken) {
      store.reset();
      navigate('/');
    }
  }, [accessToken]);

  return (
    <LoginForm />
  );
}
