import { singleton } from "tsyringe";
import { Action, Store } from "usestore-ts";

import { Size } from "../types";
import { apiService } from "../services/ApiService";

@singleton()
@Store()
class SizeStore {
  sizes: Size[] = [];

  loading = true;

  error = false;

  @Action()
  private setSize(sizes: Size[]) {
    this.sizes = sizes;
    this.loading = false;
    this.error = false;
  }

  @Action()
  private startLoading() {
    this.sizes = [];
    this.loading = true;
    this.error = false;
  }

  @Action()
  private setError() {
    this.error = true;
  }

  async fetchSizes() {
    try {
      this.startLoading();

      const sizes = await apiService.fetchSizes();

      this.setSize(sizes);
    } catch (error) {
      this.setError();
    }
  }
}

export default SizeStore;