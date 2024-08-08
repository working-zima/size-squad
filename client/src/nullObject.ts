import { Summary, Category, Size, ProductResponse, Measurement, User } from "./types";

export const nullSummary: Summary = {
  _id: '',
  name: '',
};

export const nullSize: Size = {
  _id: '',
  name: '',
  gender: nullSummary,
  type: nullSummary
};

export const nullCategory: Category = {
  _id: '',
  name: '',
  type: nullSummary,
  subCategories: [nullSummary],
  measurements: [nullSummary]
};

export const nullMeasurement: Measurement = {
  _id: '',
  name: '',
  value: ''
};

export const nullProduct: ProductResponse = {
  _id: '',
  author: nullSummary,
  brand: '',
  name: '',
  category: nullSummary,
  subCategory: nullSummary,
  gender: nullSummary,
  size: nullSize,
  fit: nullSummary,
  measurements: [nullMeasurement],
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