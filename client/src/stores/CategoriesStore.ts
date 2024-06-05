import { singleton } from 'tsyringe';
import { Action, Store } from 'usestore-ts';

import { Category, SubCategoryList } from '../types';

import { apiService } from '../services/ApiService';

@singleton()
@Store()
class CategoriesStore {
  categories: Category[] = [];

  subCategories: SubCategoryList[] = [];

  async fetchCategories({ categoryId }: {
    categoryId?: string
  }) {
    this.setCategories([]);

    const categories = await apiService.fetchCategories({ categoryId });

    this.setCategories(categories);
  }

  @Action()
  setCategories(categories: Category[]) {
    this.categories = categories;
    this.subCategories = categories
      .reduce<SubCategoryList[]>((acc, category) => [
        ...acc, ...category.subCategories,
      ], []);
  }
}

export default CategoriesStore;
