import axios from 'axios';

const MOCK_BASE_URL = 'http://localhost:5000';

class ApiInstance {
  public static create() {
    return axios.create({ baseURL: MOCK_BASE_URL });
  }
}

export default ApiInstance;
