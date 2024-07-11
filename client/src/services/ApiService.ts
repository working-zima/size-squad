import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { Category, Gender, Product, User } from '../types';

const MOCK_BASE_URL = 'http://localhost:5000';

export default class ApiService {
  private instance = axios.create({
    baseURL: MOCK_BASE_URL,
  });

  private accessToken = '';

  constructor() {
    // 응답 인터셉트
    this.instance.interceptors.response.use(
      this.onResponse, this.onErrorResponse
    );
  }

  logOnDev = (message: string) => {
    if (process.env.NODE_ENV === "development") {
      console.log(message);
    }
  };

  onError = (status: number | undefined, message: string) => {
    const error = { status, message };

    throw error;
  };

  onResponse = (response: AxiosResponse): AxiosResponse => {
    const { method, url } = response.config;
    const { status } = response;

    this.logOnDev(`[API] ${method?.toUpperCase()} ${url} | Request ${status}`);

    return response;
  };

  onErrorResponse = async (error: AxiosError | Error) => {
    console.log(`error: `, error)
    if (axios.isAxiosError(error)) {
      const { message } = error;
      const { method, url } = error.config as AxiosRequestConfig;

      // 네트워크 오류 처리
      if (!error.response) {
        this.logOnDev(
          `[API] ${method?.toUpperCase()} ${url} | Network Error: ${message}`
        );

        this.onError(undefined, "네트워크 오류입니다.");
        return Promise.reject(error);
      }

      const { status, statusText } = error.response as AxiosResponse;

      this.logOnDev(
        `[API] ${method?.toUpperCase()} ${url}
        | Error ${status} ${statusText}
        | ${message}`
      );

      switch (status) {
        case 400:
          this.onError(status, "잘못된 요청입니다.");
          break;
        case 401: {
          this.onError(status, "인증 실패입니다.");
          break;
        }
        case 403: {
          this.onError(status, "권한이 없습니다.");
          break;
        }
        case 404: {
          this.onError(status, "찾을 수 없는 페이지입니다.");
          break;
        }
        case 500: {
          this.onError(status, "서버 오류입니다.");
          break;
        }
        default: {
          this.onError(status, `에러가 발생했습니다. ${error.message}`);
        }
      }
    } else if (error instanceof Error && error.name === "TimeoutError") {
      this.logOnDev(`[API] | TimeError ${error.toString()}`);
      this.onError(0, "요청 시간이 초과되었습니다.");
    } else {
      this.logOnDev(`[API] | Error ${error.toString()}`);
      this.onError(0, `에러가 발생했습니다. ${error.toString()}`);
    }

    return Promise.reject(error);
  };

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

  async fetchProducts({ categoryId, subCategoryId } : {
    categoryId?: string, subCategoryId?: string
  } = {}): Promise<Product[]> {
    const { data } = await this.instance.get('/products', {
      params: { categoryId, subCategoryId },
    });
    const { products } = data;

    return products;
  }

  async fetchMyProducts({ categoryId, subCategoryId } : {
    categoryId?: string, subCategoryId?: string
  } = {}): Promise<Product[]> {
    const { data } = await this.instance.get('/users/product', {
      params: { categoryId, subCategoryId },
    });
    const { products } = data;

    return products;
  }

  async fetchCurrentUser(): Promise<User[]> {
    const { data } = await this.instance.get('/users/me');
    const { user } = data;

    return user;
  }

  async checkUserEmail({ email }: {
    email: string
  }): Promise<string> {

    const { data } = await this.instance.get(`/users/email-valid/${email}`)
    const { id } = data;

    return id;
  }

  async checkUserName({ name } : {
    name: string
  }): Promise<string> {
    const { data } = await this.instance.get(`/users/name-valid/${name}`)
    const { id } = data;

    return id;
  }

  async fetchGender(): Promise<Gender[]> {
    const { data } = await this.instance.get('genders');
    const { genders } = data;

    return genders;
  }

  async login({email, password} : {
    email: string, password: string
  }): Promise<string> {
    const { data } = await this.instance.post('/session', { email, password });
    const { accessToken } = data;

    return accessToken;
  }

  async signup({
    email, name, password, gender, height, weight, description
  } : {
    email: string;
    name: string;
    password: string;
    gender?: string;
    height?: string;
    weight?: string;
    description?: string;
  }): Promise<string> {
    const { data } = await this.instance.post('/users', {
      email, name, password, gender, height, weight, description
    });
    const { accessToken } = data;

    return accessToken;
  }
}

export const apiService = new ApiService();
