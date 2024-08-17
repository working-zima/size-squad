import { singleton } from "tsyringe";
import { Action, Store } from "usestore-ts";

import { Summary } from "../types";

import { apiService } from "../services/ApiService";
import { nullSummary } from "../nullObject";

@singleton()
@Store()
class GendersStore {
  genders: Summary[] = [];

  errorMessage = '';

  loading = true;

  error = false;

  done = false;

  @Action()
  private setGender(gender: Summary[]) {
    this.genders = gender;
    this.loading = false;
    this.error = false;
  }

  @Action()
  reset() {
    this.genders = [];
    this.error = false;
    this.done = false;
  }

  @Action()
  private startLoading() {
    this.genders = [nullSummary];
    this.loading = true;
    this.error = false;
  }

  @Action()
  private setDone() {
    this.done = true;
    this.error = false;
    this.loading = false;
  }

  @Action()
  private setError() {
    this.reset();
    this.error = true;
    this.loading = false;
  }

  async fetchGenders() {
    try {
      this.startLoading();

      const gender = await apiService.fetchGenders();
      this.setGender(gender);

      this.setDone();
    } catch (error) {
      const typedError = error as { message: string };
      this.errorMessage = typedError.message || '예기치 못한 오류가 발생했습니다.'

      this.setError()
    }
  }
}

export default GendersStore;