import { singleton } from "tsyringe";
import { Action, Store } from "usestore-ts";

import { Gender } from "../types";

import { apiService } from "../services/ApiService";
import { nullGender } from "../nullObject";

@singleton()
@Store()
class GenderStore {
  genderList: Gender[] = [nullGender];

  loading = true;

  error = false;

  @Action()
  private startLoading() {
    this.genderList = [nullGender];
    this.loading = true;
    this.error = false;
  }

  @Action()
  private setGender(gender: Gender[]) {
    this.genderList = gender;
    this.loading = false;
    this.error = false;
  }

  @Action()
  private setError() {
    this.error = true;
  }

  async fetchGender() {
    try {
      this.startLoading();

      const gender = await apiService.fetchGender();

      this.setGender(gender);
    } catch (error) {
      this.setError();
    }
  }
}

export default GenderStore;