import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import ApiInstance from './ApiInstance';

import { accessTokenUtil } from '../auth/accessTokenUtil';
import AuthService from '../auth/AuthService';
class ApiService {
  private instance = ApiInstance.create();

  private isRefreshing = false;

  private failedQueue: Array<(token: string) => void> = [];

  constructor() {
    this.initializeInterceptors();
  }

  private initializeInterceptors() {
    this.instance.interceptors.request.use(
      this.onRequest, this.onErrorRequest
    );
    this.instance.interceptors.response.use(
      this.onResponse, this.onErrorResponse
    );
  }

  private logOnDev = (message: string) => {
    if (process.env.REACT_APP_NODE_ENV === "development") console.log(message);
  };

  private onError = (status: number | undefined, message: string) => {
    const error = { status, message };
    throw error;
  };

  private onRequest = (config: InternalAxiosRequestConfig) => {
    const accessToken = accessTokenUtil.getAccessToken();
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  };

  private onErrorRequest = (error: AxiosError | Error) => {
    return Promise.reject(error);
  }

  private onResponse = (response: AxiosResponse): AxiosResponse => {
    const { method, url } = response.config;
    const { status } = response;
    this.logOnDev(`[API] ${method?.toUpperCase()} ${url} | Request ${status}`);
    return response;
  };

  private handleTokenRefresh = async (config: InternalAxiosRequestConfig) => {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      try {
        const tokenRefreshResult = await AuthService.reissueToken();
        const { accessToken } = tokenRefreshResult.data;

        // 새로 발급받은 토큰을 스토리지에 저장
        accessTokenUtil.setAccessToken(accessToken);

        this.failedQueue.forEach(callback => callback(accessToken));
        this.failedQueue = [];

        config.headers.Authorization = `Bearer ${accessToken}`;

        // 토큰 갱신 성공. API 재요청
        return this.instance(config);
      } catch (error) {
        this.onError(401, "인증 실패입니다.");
        return Promise.reject(error);
      } finally {
        this.isRefreshing = false;
      }
    } else {
      // TokenExpired로 인해 실패한 첫 요청 이후 요청들
      return new Promise((resolve) => {
        this.failedQueue.push((token: string) => {
          config.headers.Authorization = `Bearer ${token}`;
          resolve(this.instance(config));  // 재요청
        });
      });
    }
  }

  private onErrorResponse = async (error: AxiosError | Error) => {
    if (error instanceof AxiosError) {
      const { message, response, config } = error;
      const { method, url } = config || {};

      if (!config) {
        this.onError(0, "요청 설정을 찾을 수 없습니다.");
        return Promise.reject(error);
      }

      // 네트워크 오류 처리
      if (!response) {
        this.logOnDev(
          `[API] ${method?.toUpperCase()} ${url} | Network Error: ${message}`
        );
        this.onError(undefined, "네트워크 오류가 발생했습니다.");
        return Promise.reject(error);
      }

      const { status, statusText } = response;

      // 토큰 재발급 요청
      if (status === 401 && response.data.message === "TokenExpired") {
        return await this.handleTokenRefresh(config);
      }

      this.logOnDev(
        `[API] ${method?.toUpperCase()} ${url}
        | Error ${status} ${statusText}
        | ${message}`
      );

      switch (status) {
        case 400:
          this.onError(status, "잘못된 요청입니다.");
          break;
        case 401: {
          this.onError(status, "인증 실패입니다.");
          break;
        }
        case 403: {
          this.onError(status, "권한이 없습니다.");
          break;
        }
        case 404: {
          this.onError(status, "찾을 수 없는 페이지입니다.");
          break;
        }
        case 500: {
          this.onError(status, "서버 오류입니다.");
          break;
        }
        default: {
          this.onError(status, `에러가 발생했습니다. ${message}`);
        }
      }
    }

    return Promise.reject(error);
  };

  public getInstance() {
    return this.instance;
  }
}

export default new ApiService().getInstance();

