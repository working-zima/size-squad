import axios from 'axios';

import { Category, Product } from '../types';

const MOCK_BASE_URL = 'http://localhost:5000';

export default class ApiService {
  private instance = axios.create({
    baseURL: MOCK_BASE_URL,
  });

  private accessToken = '';

  setAccessToken(accessToken: string) {
    if (accessToken === this.accessToken) {
      return;
    }

    const authorization = accessToken ? `Bearer ${accessToken}` : undefined;

    this.instance = axios.create({
      baseURL: MOCK_BASE_URL,
      headers: { Authorization: authorization },
    });

    this.accessToken = accessToken;
  }

  async fetchCategories({ categoryId }: {
    categoryId? : string
  } = {}): Promise<Category[]> {
    const { data } = await this.instance.get('/categories', {
      params: { categoryId },
    });
    const { categories } = data;

    return categories;
  }

  async fetchProducts({ categoryId, subCategoryId }: {
    categoryId?: string, subCategoryId?: string
  } = {}): Promise<Product[]> {
    const { data } = await this.instance.get('/products', {
      params: { categoryId, subCategoryId },
    });
    const { products } = data;

    return products;
  }
}

export const apiService = new ApiService();
