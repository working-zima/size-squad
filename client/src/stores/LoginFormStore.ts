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

  state: 'loading' | 'fetched' | 'idle' | 'error' = 'idle'

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
  reset() {
    this.email = '';
    this.password = '';
    this.accessToken = '';
    this.errorMessage = '';
    this.state = 'idle';
  }

  async login() {
    try {
      const accessToken = await apiService.login({
        email: this.email,
        password: this.password,
      });
      this.setAccessToken(accessToken);

      this.setDone();
    } catch (error) {
      const typedError = error as { status?: number; message: string };
      if (typedError.status === 400) this.errorMessage = '아이디 또는 비밀번호가 맞지 않습니다.'
      else this.errorMessage = typedError.message || '예기치 못한 오류가 발생했습니다.'

      this.setError()
    }
  }
  @Action()
  private startLoading() {
    this.email = '';
    this.password = '';
    this.state = 'loading';
  }

  @Action()
  private setDone() {
    this.state = 'fetched';
  }

  @Action()
  private setError() {
    this.state = 'error';
  }
}

export default LoginFormStore;
