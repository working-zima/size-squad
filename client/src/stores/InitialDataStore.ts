import { singleton } from 'tsyringe';
import { Action, Store } from 'usestore-ts';

import { ApiState, Category, InitialData, Size, Summary } from '../types';
import { nullCategory, nullSize, nullSummary } from '../nullObject';

import { apiService } from '../services/ApiService';

import { ERROR_MESSAGES, FETCH_STATE } from '../constants';

@singleton()
@Store()
class InitialDataStore {
  categories: Category[] = [nullCategory];

  genders: Summary[] = [nullSummary];

  sizes: Size[] = [nullSize];

  fits: Summary[] = [nullSummary];

  errorMessage = '';

  state: ApiState = FETCH_STATE.IDLE;

  @Action()
  reset() {
    this.categories = [nullCategory];
    this.genders = [nullSummary];
    this.sizes = [nullSize];
    this.fits = [nullSummary];
    this.errorMessage = ''
    this.state = FETCH_STATE.IDLE;;
  }

  @Action()
  private setInitialData(initialData: InitialData) {
    this.categories = initialData.categories;
    this.genders = initialData.genders;
    this.sizes = initialData.sizes;
    this.fits = initialData.fits;
    this.errorMessage = '';
  }

  async fetchInitialData() {
    this.startLoading();
    try {
      const initialData = await apiService.fetchInitialData();
      this.setInitialData(initialData);

      this.setDone();
    } catch (error) {
      const typedError = error as { status?: number; message: string };
      this.errorMessage = typedError.message || ERROR_MESSAGES.UNEXPECTED;

      this.setError()
    }
  }

  @Action()
  private startLoading() {
    this.categories = [nullCategory];
    this.genders = [nullSummary];
    this.sizes = [nullSize];
    this.fits = [nullSummary];
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

export default InitialDataStore;
