import { singleton } from 'tsyringe';
import { Action, Store } from 'usestore-ts';

import { Summary, ProductResponse, Product, ApiState } from '../types';
import { nullProduct, nullSummary } from '../nullObject';

import { append, sanitizeMeasurementInput, update } from '../utils';

import { FETCH_STATE } from '../constants/constants';
import { ERROR_MESSAGES } from '../constants/messages';
import { productService } from '../services/ProductService';

@singleton()
@Store()
class ProductFormStore {
  product: Product = nullProduct;

  type: Summary = nullSummary;

  currentSubCategories: Summary[] = [];

  errorMessage = '';

  state: ApiState = FETCH_STATE.IDLE;

  private isBrandValid = false;

  private isNameValid = false;

  private isMeasurementValid = false;

  get valid() {
    return this.isBrandValid
      && this.isNameValid
      && this.isMeasurementValid
  }

  private brandValidation = (brand: string) => {
    return brand.length < 30 && brand.length > 0;
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
    return this.product.measurements
      .every(measurement => measurement.value.length > 0);
  }

  @Action()
  validateMeasurement() {
    this.isMeasurementValid = this.measurementValidation();
  }

  @Action()
  changeAuthor(author: Summary) {
    this.product = { ...this.product, author };
  }

  @Action()
  changeName(name: string) {
    this.product = { ...this.product, name };
  }

  @Action()
  changeBrand(brand: string) {
    this.product = { ...this.product, brand };
  }

  @Action()
  changeCategory(category: Summary) {
    this.product = { ...this.product, category };
  }

  @Action()
  changeSubCategory(subCategory: Summary) {
    this.product = { ...this.product, subCategory };
  }

  @Action()
  changeType(type: Summary) {
    this.type = type;
  }

  @Action()
  changeGender(gender: Summary) {
    this.product = { ...this.product, gender };
  }

  @Action()
  changeSize(size: Summary) {
    this.product = { ...this.product, size };
  }

  @Action()
  changeFit(fit: Summary) {
    this.product = { ...this.product, fit };
  }

  @Action()
  addMeasurement() {
    const measurement = { _id: '', name: '', value: '' };
    this.product = {
      ...this.product,
      measurements: append(this.product.measurements, measurement),
    };
  }

  @Action()
  changeMeasurementAndId(
    index: number,
    _id: string,
    name: string,
    value: string = '') {
    this.product = {
      ...this.product,
      measurements: update(this.product.measurements, index, (measurement) => ({
        ...measurement, _id, name, value
      })
      ),
    };
  }

  @Action()
  changeMeasurementValue(index: number, value: string) {
    const sanitizedValue = sanitizeMeasurementInput(value)

    this.product = {
      ...this.product,
      measurements: update(this.product.measurements, index, (measurement) => ({
        ...measurement,
        value: sanitizedValue,
      }))
    }
    this.validateMeasurement();
  }

  @Action()
  resetMeasurements() {
    this.product = { ...this.product, measurements: [] };
  }


  @Action()
  changeDescription(description: string) {
    this.product = { ...this.product, description };
  }

  @Action()
  reset() {
    this.product = nullProduct;
    this.type = nullSummary;
    this.currentSubCategories = [];
    this.errorMessage = '';
    this.state = FETCH_STATE.IDLE;
  }

  @Action()
  setProduct(productResponse: ProductResponse) {
    this.product = {
      ...productResponse,
      author: productResponse.author || nullSummary,
      measurements: productResponse.measurements.map(measurement => ({
        _id: measurement._id || '',
        name: measurement.name,
        value: String(measurement.value)
      }))
    };

    this.validateBrand(productResponse.brand);
    this.validateName(productResponse.name);
    this.validateMeasurement()
    this.errorMessage = '';
  }

  async create() {
    try {
      await productService.createProduct({
        author: this.product.author?._id || '',
        name: this.product.name,
        brand: this.product.brand,
        category: this.product.category?._id || '',
        subCategory: this.product.subCategory?._id || '',
        gender: this.product.gender?._id || '',
        size: this.product.size._id || '',
        fit: this.product.fit?._id || '',
        measurements: this.product.measurements.map(measurement => ({
          _id: measurement._id || '',
          name: measurement.name,
          value: Number(measurement.value),
        })),
        description: this.product.description,
      });

      this.setDone();
    } catch (error) {
      const typedError = error as { status?: number; message: string };
      this.errorMessage = typedError.message || ERROR_MESSAGES.UNEXPECTED;

      this.setError();
    }
  }

  async update() {
    try {
      await productService.updateProduct({
        _id: this.product._id,
        author: this.product.author?._id || '',
        name: this.product.name,
        brand: this.product.brand,
        category: this.product.category?._id || '',
        subCategory: this.product.subCategory?._id || '',
        gender: this.product.gender?._id || '',
        size: this.product.size._id || '',
        fit: this.product.fit?._id || '',
        measurements: this.product.measurements.map(measurement => ({
          _id: measurement._id || '',
          name: measurement.name,
          value: Number(measurement.value)
        })),
        description: this.product.description,
      });

      this.setDone();
    } catch (error) {
      const typedError = error as { status?: number; message: string };
      this.errorMessage = typedError.message || ERROR_MESSAGES.UNEXPECTED;

      this.setError();
    }
  }

  async fetchProduct({ productId }: { productId: string }) {
    this.startLoading();
    try {
      const productResponse = await productService.fetchProduct({ productId });
      this.setProduct(productResponse);

      this.setDone();
    } catch (error) {
      const typedError = error as { status?: number; message: string };
      this.errorMessage = typedError.message || ERROR_MESSAGES.UNEXPECTED;

      this.setError();
    }
  }

  @Action()
  private startLoading() {
    this.reset()
    this.errorMessage = '';
    this.state = FETCH_STATE.LOADING;
  }

  @Action()
  private setDone() {
    this.state = FETCH_STATE.FETCHED;
  }

  @Action()
  private setError() {
    this.state = FETCH_STATE.ERROR;
  }
}

export default ProductFormStore;
