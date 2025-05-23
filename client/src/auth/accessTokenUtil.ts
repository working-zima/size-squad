import { LOCAL_STORAGE } from './constants';

export const accessTokenUtil = {
  getAccessToken: () => {
    const isAutoLogin =
      localStorage.getItem(LOCAL_STORAGE.AUTO_LOGIN) === 'true';
    const token = isAutoLogin
      ? localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN) || ''
      : sessionStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN) || '';
    return token;
  },

  setAccessToken: (token: string) => {
    const isAutoLogin =
      localStorage.getItem(LOCAL_STORAGE.AUTO_LOGIN) === 'true';
    if (isAutoLogin) {
      localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, token);
    } else {
      sessionStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, token);
    }
  },

  getIsAutoLogin: () => {
    return localStorage.getItem(LOCAL_STORAGE.AUTO_LOGIN) === 'true';
  },

  setIsAutoLogin: (value: boolean) => {
    localStorage.setItem(LOCAL_STORAGE.AUTO_LOGIN, value.toString());
  },
};
