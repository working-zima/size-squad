import { singleton } from "tsyringe";
import { Action, Store } from "usestore-ts";

import { ApiState, Summary } from "../types";
import { nullSummary } from "../nullObject";

import { productAttributeService } from "../services/ProductAttributeService";

import { FETCH_STATE } from "../constants/constants";
import { ERROR_MESSAGES } from "../constants/messages";

@singleton()
@Store()
class GendersStore {
  genders: Summary[] = [];

  errorMessage = '';

  state: ApiState = FETCH_STATE.IDLE;

  @Action()
  reset() {
    this.genders = [];
    this.errorMessage = ''
    this.state = FETCH_STATE.IDLE;;
  }

  @Action()
  private setGender(genders: Summary[]) {
    this.genders = genders;
    this.errorMessage = '';
  }

  async fetchGenders() {
    this.startLoading();
    try {
      const genders = await productAttributeService.fetchGenders();
      this.setGender(genders);

      this.setDone();
    } catch (error) {
      const typedError = error as { status?: number; message: string };
      this.errorMessage = typedError.message || ERROR_MESSAGES.UNEXPECTED;

      this.setError()
    }
  }

  @Action()
  private startLoading() {
    this.genders = [nullSummary];
    this.state = FETCH_STATE.LOADING;
  }

  @Action()
  private setDone() {
    this.state = FETCH_STATE.FETCHED;
  }

  @Action()
  private setError() {
    this.state = FETCH_STATE.ERROR;
  }
}

export default GendersStore;
