import { useEffect } from 'react';

import { apiService } from '../services/ApiService';

import { useLocalStorage, useSessionStorage } from 'usehooks-ts';

import useAutoLoginStore from './useAutoLoginStore';

export default function useAccessToken() {
  const [{ isAutoLogin }] = useAutoLoginStore();

  const [localAccessToken, setLocalAccessToken]
    = useLocalStorage('accessToken', '');

  const [sessionAccessToken, setSessionAccessToken]
    = useSessionStorage('accessToken', '');

  const accessToken = isAutoLogin ? localAccessToken : sessionAccessToken;

  useEffect(() => {
    apiService.setAccessToken(accessToken);
  }, [accessToken]);

  return {
    accessToken,
    setAccessToken: isAutoLogin ? setLocalAccessToken : setSessionAccessToken
  };
}
