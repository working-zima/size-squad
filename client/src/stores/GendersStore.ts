import { singleton } from "tsyringe";
import { Action, Store } from "usestore-ts";

import { Summary } from "../types";
import { nullSummary } from "../nullObject";

import { apiService } from "../services/ApiService";

@singleton()
@Store()
class GendersStore {
  genders: Summary[] = [];

  errorMessage = '';

  loading = true;

  error = false;

  done = false;

  @Action()
  reset() {
    this.genders = [];
    this.errorMessage = ''
    this.loading = true;
    this.error = false;
    this.done = false;
  }

  @Action()
  private setGender(gender: Summary[]) {
    this.genders = gender;
    this.loading = false;
    this.error = false;
  }

  async fetchGenders() {
    this.startLoading();
    try {
      const gender = await apiService.fetchGenders();
      this.setGender(gender);

      this.setDone();
    } catch (error) {
      const typedError = error as { status?: number; message: string };
      this.errorMessage = typedError.message || '예기치 못한 오류가 발생했습니다.'

      this.setError()
    }
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
  }

  @Action()
  private setError() {
    this.error = true;
    this.loading = false;
  }
}

export default GendersStore;
