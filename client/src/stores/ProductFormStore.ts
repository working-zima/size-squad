import { singleton } from 'tsyringe';
import { Action, Store } from 'usestore-ts';

import {
  Author, Fit, Measurements, Product, ProductCategory,
} from '../types';

@singleton()
@Store()
class ProductFormStore {
  productId: string = '';

  author: Author | null = null;

  name: string = '';

  brand: string = '';

  category: ProductCategory | null = null;

  subCategory: string = '';

  size: string = '';

  fits: Fit | null = null;

  measurements: Measurements | null = null;

  description?: string = '';

  error = false;

  done = false;

  @Action()
  setProduct(product: Product) {
    this.productId = product.id;
    this.author = product.author;
    this.name = product.name;
    this.brand = product.brand;
    this.category = product.category;
    this.subCategory = product.subCategory;
    this.size = product.size;
    this.fits = product.fits;
    this.measurements = product.measurements;
    this.description = product.description;
    this.error = false;
    this.done = false;
  }
}

export default ProductFormStore;
