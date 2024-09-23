import { singleton } from 'tsyringe';

import { Store, Action } from 'usestore-ts';

import { apiService } from '../services/ApiService';
import { ApiState } from '../types';

import { FETCH_STATE } from '../constants/constants';
import { ERROR_MESSAGES } from '../constants/messages';
import { accessTokenUtil } from '../auth/accessTokenUtil';

@singleton()
@Store()
class LoginFormStore {
  accessToken = '';

  email = '';

  password = '';

  errorMessage = '';

  state: ApiState = FETCH_STATE.IDLE;

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
    this.state = FETCH_STATE.IDLE;
  }

  async login() {
    try {
      const accessToken = await apiService.login({
        email: this.email,
        password: this.password,
      });
      this.setAccessToken(accessToken);
      accessTokenUtil.setAccessToken(accessToken)
      this.setDone();
    } catch (error) {
      const typedError = error as { status?: number; message: string };
      if (typedError.status === 400) this.errorMessage = ERROR_MESSAGES.INVALID_LOGIN
      else this.errorMessage = typedError.message || ERROR_MESSAGES.UNEXPECTED;

      this.setError()
    }
  }
  @Action()
  private startLoading() {
    this.email = '';
    this.password = '';
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

export default LoginFormStore;
