import axiosInstance from '../api/axiosInstance';

export default class AuthService {
  static async reissueToken() {
    const tokenRefreshResult = await axiosInstance.get('/session');
    return tokenRefreshResult;
  }

  async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<string> {
    const { data } = await axiosInstance.post('/session', { email, password });
    return data.accessToken;
  }

  async logout(): Promise<void> {
    await axiosInstance.delete('/session');
  }
}

export const authService = new AuthService();
