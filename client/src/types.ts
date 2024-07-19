export type GenderSummary = {
  _id: string;
  name: string;
}

export type SubCategorySummary = {
  _id: string;
  name: string;
}

export type FitSummary = {
  _id: string;
  name: string;
}

export type AuthorSummary = {
  _id: string;
  name: string;
}

export type MeasurementSummary = {
  _id: string;
  name: string;
}

export type SizeSummary = {
  _id: string;
  name: string;
}

export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  genderId: GenderSummary;
  height: number;
  weight: number;
  description: string;
  followers: Pick<User, '_id' | 'name'>[];
  following: Pick<User, '_id' | 'name'>[];
};

export type Category = {
  _id: string;
  category: string;
  subCategories: SubCategorySummary[];
  measurements: MeasurementSummary[]
}

export type CategorySummary = {
  _id: string;
  category: string;
}

export type Measurement = {
  _id: string;
  name: string;
  value: string;
};

export type Size = {
  _id: string;
  size: string;
  genderId?: GenderSummary;
  type?: string;
}

export type Product = {
  _id: string;
  author: AuthorSummary;
  name: string;
  brand: string;
  category: Category;
  subCategory: SubCategorySummary;
  gender: GenderSummary;
  size: SizeSummary;
  fit: FitSummary;
  measurements: Measurement[];
  description: string;
}

export type MeasurementRequest = {
  _id: string;
  measurement: string;
  value: number;
}

export type ProductRequest = {
  _id?: string;
  author: string;
  name: string;
  brand: string;
  category: string;
  subCategory: string;
  gender: string;
  size: string;
  fit: string;
  measurements: MeasurementRequest[];
  description: string;
}

export type ProductResponse = {
  _id: string;
  authorId: AuthorSummary;
  name: string;
  brand: string;
  categoryId: CategorySummary;
  subCategoryId: SubCategorySummary;
  gender: GenderSummary;
  sizeId: Size;
  fitId: FitSummary;
  measurements: Measurement[];
  description: string;
}