export type GenderSummary = {
  _id: string;
  gender: 'female' | 'male';
}

export type SubCategorySummary = {
  _id: string;
  subCategory: string;
}

export type FitSummary = {
  _id: string;
  fit: string;
}

export type CategorySummary = {
  _id: string;
  category: string;
}

export type AuthorSummary = {
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
  measurements: string[];
}

export type Gender = {
  _id: string;
  gender: string;
  size: string[];
}

export type Measurements = {
  _id: string;
  totalLength?: number;
  shoulderWidth?: number;
  chestWidth?: number;
  sleeveLength?: number;
  waistWidth?: number;
  hipWidth?: number;
  thighWidth?: number;
  rise?: number;
  hemWidth?: number;
};

export type Product = {
  _id: string;
  authorId: AuthorSummary;
  name: string;
  brand: string;
  categoryId: CategorySummary;
  subCategoryId: SubCategorySummary;
  genderId: GenderSummary;
  size: string;
  fitId: FitSummary;
  measurements: Measurements;
  description: string;
  price: number;
}
