import { InternalAxiosRequestConfig } from 'axios';

import { accessTokenUtil } from '../../auth/accessTokenUtil';

export const onRequest = (config: InternalAxiosRequestConfig) => {
  const token = accessTokenUtil.getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
};

export const onRequestError = (error: unknown) => Promise.reject(error);
