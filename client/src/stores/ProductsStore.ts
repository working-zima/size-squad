import { singleton } from 'tsyringe';
import { Action, Store } from 'usestore-ts';

import { Product } from '../types';
import { apiService } from '../services/ApiService';

@singleton()
@Store()
class ProductsStore {
  products: Product[] = [];

  async fetchProducts({ categoryId, subCategoryId }: {
    categoryId?: string, subCategoryId?: string
  }) {
    this.setProducts([]);

    // const products = await apiService.fetchProducts({ categoryId, subCategoryId });

    // this.setProducts(products);
  }

  @Action()
  private setProducts(products: Product[]) {
    this.products = products;
  }
}

export default ProductsStore;
