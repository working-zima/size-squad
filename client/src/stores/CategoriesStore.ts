import { singleton } from 'tsyringe';
import { Action, Store } from 'usestore-ts';

import { Category, SubCategorySummary } from '../types';

import { apiService } from '../services/ApiService';

@singleton()
@Store()
class CategoriesStore {
  categories: Category[] = [];

  async fetchCategories() {
    this.setCategories([]);

    const categories = await apiService.fetchCategories();
    this.setCategories(categories);
  }

  @Action()
  private setCategories(categories: Category[]) {
    this.categories = categories;
  }
}

export default CategoriesStore;
