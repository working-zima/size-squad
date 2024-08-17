import { singleton } from 'tsyringe';
import { Action, Store } from 'usestore-ts';

import { Category, Summary } from '../types';

import { apiService } from '../services/ApiService';

@singleton()
@Store()
class CategoriesStore {
  categories: Category[] = [];

  allSubCategories: Summary[] = [];

  errorMessage = '';

  loading = true;

  error = false;

  done = false;

  @Action()
  reset() {
    this.categories = [];
    this.allSubCategories = [];
    this.errorMessage = ''
    this.loading = true;
    this.error = false;
    this.done = false;
  }

  @Action()
  private setCategories(categories: Category[]) {
    this.categories = categories;
    this.allSubCategories = categories.reduce<Summary[]>(
      (acc, category) => [...acc, ...category.subCategories], []
    )
    this.loading = false;
    this.error = false;
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

export default CategoriesStore;
