import axiosInstance from '../api/axiosInstance';
import { Category, Size, Summary } from '../types';

export default class ProductAttributeService {
  async fetchInitialData() {
    const { data } = await axiosInstance.get('/initialData');
    const { initialData } = data;

    return initialData;
  }

  async fetchCategories({
    categoryId,
  }: {
    categoryId?: string;
  } = {}): Promise<Category[]> {
    const { data } = await axiosInstance.get('/categories', {
      params: { categoryId },
    });
    const { categories } = data;

    return categories;
  }

  async fetchFits(): Promise<Summary[]> {
    const { data } = await axiosInstance.get('/fits');
    const { fits } = data;

    return fits;
  }

  async fetchGenders(): Promise<Summary[]> {
    const { data } = await axiosInstance.get('/genders');
    const { genders } = data;

    return genders;
  }

  async fetchSizes(): Promise<Size[]> {
    const { data } = await axiosInstance.get('/sizes');
    const { sizes } = data;

    return sizes;
  }
}

export const productAttributeService = new ProductAttributeService();
