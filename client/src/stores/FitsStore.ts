import { singleton } from "tsyringe";
import { Action, Store } from "usestore-ts";

import { apiService } from "../services/ApiService";

import { FitSummary } from "../types";
import { nullFitSummary } from "../nullObject";

@singleton()
@Store()
class FitsStore {
  fits = [nullFitSummary];

  loading = true;

  error = false;

  done = false;

  @Action()
  private setGender(fits: FitSummary[]) {
    this.fits = fits;
    this.loading = false;
    this.error = false;
  }

  @Action()
  private startLoading() {
    this.fits = [nullFitSummary];
    this.loading = true;
    this.error = false;
  }

  @Action()
  private setError() {
    this.error = true;
  }

  async fetchFits() {
    try {
      this.startLoading();

      const fits = await apiService.fetchFits();

      this.setGender(fits);
    } catch (error) {
      this.setError();
    }
  }
}

export default FitsStore;