import { singleton } from 'tsyringe';
import { Action, Store } from 'usestore-ts';

import { ApiState, Category, Summary } from '../types';

import { apiService } from '../services/ApiService';

import { ERROR_MESSAGES, FETCH_STATE } from '../constants';

@singleton()
@Store()
class CategoriesStore {
  categories: Category[] = [];

  allSubCategories: Summary[] = [];

  errorMessage = '';

  state: ApiState = FETCH_STATE.IDLE;

  @Action()
  reset() {
    this.categories = [];
    this.allSubCategories = [];
    this.errorMessage = ''
    this.state = FETCH_STATE.IDLE;
  }

  @Action()
  private setCategories(categories: Category[]) {
    this.categories = categories;
    this.allSubCategories = categories.reduce<Summary[]>(
      (acc, category) => [...acc, ...category.subCategories], []
    )
  }

  async fetchCategories() {
    this.startLoading();
    try {
      const categories = await apiService.fetchCategories();
      this.setCategories(categories);

      this.setDone();
    } catch (error) {
      const typedError = error as { status?: number; message: string };
      this.errorMessage = typedError.message || ERROR_MESSAGES.UNEXPECTED;

      this.setError();
    }
  }

  @Action()
  private startLoading() {
    this.categories = [];
    this.allSubCategories = [];
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

export default CategoriesStore;
