import { singleton } from 'tsyringe';
import { Action, Store } from 'usestore-ts';

import { ProductResponse } from '../types';
import { apiService } from '../services/ApiService';

@singleton()
@Store()
class ProductsStore {
  products: ProductResponse[] = [];

  error = false;

  @Action()
  private setProducts(products: ProductResponse[]) {
    this.products = products;
  }

  @Action()
  private setError() {
    this.error = true;
  }

  async fetchProducts({ categoryId, subCategoryId }: {
    categoryId?: string, subCategoryId?: string
  }) {
    try {
      this.setProducts([]);
      const products = await apiService.fetchMyProducts({
        categoryId, subCategoryId
      });

      this.setProducts(products);
    } catch (error) {
      this.setError();
    }
  }
}

export default ProductsStore;
