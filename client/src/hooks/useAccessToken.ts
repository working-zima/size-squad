import { useEffect } from 'react';

import { apiService } from '../services/ApiService';

import { useLocalStorage, useSessionStorage } from 'usehooks-ts';

import { LOCAL_STORAGE } from '../constants';

export default function useAccessToken() {
  const [isAutoLogin, setIsAutoLogin] = useLocalStorage(LOCAL_STORAGE.AUTO_LOGIN, false)

  const [localAccessToken, setLocalAccessToken]
    = useLocalStorage(LOCAL_STORAGE.ACCESS_TOKEN, '');

  const [sessionAccessToken, setSessionAccessToken]
    = useSessionStorage(LOCAL_STORAGE.ACCESS_TOKEN, '');

  const accessToken = isAutoLogin ? localAccessToken : sessionAccessToken;
  const setAccessToken = isAutoLogin ? setLocalAccessToken : setSessionAccessToken

  useEffect(() => {
    apiService.setAccessToken(accessToken);
    apiService.setIsAutoLogin(isAutoLogin)
  }, [accessToken]);

  return {
    accessToken,
    isAutoLogin,
    setAccessToken,
    setIsAutoLogin
  };
}
