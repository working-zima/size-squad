import ApiService from "../services/ApiService";

export default class AuthService {
  static async reissueToken() {
    try {
      const tokenRefreshResult = await ApiService.get('/session');
      return tokenRefreshResult;
    } catch (error) {
      throw error;
    }
  }

  async login({
    email, password
  }: { email: string; password: string }): Promise<string> {
    const { data } = await ApiService.post('/session', { email, password });
    return data.accessToken;
  }

  async logout(): Promise<void> {
    await ApiService.delete('/session');
  }
}

export const authService = new AuthService();
