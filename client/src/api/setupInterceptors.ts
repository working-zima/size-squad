import { AxiosInstance } from 'axios';

import { onRequest, onRequestError } from './interceptors/requestInterceptor';
import {
  onResponse,
  onResponseError,
} from './interceptors/responseInterceptor';

export const setupInterceptors = (axios: AxiosInstance) => {
  axios.interceptors.request.use(onRequest, onRequestError);
  axios.interceptors.response.use(onResponse, onResponseError);
};
