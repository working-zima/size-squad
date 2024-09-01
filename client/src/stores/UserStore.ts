import { singleton } from "tsyringe";
import { Action, Store } from "usestore-ts";

import { apiService } from "../services/ApiService";

import { User } from "../types";

import { nullUser } from "../nullObject";

@singleton()
@Store()
class UserStore {
  user: User = nullUser;

  errorMessage = '';

  state: 'loading' | 'fetched' | 'idle' | 'error' = 'idle'

  get passwordValid() {
    return
  }

  @Action()
  private setUser(user: User) {
    this.user = user;
  }

  @Action()
  reset() {
    this.user = nullUser;
    this.errorMessage = ''
    this.state = 'idle';
  }

  async fetchUser() {
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
    this.user = nullUser;
    this.state = 'error';
  }
}

export default UserStore;
