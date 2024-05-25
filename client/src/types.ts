export type SubCategory = {
  id: string;
  name: string;
}

export type Category = {
  id: string;
  name: string;
  subCategories: SubCategory[];
}
