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

  state: 'loading' | 'fetched' | 'idle' | 'error' = 'idle'

  @Action()
  reset() {
    this.genders = [];
    this.errorMessage = ''
    this.state = 'idle';
  }

  @Action()
  private setGender(genders: Summary[]) {
    this.genders = genders;
  }

  async fetchGenders() {
    this.startLoading();
    try {
      const genders = await apiService.fetchGenders();
      this.setGender(genders);

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
    this.state = 'loading';
  }

  @Action()
  private setDone() {
    this.state = 'fetched';
  }

  @Action()
  private setError() {
    this.state = 'error';
  }
}

export default GendersStore;
