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

  @Action()
  private setInitialData(initialData: initialData) {
    this.categories = initialData.categories;
    this.genders = initialData.genders;
    this.sizes = initialData.sizes;
    this.fits = initialData.fits;
  }

  async fetchInitialData() {
    const initialData = await apiService.fetchInitialData();

    this.setInitialData(initialData);
  }
}

export default InitialDataStore;
