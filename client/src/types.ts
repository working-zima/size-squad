export type Summary = {
  _id: string;
  name: string;
}

export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  gender: Summary;
  height: number;
  weight: number;
  description: string;
  followers: Pick<User, '_id' | 'name'>[];
  following: Pick<User, '_id' | 'name'>[];
};

export type Category = {
  _id: string;
  name: string;
  type: Summary;
  subCategories: Summary[];
  measurements: Summary[]
}

export type Measurement = {
  _id: string;
  name: string;
  value: string;
};

export type Size = {
  _id: string;
  name: string;
  gender: Summary;
  type: Summary;
}

export type Product = {
  _id: string;
  author: Summary;
  name: string;
  brand: string;
  category: Summary;
  subCategory: Summary;
  gender: Summary;
  size: Summary;
  fit: Summary;
  measurements: Measurement[];
  description: string;
}

export type MeasurementRequest = {
  _id: string;
  name: string;
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
  _id?: string;
  author?: Summary;
  name: string;
  brand: string;
  category: Summary;
  subCategory: Summary;
  gender: Summary;
  size: Size;
  fit: Summary;
  measurements: Measurement[];
  description: string;
}