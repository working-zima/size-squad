import { singleton } from 'tsyringe';
import { Action, Store } from 'usestore-ts';

import { ApiState, Category, Summary } from '../types';

import { apiService } from '../services/ApiService';

@singleton()
@Store()
class CategoriesStore {
  categories: Category[] = [];

  allSubCategories: Summary[] = [];

  errorMessage = '';

  state: ApiState = 'idle'

  @Action()
  reset() {
    this.categories = [];
    this.allSubCategories = [];
    this.errorMessage = ''
    this.state = 'idle'
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
      this.errorMessage = typedError.message || '예기치 못한 오류가 발생했습니다.'

      this.setError();
    }
  }

  @Action()
  private startLoading() {
    this.categories = [];
    this.allSubCategories = [];
    this.state = 'loading'
  }

  @Action()
  private setDone() {
    this.state = 'fetched'
  }

  @Action()
  private setError() {
    this.state = 'error'
  }
}

export default CategoriesStore;
