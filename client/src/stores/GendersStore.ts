import { singleton } from "tsyringe";
import { Action, Store } from "usestore-ts";

import { Gender } from "../types";

import { apiService } from "../services/ApiService";
import { nullGender } from "../nullObject";

@singleton()
@Store()
class GendersStore {
  genders: Gender[] = [nullGender];

  loading = true;

  error = false;

  @Action()
  private setGender(gender: Gender[]) {
    this.genders = gender;
    this.loading = false;
    this.error = false;
  }

  @Action()
  private startLoading() {
    this.genders = [nullGender];
    this.loading = true;
    this.error = false;
  }

  @Action()
  private setError() {
    this.error = true;
  }

  async fetchGenders() {
    try {
      this.startLoading();

      const gender = await apiService.fetchGenders();

      this.setGender(gender);
    } catch (error) {
      this.setError();
    }
  }
}

export default GendersStore;