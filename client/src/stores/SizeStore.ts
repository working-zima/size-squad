import { singleton } from "tsyringe";
import { Action, Store } from "usestore-ts";

import { Size } from "../types";
import { nullSize } from "../nullObject";

import { apiService } from "../services/ApiService";

@singleton()
@Store()
class SizeStore {
  sizes: Size[] = [nullSize];

  errorMessage = '';

  loading = true;

  error = false;

  done = false;

  @Action()
  private setSize(sizes: Size[]) {
    this.sizes = sizes;
    this.loading = false;
    this.error = false;
  }

  @Action()
  reset() {
    this.sizes = [nullSize];
    this.errorMessage = '';
    this.loading = true;
    this.error = false;
    this.done = false;
  }

  async fetchSizes() {
    this.startLoading();
    try {
      const sizes = await apiService.fetchSizes();
      this.setSize(sizes);

      this.setDone();
    } catch (error) {
      const typedError = error as { status?: number; message: string };
      this.errorMessage = typedError.message || '예기치 못한 오류가 발생했습니다.'

      this.setError();
    }
  }

  @Action()
  private startLoading() {
    this.sizes = [];
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

export default SizeStore;