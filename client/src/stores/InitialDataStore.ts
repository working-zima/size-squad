import { singleton } from 'tsyringe';
import { Action, Store } from 'usestore-ts';

import { Category, initialData, Size, Summary } from '../types';
import { nullCategory, nullSize, nullSummary } from '../nullObject';

import { apiService } from '../services/ApiService';

@singleton()
@Store()
class InitialDataStore {
  categories: Category[] = [nullCategory];

  genders: Summary[] = [nullSummary];

  sizes: Size[] = [nullSize];

  fits: Summary[] = [nullSummary];

  errorMessage = '';

  loading = true;

  error = false;

  done = false;

  @Action()
  reset() {
    this.categories = [nullCategory];
    this.genders = [nullSummary];
    this.sizes = [nullSize];
    this.fits = [nullSummary];
    this.errorMessage = ''
    this.loading = true;
    this.error = false;
    this.done = false;
  }

  @Action()
  private setInitialData(initialData: initialData) {
    this.categories = initialData.categories;
    this.genders = initialData.genders;
    this.sizes = initialData.sizes;
    this.fits = initialData.fits;
    this.loading = false;
    this.error = false;
  }

  async fetchInitialData() {
    this.startLoading();
    try {
      const initialData = await apiService.fetchInitialData();
      this.setInitialData(initialData);

      this.setDone();
    } catch (error) {
      const typedError = error as { status?: number; message: string };
      this.errorMessage = typedError.message || '예기치 못한 오류가 발생했습니다.'

      this.setError()
    }
  }

  @Action()
  private startLoading() {
    this.categories = [nullCategory];
    this.genders = [nullSummary];
    this.sizes = [nullSize];
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
    this.loading = false;
    this.error = true;
  }
}

export default InitialDataStore;
