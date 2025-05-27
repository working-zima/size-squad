import { AxiosInstance } from 'axios';

import { onRequest, onRequestError } from './interceptors/requestInterceptor';
import {
  onResponse,
  onResponseError,
} from './interceptors/responseInterceptor';

export const setupInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
};
