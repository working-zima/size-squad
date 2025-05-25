import { createAxiosInstance } from './createAxiosInstance';
import { setupInterceptors } from './setupInterceptors';

const axiosInstance = createAxiosInstance();
setupInterceptors(axiosInstance);

export default axiosInstance;
