import { singleton } from "tsyringe";
import { Action, Store } from "usestore-ts";

import { apiService } from "../services/ApiService";

import { User } from "../types";

import { nullUser } from "../nullObject";

@singleton()
@Store()
class UserStore {
  user: User = nullUser;

  loading = true;

  error = false;

  done = false;

  get passwordValid() {
    return
  }

  @Action()
  private setUser(user: User) {
    this.user = user;
    this.loading = false;
    this.error = false;
    this.done = false;
  }

  @Action()
  reset() {
    this.user = nullUser;
    this.error = false;
    this.done = false;
  }

  @Action()
  private setDone() {
    this.done = true;
    this.loading = false;
    this.error = false;
  }

  @Action()
  private startLoading() {
    this.reset()
    this.loading = true;
    this.error = false;
  }

  @Action()
  private setError() {
    this.user = nullUser;
    this.loading = false;
    this.error = true;
  }

  async fetchUser() {
    try {
      this.startLoading();
      const user = await apiService.fetchCurrentUser();
      this.setUser(user);
    } catch (error) {
      this.setError();
    }
  }

}

export default UserStore;
