import { singleton } from 'tsyringe';
import { Action, Store } from 'usestore-ts';

import {
  AuthorSummary, Category, CategorySummary, FitSummary, GenderSummary, Measurement,
  Product, Size, SizeSummary, SubCategorySummary
} from '../types';

import {
  nullAuthorSummary, nullCateogry, nullFitSummary, nullGender,
  nullSize,
  nullSubCategorySummary
} from '../nullObject';

import { apiService } from '../services/ApiService';

import { append, sanitizeMeasurementInput, update } from '../utils';

@singleton()
@Store()
class ProductFormStore {
  productId= '';

  author: AuthorSummary = nullAuthorSummary;

  name = '';

  brand = '';

  category: CategorySummary = nullCateogry;

  subCategory: SubCategorySummary = nullSubCategorySummary;

  gender: GenderSummary = nullGender;

  size: SizeSummary = nullSize;

  fit: FitSummary = nullFitSummary;

  measurements: Measurement[] = []

  description = '';

  currentSubCategories: SubCategorySummary[] = [];

  error = false;

  done = false;

  private isBrandValid = false;

  private isNameValid = false;

  private isMeasurementValid = false;

  get valid() {
    return this.isBrandValid
      && this.isNameValid
      && this.isMeasurementValid
  }

  private brandValidation = (brand: string) => {
    return brand.length < 28 && brand.length > 0;
  }

  @Action()
  validateBrand(brand: string) {
    this.isBrandValid = this.brandValidation(brand);
  }

  private nameValidation = (name: string) => {
    return name.length < 30 && name.length > 0;
  }

  @Action()
  validateName(name: string) {
    this.isNameValid = this.nameValidation(name)
  }

  private measurementValidation = () => {
    return this.measurements.every(measurement => measurement.value.length > 0);
  }

  @Action()
  validateMeasurement() {
    this.isMeasurementValid = this.measurementValidation();
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
  changeName(name: string) {
    this.name = name;
  }

  @Action()
  changeBrand(brand: string) {
    this.brand = brand;
  }

  @Action()
  changeCategory(category: CategorySummary) {
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
    // console.log(size)
    // this.size = {_id: size._id, size: size.size};
  }

  @Action()
  changeFit(fit: FitSummary) {
    this.fit = fit;
  }

  @Action()
  addMeasurement() {
    const measurement = { _id: '', name: '', value: '' };

    this.measurements = append(this.measurements, measurement);
  }

  @Action()
  changeMeasurementAndId(index: number, _id: string, name: string) {
    this.measurements = update(this.measurements, index, (measurement) => ({
      ...measurement,
      _id,
      name,
    }));
  }

  @Action()
  changeMeasurementValue(index: number, value: string) {
    const sanitizedValue = sanitizeMeasurementInput(value)

    this.measurements = update(this.measurements, index, (measurement) => ({
      ...measurement,
      value: sanitizedValue,
    }));
    this.validateMeasurement();
  }

  @Action()
  resetMeasurements() {
    this.measurements = [];
    this.validateMeasurement();
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
        author: this.author?._id || '',
        brand: this.brand,
        name: this.name,
        category: this.category?._id || '',
        subCategory: this.subCategory?._id || '',
        gender: this.gender?._id || '',
        size: this.size._id || '',
        fit: this.fit?._id || '',
        measurements: this.measurements.map(measurement => ({
          _id: measurement._id || '',
          measurement: measurement.name,
          value: Number(measurement.value)
        })),
        description: this.description,
      });

      // this.setDone();
    } catch (e) {
      this.setError();
    }
  }
}

export default ProductFormStore;
