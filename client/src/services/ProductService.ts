import axiosInstance from '../api/axiosInstance';
import { PaginationResponse, ProductRequest, ProductResponse } from '../types';
// import ApiService from './ApiService';

export default class ProductService {
  async fetchProducts({
    keyword,
    categoryId,
    subCategoryId,
    sortField,
    sortOrder,
    page,
    per,
  }: {
    keyword?: string;
    categoryId?: string;
    subCategoryId?: string;
    sortField?: string;
    sortOrder?: number;
    page?: number;
    per?: number;
  } = {}): Promise<PaginationResponse<ProductResponse>> {
    const { data } = await axiosInstance.get('/products', {
      params: {
        keyword,
        categoryId,
        subCategoryId,
        sortField,
        sortOrder,
        page,
        per,
      },
    });
    const { products } = data;

    return products;
  }

  async fetchProduct({
    productId,
  }: {
    productId: string;
  }): Promise<ProductResponse> {
    const { data } = await axiosInstance.get(`/products/${productId}`);
    const { product } = data;
    return product;
  }

  async fetchMyProducts({
    keyword,
    categoryId,
    subCategoryId,
    sortField,
    sortOrder,
    page,
    per,
    userId,
  }: {
    keyword?: string;
    categoryId?: string;
    subCategoryId?: string;
    sortField?: string;
    sortOrder?: number;
    page?: number;
    per?: number;
    userId?: string;
  } = {}): Promise<PaginationResponse<ProductResponse>> {
    const url = userId ? `/products/user/${userId}` : `/products/user/`;
    const { data } = await axiosInstance.get(url, {
      params: {
        keyword,
        categoryId,
        subCategoryId,
        sortField,
        sortOrder,
        page,
        per,
      },
    });
    const { products } = data;
    return products;
  }

  async createProduct(newProduct: ProductRequest): Promise<ProductResponse> {
    const { data } = await axiosInstance.post<ProductResponse>(
      '/products',
      newProduct,
    );
    console.log(`newProduct: `, newProduct);
    console.log(`data: `, data);
    return data;
  }

  async updateProduct({
    _id,
    author,
    name,
    brand,
    category,
    subCategory,
    gender,
    size,
    fit,
    measurements,
    description,
  }: ProductRequest): Promise<void> {
    const productId = _id;
    const product = {
      author,
      name,
      brand,
      category,
      subCategory,
      gender,
      size,
      fit,
      measurements,
      description,
    };
    await axiosInstance.patch(`/products/${productId}`, product);
  }
}

export const productService = new ProductService();
