import { singleton } from 'tsyringe';
import { Store, Action } from 'usestore-ts';

import { ApiState, User } from '../types';
import { nullUser } from '../nullObject';

import { apiService } from '../services/ApiService';

import { ERROR_MESSAGES, FETCH_STATE, LOCAL_STORAGE } from '../constants';

@singleton()
@Store()
class AuthStore {
  isAutoLogin = localStorage.getItem(LOCAL_STORAGE.AUTO_LOGIN) === 'true';

  user: User = nullUser;

  errorMessage = '';

  state: ApiState = FETCH_STATE.IDLE;

  @Action()
  reset() {
    this.user = nullUser;
    this.errorMessage = '';
    this.state = FETCH_STATE.IDLE;
  }

  @Action()
  setIsAutoLogin() {
    this.isAutoLogin = !this.isAutoLogin;
    localStorage.setItem(LOCAL_STORAGE.AUTO_LOGIN, this.isAutoLogin.toString())
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
      this.errorMessage = typedError.message || ERROR_MESSAGES.UNEXPECTED;

      this.setError();
    }
  }

  @Action()
  private startLoading() {
    this.reset()
    this.state = FETCH_STATE.LOADING;
  }

  @Action()
  private setDone() {
    this.state = FETCH_STATE.FETCHED;
  }

  @Action()
  private setError() {
    this.state = FETCH_STATE.ERROR;
  }
}

export default AuthStore;
