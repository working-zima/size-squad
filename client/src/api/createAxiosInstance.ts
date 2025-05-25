import axios from 'axios';

export const createAxiosInstance = () => {
  const baseURL =
    process.env.REACT_APP_NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : process.env.REACT_APP_API_BASE_URL;

  return axios.create({
    baseURL,
    withCredentials: true,
  });
};
