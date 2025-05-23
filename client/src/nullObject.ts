import {
  Category,
  Measurement,
  Product,
  ProductResponse,
  Size,
  SortOption,
  Summary,
  SummaryUndefined,
  User,
} from './types';

export const nullSummary: Summary = {
  _id: '',
  name: '',
};

export const nullSummaryUndefined: SummaryUndefined = {
  _id: undefined,
  name: undefined,
};

export const nullSize: Size = {
  _id: '',
  name: '',
  gender: nullSummary,
  type: nullSummary,
};

export const nullCategory: Category = {
  _id: '',
  name: '',
  type: nullSummary,
  subCategories: [],
  measurements: [],
};

export const nullMeasurement: Measurement = {
  _id: '',
  name: '',
  value: '',
};

export const nullProduct: Product = {
  _id: '',
  author: nullSummary,
  brand: '',
  name: '',
  category: nullSummary,
  subCategory: nullSummary,
  gender: nullSummary,
  size: nullSummary,
  fit: nullSummary,
  measurements: [],
  description: '',
};

export const nullProductResponse: ProductResponse = {
  _id: '',
  author: nullSummary,
  brand: '',
  name: '',
  category: nullSummary,
  subCategory: nullSummary,
  gender: nullSummary,
  size: nullSize,
  fit: nullSummary,
  measurements: [],
  description: '',
};

export const nullUser: User = {
  _id: '',
  email: '',
  name: '',
  password: '',
  gender: nullSummary,
  height: 0,
  weight: 0,
  description: '',
  followers: [],
  following: [],
};

export const nullSortOption: SortOption = {
  _id: '',
  name: '',
  sort: { '': -1 },
  urlParam: '',
};
