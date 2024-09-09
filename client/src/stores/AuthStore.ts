import { singleton } from 'tsyringe';
import { Store, Action } from 'usestore-ts';

import { ApiState, User } from '../types';
import { nullUser } from '../nullObject';

import { apiService } from '../services/ApiService';

@singleton()
@Store()
class AuthStore {
  isAutoLogin = localStorage.getItem('isAutoLogin') === 'true';

  user: User = nullUser;

  errorMessage = '';

  state: ApiState = 'idle'

  @Action()
  reset() {
    this.user = nullUser;
    this.errorMessage = '';
    this.state = 'idle';
  }

  @Action()
  setIsAutoLogin() {
    this.isAutoLogin = !this.isAutoLogin;
    localStorage.setItem('isAutoLogin', this.isAutoLogin.toString())
  }

  @Action()
  private setUser(user: User) {
    this.user = user;
  }

  async fetchMyUserData() {
    try {
      this.startLoading();
      const user = await apiService.fetchCurrentUser();

      this.setUser(user);
      this.setDone();
    } catch (error) {
      const typedError = error as { status?: number; message: string };
      this.errorMessage = typedError.message || '예기치 못한 오류가 발생했습니다.'

      this.setError();
    }
  }

  @Action()
  private startLoading() {
    this.reset()
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

export default AuthStore;
