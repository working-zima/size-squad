import { singleton } from "tsyringe";
import { Action, Store } from "usestore-ts";
import { apiService } from "../services/ApiService";
import { GenderSummary, User } from "../types";
import { nullGender } from "../nullObject";

@singleton()
@Store()
class UserStore {
  userId = '';

  email = '';

  name = '';

  password = '';

  gender:GenderSummary = nullGender;

  height = 0;

  weight = 0;

  description = '';

  followers: Pick<User, "_id" | "name">[] = [];

  following: Pick<User, "_id" | "name">[] = [];

  loading = true;

  error = false;

  done = false;

  @Action()
  private setUser(user: User) {
    this.userId = user._id;
    this.email = user.email;
    this.name = user.name;
    this.password = user.password;
    this.gender = user.genderId;
    this.height = user.height;
    this.weight = user.weight;
    this.description = user.description;
    this.followers = user.followers;
    this.following = user.following;
  }

  @Action()
  private startLoading() {
    this.loading = true;
    this.error = false;
  }

  @Action()
  private setError() {
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