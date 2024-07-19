import {
  AuthorSummary, Category, CategorySummary, FitSummary, GenderSummary, Size, SubCategorySummary
} from "./types";

export const nullGender: GenderSummary = {
  _id: '',
  gender: '성별을 고르세요.',
};

export const nullCateogry: CategorySummary = {
  _id: '',
  category: '',
}

export const nullSubCategorySummary: SubCategorySummary = {
  _id: '',
  subCategory: ''
}

export const nullFitSummary: FitSummary = {
  _id: '',
  fit: '핏을 고르세요.'
};

export const nullAuthorSummary: AuthorSummary = {
  _id: '',
  name: ''
};

export const nullSizeSummary: FitSummary = {
  _id: '',
  fit: ''
};

export const nullSize: Size = {
  _id: '',
  size: '성별을 먼저 고르세요.',
  genderId: nullGender,
  type: ''
};