import { singleton } from 'tsyringe';
import { Action, Store } from 'usestore-ts';

import { Category, Size, Summary } from '../types';

import { apiService } from '../services/ApiService';
import { nullCategory, nullSize, nullSummary } from '../nullObject';

type initialData = {
  categories: Category[];
  genders: Summary[];
  sizes: Size[];
  fits: Summary[];
}

@singleton()
@Store()
class InitialDataStore {
  categories: Category[] = [nullCategory];

  genders: Summary[] = [nullSummary];

  sizes: Size[] = [nullSize];

  fits: Summary[] = [nullSummary];

  loading = true;

  error = false;

  done = false;

  @Action()
  private setInitialData(initialData: initialData) {
    this.categories = initialData.categories;
    this.genders = initialData.genders;
    this.sizes = initialData.sizes;
    this.fits = initialData.fits;
  }


  @Action()
  reset() {
    this.categories = [nullCategory];
    this.genders = [nullSummary];
    this.sizes = [nullSize];
    this.fits = [nullSummary];
    this.error = false;
    this.done = false;
  }


  @Action()
  private startLoading() {
    this.reset()
    this.loading = true;
  }

  @Action()
  private setError() {
    this.categories = [nullCategory];
    this.genders = [nullSummary];
    this.sizes = [nullSize];
    this.fits = [nullSummary];

    this.loading = false;
    this.error = true;
  }

  async fetchInitialData() {
    try {
      this.startLoading();
      const initialData = await apiService.fetchInitialData();
      this.setInitialData(initialData);
    } catch (error) {
      this.setError()
    }
  }
}

export default InitialDataStore;
