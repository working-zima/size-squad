import { singleton } from 'tsyringe';
import { Action, Store } from 'usestore-ts';

import { ProductResponse } from '../types';
import { apiService } from '../services/ApiService';

@singleton()
@Store()
class ProductsStore {
  products: ProductResponse[] = [];

  errorMessage = ''

  loading = true;

  error = false;

  done = false;

  @Action()
  private setProducts(products: ProductResponse[]) {
    this.products = products;
  }

  @Action()
  reset() {
    this.products = [];
    this.error = false;
    this.done = false;
  }

  @Action()
  private startLoading() {
    this.reset()
    this.error = false;
    this.loading = true;
  }

  @Action()
  private setDone() {
    this.done = true;
    this.error = false;
    this.loading = false;
  }

  @Action()
  private setError() {
    this.reset();
    this.error = true;
    this.loading = false;
  }

  async fetchProducts({ categoryId, subCategoryId }: {
    categoryId?: string, subCategoryId?: string
  }) {
    try {
      this.startLoading();

      const products = await apiService.fetchMyProducts({
        categoryId, subCategoryId
      });
      this.setProducts(products);

      this.setDone();
    } catch (error) {
      const typedError = error as { message: string };
      this.errorMessage = typedError.message || '예기치 못한 오류가 발생했습니다.'

      this.setError();
    }
  }

  async deleteAndFetchProducts(productId: string) {
    try {
      this.startLoading();

      await apiService.deleteMyProducts({ productId });
      await this.fetchProducts({});

      this.setDone();
    } catch (error) {
      const typedError = error as { message: string };
      this.errorMessage = typedError.message || '예기치 못한 오류가 발생했습니다.'

      this.setError();
    }
  }
}

export default ProductsStore;
