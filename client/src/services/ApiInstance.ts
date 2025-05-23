import axios from 'axios';

const MOCK_BASE_URL =
  process.env.REACT_APP_NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : process.env.REACT_APP_API_BASE_URL;

class ApiInstance {
  public static create() {
    return axios.create({ baseURL: MOCK_BASE_URL, withCredentials: true });
  }
}

export default ApiInstance;
