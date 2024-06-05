export type SubCategoryList =
  | '긴소매 상의'
  | '반소매 상의'
  | '롱 아우터'
  | '레귤러 아우터'
  | '크롭 아우터'
  | '롱 팬츠'
  | '숏 팬츠'
  | '롱 스커트'
  | '미디 스커트'
  | '미니 스커트'
  | '맥시 원피스'
  | '미디 원피스'
  | '미니 원피스';

export type MeasurementList =
  | 'totalLength'
  | 'shoulderWidth'
  | 'chestWidth'
  | 'sleeveLength'
  | 'waistWidth'
  | 'hipWidth'
  | 'thighWidth'
  | 'rise'
  | 'hemWidth';

export type Category = {
  id: string;
  name: string;
  subCategories: SubCategoryList[];
  measurements: MeasurementList[];
}

export type Fit = {
  id: string;
  name: string;
}

export type Size =
  | 'ONE SIZE'
  | '90(S)'
  | '95(M)'
  | '90(L)'
  | '95(XL)'
  | '90(2XL)'
  | '95(3XL)'
  | '44(S)'
  | '55(M)'
  | '66(L)'
  | '77(XL)'
  | '88(2XL)'
  | '99(3XL)';

export type Gender = {
  id: string;
  name: string;
  sizes: Size[];
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  gender: string;
  height: number;
  weight: number;
  physicalDescription: string;
  followers: Pick<User, 'id' | 'name'>[];
  following: Pick<User, 'id' | 'name'>[];
};

export type Author = {
  id: string;
  name: string;
}

export type ProductCategory = {
  id: string;
  name: string;
}

export type Measurements = {
  totalLength?: number;
  shoulderWidth?: number;
  chestWidth?: number;
  sleeveLength?: number;
  waistWidth?: number;
  hipWidth?: number;
  thighWidth?: number;
  rise?: number;
  hemWidth?: number;
}

export interface Product {
  id: string;
  author: Author;
  category: ProductCategory;
  subCategory: SubCategoryList;
  brand: string;
  name: string;
  size: Size;
  measurements: Measurements;
  fits: Fit;
  description?: string;
}
