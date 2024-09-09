import { singleton } from 'tsyringe';
import { Action, Store } from 'usestore-ts';

import { ApiState, PaginationResponse, ProductResponse, SortOption } from '../types';

import { apiService } from '../services/ApiService';

import { SORT_OPTIONS } from '../constants';

type handleParameterProps = {
  sortOption: SortOption;
  per: number;
  categoryId: string;
  subCategoryId: string;
  userId?: string;
}

@singleton()
@Store()
class ProductsStore {
  products: ProductResponse[] = [];

  sortOption: SortOption = SORT_OPTIONS[0];

  categoryId = '';

  subCategoryId = '';

  userId = '';

  keyword = '';

  per = 10;

  hasNextPage = true;

  page = 1;

  totalDocs = 0;

  errorMessage = '';

  state: ApiState = 'idle'

  @Action()
  reset() {
    this.products = [];
    this.sortOption = SORT_OPTIONS[0];
    this.page = 1;
    this.userId = '';
    this.keyword = '';
    this.per = 10;
    this.hasNextPage = true;
    this.totalDocs = 0;
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
  private setCategoryId(categoryId: string) {
    this.categoryId = categoryId;
  }

  @Action()
  private setSubCategoryId(subCategoryId: string) {
    this.subCategoryId = subCategoryId;
  }

  @Action()
  private setUserId(userId: string) {
    this.userId = userId;
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
  private handleProductResponse(products: PaginationResponse<ProductResponse>) {
    if (!products.hasNextPage) this.setHasNextPage();
    if (products.totalPages >= this.page) this.setProducts(products.docs);
    if (products.nextPage) this.setPage(products.nextPage);
    this.setTotalDocs(products.totalDocs);
  }

  @Action()
  private handleParameter({
    sortOption, per, categoryId, subCategoryId, userId = ''
  }: handleParameterProps) {
    this.setSortOption(sortOption);
    this.setPer(per);
    this.setCategoryId(categoryId)
    this.setSubCategoryId(subCategoryId)
    this.setUserId(userId)
  }

  /**
   * 특정 유저 사이즈 정보 fetch
   */
  async fetchMyInitialProducts({
    keyword,
    categoryId = '',
    subCategoryId = '',
    sortCode,
    per = 10,
    userId = ''
  }: {
    keyword?: string;
    categoryId?: string;
    subCategoryId?: string;
    sortCode?: string;
    per?: number;
    userId?: string;
  }) {
    if (this.state === 'loading') return;
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
        per: per,
        userId,
      });

      this.handleProductResponse(products);
      this.handleParameter({ sortOption, per, categoryId, subCategoryId, userId })
      this.setDone();
    } catch (error) {
      const typedError = error as { message: string };
      this.errorMessage = typedError.message || '예기치 못한 오류가 발생했습니다.';
      this.setError();
    }
  }

  async fetchMoreMyProducts() {
    if (this.state === 'loading' || !this.hasNextPage) return;
    this.startLoading();
    try {
      const sortField = Object.keys(this.sortOption.sort)[0];
      const sortOrder = Object.values(this.sortOption.sort)[0];

      const products = await apiService.fetchMyProducts({
        keyword: this.keyword,
        categoryId: this.categoryId,
        subCategoryId: this.subCategoryId,
        sortField,
        sortOrder,
        page: this.page,
        per: this.per,
        userId: this.userId
      });

      this.handleProductResponse(products);
      this.setDone();
    } catch (error) {
      const typedError = error as { message: string };
      this.errorMessage = typedError.message || '예기치 못한 오류가 발생했습니다.';
      this.setError();
    }
  }

  /**
   * 전체 유저 사이즈 정보 fetch
   */
  async fetchInitialProducts({
    keyword,
    categoryId = '',
    subCategoryId = '',
    sortCode,
    per = 10,
  }: {
    keyword?: string,
    categoryId?: string,
    subCategoryId?: string,
    sortCode?: string,
    per?: number
  }) {
    if (this.state === 'loading') return;
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
      this.handleParameter({ sortOption, per, categoryId, subCategoryId })
      this.setDone();
    } catch (error) {
      const typedError = error as { message: string };
      this.errorMessage = typedError.message || '예기치 못한 오류가 발생했습니다.'
      this.setError();
    }
  }

  async fetchMoreProducts({ keyword }: { keyword?: string }) {
    if (this.state === 'loading' || !this.hasNextPage) return;
    this.startLoading();
    try {
      const sortField = Object.keys(this.sortOption.sort)[0];
      const sortOrder = Object.values(this.sortOption.sort)[0];

      const products = await apiService.fetchProducts({
        keyword,
        categoryId: this.categoryId,
        subCategoryId: this.subCategoryId,
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

  /**
  * 사이즈 정보 삭제
  */
  async deleteAndFetchMyProducts(productId: string) {
    try {
      this.startLoading();
      await apiService.deleteMyProducts({ productId });
      this.setDone();
      await this.fetchMyInitialProducts({ userId: this.userId });
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
