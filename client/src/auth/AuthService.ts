import apiInstance from '../services/ApiInstance';

export default class AuthService {
  static async reissueToken() {
    try {
      const tokenRefreshResult = await apiInstance.get('/session');
      return tokenRefreshResult;
    } catch (error) {
      throw error;
    }
  }

  async login({
    email, password
  }: { email: string; password: string }): Promise<string> {
    const { data } = await apiInstance.post('/session', { email, password });
    return data.accessToken;
  }

  async logout(): Promise<void> {
    await apiInstance.delete('/session');
  }
}

export const authService = new AuthService();
