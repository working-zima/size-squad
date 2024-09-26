import axios from 'axios';

const MOCK_BASE_URL = process.env.REACT_APP_API_BASE_URL;

class ApiInstance {
  public static create() {
    return axios.create({ baseURL: MOCK_BASE_URL, withCredentials: true });
  }
}

export default ApiInstance;
