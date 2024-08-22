import { singleton } from 'tsyringe';
import { Action, Store } from 'usestore-ts';

import { PaginationResponse, ProductResponse } from '../types';

import { apiService } from '../services/ApiService';

type hasCategoryChangedProps = {
  categoryId?: string;
  subCategoryId?: string;
}

@singleton()
@Store()
class ProductsStore {
  products: ProductResponse[] = [];

  page = 1;

  hasNextPage = true;

  per = 5;

  lastCategoryId: string | undefined = '';

  lastSubCategoryId: string | undefined = '';

  errorMessage = '';

  state: 'loading' | 'fetched' | 'idle' | 'error' = 'idle'

  @Action()
  private setProducts(products: ProductResponse[]) {
    this.products = [...this.products, ...products];
  }

  @Action()
  private setPage(nextPage: number) {
    this.page = nextPage
  }

  @Action()
  private setHasNextPage() {
    this.hasNextPage = false
  }

  @Action()
  private setLastCategoryAndSubCategoryId({
    categoryId, subCategoryId
  }: hasCategoryChangedProps) {
    this.reset();
    this.lastCategoryId = categoryId;
    this.lastSubCategoryId = subCategoryId;
  }

  @Action()
  private hasCategoryChanged({
    categoryId, subCategoryId
  }: hasCategoryChangedProps) {
    return this.lastCategoryId !== categoryId
      || this.lastSubCategoryId !== subCategoryId;
  }

  @Action()
  private handleProductResponse(products: PaginationResponse) {
    if (!products.hasNextPage) this.setHasNextPage();
    if (products.totalPages >= this.page) this.setProducts(products.docs);
    if (products.nextPage) this.setPage(products.nextPage);
  }

  @Action()
  reset() {
    this.products = [];
    this.page = 1;
    this.hasNextPage = true;
    this.state = 'idle';
  }

  @Action()
  private startLoading() {
    this.state = 'loading';
  }

  @Action()
  private setDone() {
    this.state = 'fetched';
  }

  @Action()
  private setError() {
    this.state = 'error';
  }

  async fetchMyProducts({ categoryId, subCategoryId }: {
    categoryId?: string, subCategoryId?: string
  }) {
    if (this.hasCategoryChanged({ categoryId, subCategoryId })) {
      this.setLastCategoryAndSubCategoryId({ categoryId, subCategoryId })
    }
    if (this.state === 'loading' || !this.hasNextPage) return;

    this.startLoading();
    try {
      const products = await apiService.fetchMyProducts({
        categoryId, subCategoryId, page: this.page, per: this.per
      });

      this.handleProductResponse(products);

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
      await this.fetchMyProducts({});

      this.setDone();
    } catch (error) {
      const typedError = error as { message: string };
      this.errorMessage = typedError.message || '예기치 못한 오류가 발생했습니다.'

      this.setError();
    }
  }
}

export default ProductsStore;
