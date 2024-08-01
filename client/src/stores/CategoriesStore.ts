import { singleton } from 'tsyringe';
import { Action, Store } from 'usestore-ts';

import { Category, Summary } from '../types';

import { apiService } from '../services/ApiService';

@singleton()
@Store()
class CategoriesStore {
  categories: Category[] = [];

  allSubCategories: Summary[] = [];

  loading = true;

  error = false;

  @Action()
  private setCategories(categories: Category[]) {
    this.categories = categories;
    this.allSubCategories = categories.reduce<Summary[]>(
      (acc, category) => [...acc, ...category.subCategories], []
    )
  }

  @Action()
  private startLoading() {
    this.categories = [];
    this.allSubCategories = [];
    this.error = false;
    this.loading = true;

    this.error = false;
    this.loading = false;
  }

  @Action()
  private setError() {
    this.error = true;
  }

  async fetchCategories() {
    this.startLoading();
    try {
      this.setCategories([]);
      const categories = await apiService.fetchCategories();

      this.setCategories(categories);
    } catch (error) {
      this.setError();
    }
  }
}

export default CategoriesStore;
