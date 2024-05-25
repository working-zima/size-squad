import axios from 'axios';

import { Category } from '../types';

const MOCK_BASE_URL = 'http://localhost:8000/data';

export default class ApiService {
  private instance = axios.create({
    baseURL: MOCK_BASE_URL,
  });

  async fetchCategories({ categoryId }: {categoryId? : string}): Promise<Category[]> {
    const { data } = await this.instance.get('/categories.json', {
      params: { categoryId },
    });

    const { categories } = data;

    return categories;
  }
}

export const apiService = new ApiService();
