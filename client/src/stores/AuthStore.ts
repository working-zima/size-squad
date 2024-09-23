import { singleton } from 'tsyringe';
import { Store, Action } from 'usestore-ts';

import { ApiState, User } from '../types';
import { nullUser } from '../nullObject';

import { userService } from '../services/UserService';

import { FETCH_STATE } from '../constants/constants';
import { ERROR_MESSAGES } from '../constants/messages';

@singleton()
@Store()
class AuthStore {
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
  private setUser(user: User) {
    this.user = user;
  }

  async fetchMyUserData() {
    try {
      this.startLoading();
      const user = await userService.fetchCurrentUser(); // 문제

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
