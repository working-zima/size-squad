import axios from 'axios';

import { Category, Product } from '../types';

const MOCK_BASE_URL = 'http://localhost:8000/data';

export default class ApiService {
  private instance = axios.create({
    baseURL: MOCK_BASE_URL,
  });

  async fetchCategories({ categoryId }: {
    categoryId? : string
  } = {}): Promise<Category[]> {
    const { data } = await this.instance.get('/categories.json', {
      params: { categoryId },
    });
    const { categories } = data;

    return categories;
  }

  async fetchProducts({ categoryId, subCategoryId }: {
    categoryId?: string, subCategoryId?: string
  } = {}): Promise<Product[]> {
    const { data } = await this.instance.get('/products.json', {
      params: { categoryId, subCategoryId },
    });

    const { products } = data;

    return products;
  }
}

export const apiService = new ApiService();
