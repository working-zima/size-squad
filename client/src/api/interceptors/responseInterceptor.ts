import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { accessTokenUtil } from '../../auth/accessTokenUtil';
import AuthService from '../../auth/AuthService';
import { ApiException } from '../ApiException';
import axiosInstance from '../axiosInstance';

export const onResponse = (response: AxiosResponse) => response;

export type ErrorResponse = {
  message?: string;
  code?: string;
};

export const onResponseError = async (error: AxiosError<ErrorResponse>) => {
  const { config, response } = error;

  if (!config) throw new ApiException('요청 설정을 찾을 수 없습니다.', 0);
  if (!response) throw new ApiException('네트워크 오류가 발생했습니다.', 0);

  if (response.status === 401 && response.data?.message === 'TokenExpired') {
    return await handleTokenRefresh(config);
  }

  const message = response.data?.message ?? '요청 중 오류가 발생했습니다.';
  throw new ApiException(message, response.status, response.data?.code);
};

let isRefreshing = false;
let failedQueue: Array<(token: string) => void> = [];

/**
 * 액세스 토큰이 만료되었을 때 자동으로 토큰을 재발급 받고, 실패했던 요청을 재시도
 *
 * - 최초 토큰 만료 시에는 `AuthService.reissueToken`을 호출하여 새 토큰을 발급받고, 실패 큐에 등록된 요청들을 순차적으로 다시 실행
 * - 동시에 여러 요청이 실패한 경우 중복 갱신을 방지, 이미 진행 중이라면 큐에 등록된 콜백만 갱신된 토큰으로 재요청
 *
 * @param config - 실패한 요청의 Axios 설정 객체
 * @returns 재시도된 Axios 응답 Promise
 *
 * @throws {ApiException} 토큰 재발급 실패 시 에러 발생
 *
 * @example
 * if (response.status === 401 && response.data.message === 'TokenExpired') {
 *   return await handleTokenRefresh(error.config);
 * }
 */
const handleTokenRefresh = async (config: InternalAxiosRequestConfig) => {
  if (!isRefreshing) {
    isRefreshing = true;
    try {
      const tokenRefreshResult = await AuthService.reissueToken();
      const { accessToken } = tokenRefreshResult.data;

      // 새로 발급받은 토큰을 스토리지에 저장
      accessTokenUtil.setAccessToken(accessToken);

      // 보관된 실패 요청들에 새 accessToken 부여
      failedQueue.forEach((cb) => cb(accessToken));
      failedQueue = [];

      config.headers.Authorization = `Bearer ${accessToken}`;

      // 토큰 갱신 성공. API 재요청
      return axiosInstance(config);
    } finally {
      isRefreshing = false;
    }
  } else {
    // TokenExpired로 인해 실패한 첫 요청 이후 요청들을 failedQueue에 보관
    return new Promise((resolve) => {
      failedQueue.push((token) => {
        config.headers.Authorization = `Bearer ${token}`;
        resolve(axiosInstance(config));
      });
    });
  }
};
