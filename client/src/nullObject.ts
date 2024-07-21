import { Summary, Category, Size } from "./types";

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
  _id: "",
  name: "",
  type: nullSummary,
  subCategories: [nullSummary],
  measurements: [nullSummary]
}