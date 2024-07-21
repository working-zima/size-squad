import { singleton } from "tsyringe";
import { Action, Store } from "usestore-ts";

import { apiService } from "../services/ApiService";

import { nullSummary } from "../nullObject";
import { Summary } from "../types";

@singleton()
@Store()
class FitsStore {
  fits = [nullSummary];

  loading = true;

  error = false;

  done = false;

  @Action()
  private setGender(fits: Summary[]) {
    this.fits = fits;
    this.loading = false;
    this.error = false;
  }

  @Action()
  private startLoading() {
    this.fits = [nullSummary];
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