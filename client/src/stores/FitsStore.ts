import { singleton } from "tsyringe";
import { Action, Store } from "usestore-ts";

import { apiService } from "../services/ApiService";

import { nullSummary } from "../nullObject";
import { Summary } from "../types";

@singleton()
@Store()
class FitsStore {
  fits = [nullSummary];

  errorMessage = '';

  loading = true;

  error = false;

  done = false;

  @Action()
  reset() {
    this.fits = [nullSummary];
    this.errorMessage = '';
    this.loading = true;
    this.error = false;
    this.done = false;
  }

  @Action()
  private setGender(fits: Summary[]) {
    this.fits = fits;
    this.loading = false;
    this.error = false;
  }

  async fetchFits() {
    try {
      this.startLoading();

      const fits = await apiService.fetchFits();
      this.setGender(fits);

      this.setDone();
    } catch (error) {
      const typedError = error as { status?: number; message: string };
      this.errorMessage = typedError.message || '예기치 못한 오류가 발생했습니다.'

      this.setError();
    }
  }

  @Action()
  private startLoading() {
    this.fits = [nullSummary];
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

export default FitsStore;