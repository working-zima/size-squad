import { singleton } from 'tsyringe';
import { Action, Store } from 'usestore-ts';

import {
  AuthorSummary, Category, FitSummary, GenderSummary, Measurement,
  Product, Size, SubCategorySummary
} from '../types';

import {
  nullAuthorSummary, nullCateogry, nullFitSummary, nullGender,
  nullSize,
  nullSubCategorySummary
} from '../nullObject';

import { apiService } from '../services/ApiService';

import { append, inputSanitizer, update } from '../utils';

@singleton()
@Store()
class ProductFormStore {
  productId= '';

  author: AuthorSummary = nullAuthorSummary;

  name = '';

  brand = '';

  category: Category = nullCateogry;

  subCategory: SubCategorySummary = nullSubCategorySummary;

  gender: GenderSummary = nullGender;

  size: Size = nullSize;

  fit: FitSummary = nullFitSummary;

  measurements: Measurement[] = []

  description = '';

  currentSubCategories: SubCategorySummary[] = [];

  isBrandValid = false;

  error = false;

  done = false;

  get valid() {
    return this.isBrandValid
  }

  private brandValidation = (brand: string) => {
    return brand.length < 28 && brand.length > 0;
  }

  @Action()
  validateEmail(brand: string) {
    this.isBrandValid = this.brandValidation(brand);
  }

  @Action()
  reset() {
    this.productId = '';
    this.author = nullAuthorSummary;
    this.brand = '';
    this.name = '';
    this.category = nullCateogry;
    this.subCategory = nullSubCategorySummary;
    this.gender = nullGender;
    this.size = nullSize;
    this.fit = nullFitSummary;
    this.measurements = [];
    this.description = '';
    this.error = false;
    this.done = false;
  }

  @Action()
  setProduct(product: Product) {
    this.productId = product._id;
    this.author = product.author;
    this.brand = product.brand;
    this.name = product.name;
    this.category = product.category;
    this.subCategory = product.subCategory;
    this.gender = product.gender;
    this.size = product.size;
    this.fit = product.fit;
    this.measurements = product.measurements;
    this.description = product.description;
    this.error = false;
    this.done = false;
  }

  @Action()
  changeAuthor(author: AuthorSummary) {
    this.author = author;
  }

  @Action()
  changeBrand(brand: string) {
    this.brand = brand;
  }

  @Action()
  changeName(name: string) {
    this.name = name;
  }

  @Action()
  changeCategory(category: Category) {
    this.category = category;
  }

  @Action()
  changeSubCategory(subCategory: SubCategorySummary) {
    this.subCategory = subCategory;
  }

  @Action()
  changeGender(gender: GenderSummary) {
    this.gender = gender;
  }

  @Action()
  changeSize(size: Size) {
    this.size = size;
  }

  @Action()
  changeFit(fit: FitSummary) {
    this.fit = fit;
  }

  @Action()
  addMeasurement() {
    const measurement = { name: '', value: '' };

    this.measurements = append(this.measurements, measurement);
  }

  @Action()
  changeMeasurementName(index: number, name: string) {
    this.measurements = update(this.measurements, index, (measurement) => ({
      ...measurement,
      name,
    }));
  }

  @Action()
  changeMeasurementValue(index: number, value: string) {
    const sanitizedValue = inputSanitizer(value)

    this.measurements = update(this.measurements, index, (measurement) => ({
      ...measurement,
      value: sanitizedValue,
    }));
  }

  @Action()
  resetMeasurements() {
    this.measurements = [];
  }


  @Action()
  changeDescription(description: string) {
    this.description = description;
  }

  @Action()
  private setError() {
    this.error = true;
  }

  @Action()
  private setDone() {
    this.done = true;
  }

  async create() {
    try {
      await apiService.createProduct({
        authorId: this.author?._id || '',
        brand: this.brand,
        name: this.name,
        categoryId: this.category?._id || '',
        subCategoryId: this.subCategory?._id || '',
        genderId: this.gender?._id || '',
        sizeId: this.size._id || '',
        fitId: this.fit?._id || '',
        measurements: this.measurements.map(measurement => ({
          name: measurement.name,
          value: Number(measurement.value)
        })),
        description: this.description,
      });

      this.setDone();
    } catch (e) {
      this.setError();
    }
  }
}

export default ProductFormStore;
