import { singleton } from "tsyringe";
import { Action, Store } from "usestore-ts";

import { Summary } from "../types";

import { apiService } from "../services/ApiService";
import { nullSummary } from "../nullObject";

@singleton()
@Store()
class GendersStore {
  genders: Summary[] = [];

  loading = true;

  error = false;

  @Action()
  private setGender(gender: Summary[]) {
    this.genders = gender;
    this.loading = false;
    this.error = false;
  }

  @Action()
  private startLoading() {
    this.genders = [nullSummary];
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