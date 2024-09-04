import { singleton } from 'tsyringe';
import { Action, Store } from 'usestore-ts';

import { PaginationResponse, ProductResponse, SortOption } from '../types';

import { apiService } from '../services/ApiService';

import { SORT_OPTIONS } from '../constants';

@singleton()
@Store()
class ProductsStore {
  products: ProductResponse[] = [];

  page = 1;

  sortOption: SortOption = SORT_OPTIONS[0];

  hasNextPage = true;

  keyword = '';

  per = 10;

  totalDocs = 0;

  errorMessage = '';

  state: 'loading' | 'fetched' | 'idle' | 'error' = 'idle'

  @Action()
  reset() {
    this.products = [];
    this.page = 1;
    this.hasNextPage = true;
    this.state = 'idle';
  }

  @Action()
  private setProducts(products: ProductResponse[]) {
    this.products = [...this.products, ...products];
  }

  @Action()
  private setSortOption(sortOption: SortOption) {
    this.sortOption = sortOption;
  }

  @Action()
  private setPage(nextPage: number) {
    this.page = nextPage;
  }

  @Action()
  private setHasNextPage() {
    this.hasNextPage = false;
  }

  @Action()
  private setTotalDocs(totalDocs: number) {
    this.totalDocs = totalDocs;
  }

  @Action()
  private setPer(per: number) {
    this.per = per;
  }

  @Action()
  changeKeyword(keyword: string) {
    this.keyword = keyword;
  }

  @Action()
  resetKeyword() {
    this.keyword = '';
  }

  @Action()
  private handleProductResponse(products: PaginationResponse) {
    if (!products.hasNextPage) this.setHasNextPage();
    if (products.totalPages >= this.page) this.setProducts(products.docs);
    if (products.nextPage) this.setPage(products.nextPage);
  }

  /**
   * 내 사이즈 첫 렌더링 fetch
   */
  async fetchMyInitialProducts({
    keyword,
    categoryId,
    subCategoryId,
    sortCode,
    per = 10,
  }: {
    keyword?: string,
    categoryId?: string,
    subCategoryId?: string,
    sortCode?: string,
    per?: number
  }) {
    this.reset();
    this.startLoading();
    try {
      const sortOption = sortCode
        ? SORT_OPTIONS[sortCode]
        : SORT_OPTIONS.RECENT;
      const sortField = Object.keys(sortOption.sort)[0];
      const sortOrder = Object.values(sortOption.sort)[0];

      const products = await apiService.fetchMyProducts({
        keyword,
        categoryId,
        subCategoryId,
        sortField,
        sortOrder,
        page: 1,
        per: per
      });

      this.handleProductResponse(products);
      this.setSortOption(sortOption);
      this.setPer(per);
      this.setTotalDocs(products.totalDocs);
      this.setDone();
    } catch (error) {
      const typedError = error as { message: string };
      this.errorMessage = typedError.message || '예기치 못한 오류가 발생했습니다.';
      this.setError();
    }
  }

  /**
   * 내 사이즈 첫 렌더링 이후 fetch
   */
  async fetchMoreMyProducts({ keyword, categoryId, subCategoryId }: {
    keyword?: string, categoryId?: string, subCategoryId?: string
  }) {
    if (this.state === 'loading' || !this.hasNextPage) return;
    this.startLoading();
    try {
      const sortField = Object.keys(this.sortOption.sort)[0];
      const sortOrder = Object.values(this.sortOption.sort)[0];

      const products = await apiService.fetchMyProducts({
        keyword,
        categoryId,
        subCategoryId,
        sortField,
        sortOrder,
        page: this.page,
        per: this.per
      });

      this.handleProductResponse(products);
      this.setDone();
    } catch (error) {
      const typedError = error as { message: string };
      this.errorMessage = typedError.message || '예기치 못한 오류가 발생했습니다.';
      this.setError();
    }
  }

  async fetchInitialProducts({
    keyword,
    categoryId,
    subCategoryId,
    sortCode,
    per = 10,
  }: {
    keyword?: string,
    categoryId?: string,
    subCategoryId?: string,
    sortCode?: string,
    per?: number
  }) {
    this.reset();
    this.startLoading();

    try {
      const sortOption = sortCode
        ? SORT_OPTIONS[sortCode]
        : SORT_OPTIONS.RECENT;
      const sortField = Object.keys(sortOption.sort)[0];
      const sortOrder = Object.values(sortOption.sort)[0];

      const products = await apiService.fetchProducts({
        keyword,
        categoryId,
        subCategoryId,
        sortField,
        sortOrder,
        page: 1,
        per: per
      });

      this.handleProductResponse(products);
      this.setSortOption(sortOption);
      this.setPer(per);
      this.setTotalDocs(products.totalDocs);
      this.setDone();
    } catch (error) {
      const typedError = error as { message: string };
      this.errorMessage = typedError.message || '예기치 못한 오류가 발생했습니다.'
      this.setError();
    }
  }

  async fetchMoreProducts({
    keyword,
    categoryId,
    subCategoryId
  }: {
    keyword?: string,
    categoryId?: string,
    subCategoryId?: string
  }) {
    if (this.state === 'loading' || !this.hasNextPage) return;
    this.startLoading();
    try {
      const sortField = Object.keys(this.sortOption.sort)[0];
      const sortOrder = Object.values(this.sortOption.sort)[0];

      const products = await apiService.fetchProducts({
        keyword,
        categoryId,
        subCategoryId,
        sortField,
        sortOrder,
        page: this.page,
        per: this.per
      });

      this.handleProductResponse(products);
      this.setDone();
    } catch (error) {
      const typedError = error as { message: string };
      this.errorMessage = typedError.message || '예기치 못한 오류가 발생했습니다.';
      this.setError();
    }
  }

  async deleteAndFetchMyProducts(productId: string) {
    try {
      this.startLoading();
      await apiService.deleteMyProducts({ productId });
      await this.fetchMyInitialProducts({});
      this.setDone();
    } catch (error) {
      const typedError = error as { message: string };
      this.errorMessage = typedError.message || '예기치 못한 오류가 발생했습니다.'
      this.setError();
    }
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
}

export default ProductsStore;
