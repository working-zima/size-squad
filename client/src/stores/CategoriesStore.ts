import { singleton } from 'tsyringe';
import { Action, Store } from 'usestore-ts';

import { Category, Summary } from '../types';

import { apiService } from '../services/ApiService';

@singleton()
@Store()
class CategoriesStore {
  categories: Category[] = [];

  allSubCategories: Summary[] = [];

  async fetchCategories() {
    this.setCategories([]);
    const categories = await apiService.fetchCategories();

    this.setCategories(categories);
  }

  @Action()
  private setCategories(categories: Category[]) {
    this.categories = categories;
    this.allSubCategories = categories.reduce<Summary[]>(
      (acc, category) => [...acc, ...category.subCategories], []
    )
  }
}

export default CategoriesStore;
