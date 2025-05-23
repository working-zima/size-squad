export type ApiState = 'loading' | 'fetched' | 'idle' | 'error';

export type Summary = {
  _id: string;
  name: string;
};

export type SummaryUndefined = {
  _id: string | undefined;
  name: string | undefined;
};

export type UserWithOwnership = {
  user: User;
  isOwner: boolean;
};

export type User = {
  _id?: string;
  name: string;
  email: string;
  password: string;
  gender: Summary;
  height: number;
  weight: number;
  description: string;
  followers?: Pick<User, '_id' | 'name'>[];
  following?: Pick<User, '_id' | 'name'>[];
};

export type Category = {
  _id: string;
  name: string;
  type: Summary;
  subCategories: Summary[];
  measurements: Summary[];
};

// TODO: value 타입 Number 고려
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
};

export type ProductInputForm = {
  brand: string;
  name: string;
  category: Summary;
  subCategory: Summary;
  gender: Summary;
  size: Summary;
  fit: Summary;
  measurements: Measurement[];
  description: string;
};

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
};

export type MeasurementRequest = {
  _id: string;
  name: string;
  value: number;
};

export type ProductRequest = {
  _id?: string;
  author: string;
  brand: string;
  name: string;
  category: string;
  subCategory: string;
  gender: string;
  size: string;
  fit: string;
  measurements: MeasurementRequest[];
  description: string;
};

export type ProductResponse = {
  _id: string;
  author: Summary;
  brand: string;
  name: string;
  category: Summary;
  subCategory: Summary;
  gender: Summary;
  size: Size;
  fit: Summary;
  measurements: Measurement[];
  description: string;
};

export type PaginationResponse<T> = {
  docs: T[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number | null;
  prevPage: number | null;
  limit: number;
  page: number;
  pagingCounter: number;
  totalDocs: number;
  totalPages: number;
};

export type InitialData = {
  categories: Category[];
  genders: Summary[];
  sizes: Size[];
  fits: Summary[];
};

export type PageConfig = {
  PAGETITLE: string;
  LEFTBUTTON: 'backspace' | '';
  RIGHTBUTTON: 'search' | 'home' | '';
  FOOTER: boolean;
  SWITCHER: boolean;
  SHOWMENU: boolean;
};

export type SortOption = {
  _id: string;
  name: string;
  sort: { [key: string]: -1 | 1 };
  urlParam: string;
};

export type UserProductQueryParams = {
  keyword?: string;
  categoryId?: string;
  subCategoryId?: string;
  sortCode?: string;
  per?: number;
  userId?: string;
};
