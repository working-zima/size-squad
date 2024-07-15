export type GenderSummary = {
  _id: string;
  gender: string;
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
  measurements: string[]
}

export type Gender = {
  _id: string;
  gender: string;
  size: string[];
}

export type Measurement = {
  name: string;
  value: string;
};

export type Product = {
  _id: string;
  author: AuthorSummary;
  name: string;
  brand: string;
  category: Category;
  subCategory: SubCategorySummary;
  gender: GenderSummary;
  size: string;
  fit: FitSummary;
  measurements: Measurement[];
  description: string;
}

export type ProductRequest = {
  _id?: string;
  authorId: string;
  name: string;
  brand: string;
  categoryId: string;
  subCategoryId: string;
  genderId: string;
  size: string;
  fitId: string;
  measurements: Measurement[];
  description: string;
}

export type ProductResponse = {
  _id: string;
  author: AuthorSummary;
  name: string;
  brand: string;
  category: CategorySummary;
  subCategory: string[];
  gender: GenderSummary;
  size: string;
  fit: FitSummary;
  measurements: Measurement;
  description: string;
}