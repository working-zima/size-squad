export type GenderId = {
  _id: string;
  gender: 'female' | 'male';
}

export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  genderId: GenderId;
  height: number;
  weight: number;
  description: string;
  followers: Pick<User, '_id' | 'name'>[];
  following: Pick<User, '_id' | 'name'>[];
};

export type SubCategoryId = {
  _id: string;
  subCategory: string;
}

export type Category = {
  _id: string;
  category: string;
  subCategories: SubCategoryId;
  measurements: string[];
}

export type Fit = {
  _id: string;
  fit: string;
}

export type CategoryId = {
  _id: string;
  category: string;
}

export type FitId = {
  _id: string;
  fit: string;
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
  categoryId: CategoryId;
  subCategoryId: SubCategoryId;
  genderId: GenderId;
  size: string;
  fitId: FitId;
  measurements: Measurements;
  description: string;
  price: number;
}
