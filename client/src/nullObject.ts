import {
  AuthorSummary, Category, FitSummary, Gender, Measurement, SubCategorySummary
} from "./types";

export const nullGender: Gender = {
  _id: '',
  gender: '성별을 골라주세요.',
  size: ['ONE SIZE']
};

export const nullCateogry: Category = {
  _id: '',
  category: '',
  measurements: [],
  subCategories: [{_id: '', subCategory: ''}],
}

export const nullSubCategorySummary: SubCategorySummary = {
  _id: '',
  subCategory: ''
}

export const nullFitSummary: FitSummary = { _id: '', fit: '핏을 골라주세요.'};

export const nullAuthorSummary: AuthorSummary = { _id: '', name: '' };

export const nullSizeSummary: FitSummary = { _id: '', fit: '' };