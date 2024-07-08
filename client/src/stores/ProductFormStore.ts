import { singleton } from 'tsyringe';
import { Action, Store } from 'usestore-ts';

import {
  Category, FitSummary, Measurements, Product,
} from '../types';
import { apiService } from '../services/ApiService';

// 수정 필요
@singleton()
@Store()
class ProductFormStore {
  productId= '';

  author = '';

  name = '';

  brand = '';

  category: Category | null = null;

  subCategory = '';

  size = '';

  fits: FitSummary | null = null;

  measurements: Measurements | null = null;

  description = '';

  error = false;

  done = false;

  @Action()
  reset() {
    this.productId = '';
    this.category = null;
    this.name = '';
    this.description = '';
    this.error = false;
    this.done = false;
  }

  @Action()
  setProduct(product: Product) {
    this.productId = product._id;
    this.author = product.authorId;
    this.name = product.name;
    this.brand = product.brand;
    this.category = product.categoryId;
    this.subCategory = product.subCategoryId;
    this.size = product.size;
    this.fits = product.fitId;
    this.measurements = product.measurements;
    this.description = product.description;
    this.error = false;
    this.done = false;
  }

  @Action()
  changeCategory(category: Category) {
    this.category = category;
  }
}

export default ProductFormStore;
