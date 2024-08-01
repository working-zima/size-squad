import { singleton } from 'tsyringe';

import { Store, Action } from 'usestore-ts';

import { apiService } from '../services/ApiService';

@singleton()
@Store()
class LoginFormStore {
  accessToken = '';

  email = '';

  password = '';

  errorMessage = '';

  error = false;

  get valid() {
    return this.email.includes('@') && !!this.password;
  }

  @Action()
  changeEmail(email: string) {
    this.email = email;
  }

  @Action()
  changePassword(password: string) {
    this.password = password;
  }

  @Action()
  private setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
    this.errorMessage = '';
  }

  @Action()
  private setError(message: string) {
    this.error = true;
    this.errorMessage = message;
  }

  @Action()
  reset() {
    this.email = '';
    this.password = '';
    this.error = false;
    this.accessToken = '';
    this.errorMessage = '';
  }

  async login() {
    try {
      const accessToken = await apiService.login({
        email: this.email,
        password: this.password,
      });
      this.setAccessToken(accessToken);
    } catch (error) {
      if (error instanceof Error) {
        this.setError(error.message);
      } else {
        this.setError(`알 수 없는 오류가 발생했습니다.\n 관리자에게 문의해주세요.`);
      }
    }
  }
}

export default LoginFormStore;
