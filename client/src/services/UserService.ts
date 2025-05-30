import axiosInstance from '../api/axiosInstance';
import { PaginationResponse, Summary, User, UserWithOwnership } from '../types';

export default class UserService {
  async signup({
    email,
    name,
    password,
    gender,
    height,
    weight,
    description,
  }: {
    email: string;
    name: string;
    password: string;
    gender?: string;
    height?: number;
    weight?: number;
    description?: string;
  }): Promise<string> {
    const { data } = await axiosInstance.post('/users', {
      email,
      name,
      password,
      gender,
      height,
      weight,
      description,
    });
    const { accessToken } = data;
    return accessToken;
  }

  async fetchUser({ userId }: { userId: string }): Promise<UserWithOwnership> {
    const { data } = await axiosInstance.get(`/users/${userId}`);

    return { user: data.user, isOwner: data.isOwner };
  }

  async fetchCurrentUser(): Promise<User> {
    const { data } = await axiosInstance.get('/users/me');
    const { user } = data;

    return user;
  }

  async fetchUsers({
    keyword,
    sortField,
    sortOrder,
    page,
    per,
  }: {
    keyword?: string;
    sortField?: string;
    sortOrder?: number;
    page?: number;
    per?: number;
  }): Promise<PaginationResponse<User>> {
    const { data } = await axiosInstance.get('/users/all', {
      params: { keyword, sortField, sortOrder, page, per },
    });
    const { users } = data;

    return users;
  }

  async checkUserEmail({ email }: { email: string }): Promise<string> {
    const { data } = await axiosInstance.get(`/users/email-valid/${email}`);
    const { id } = data;

    return id;
  }

  async checkUserName({ name }: { name: string }): Promise<string> {
    const { data } = await axiosInstance.get(`/users/name-valid/${name}`);
    const { id } = data;

    return id;
  }

  async updatePassword({
    oldPassword,
    newPassword,
  }: {
    oldPassword: string;
    newPassword: string;
  }) {
    await axiosInstance.patch(`/users/modify-password`, {
      oldPassword,
      newPassword,
    });
  }

  async updateGender({ gender }: { gender: Summary }) {
    await axiosInstance.patch(`/users/modify-gender`, { gender });
  }

  async updateHeight({ height }: { height: number }) {
    await axiosInstance.patch(`/users/modify-height`, { height });
  }

  async updateWeight({ weight }: { weight: number }) {
    await axiosInstance.patch(`/users/modify-weight`, { weight });
  }

  async updateDescription({ description }: { description: string }) {
    await axiosInstance.patch(`/users/modify-description`, { description });
  }

  async deleteMyProducts({ productId }: { productId: string }) {
    await axiosInstance.delete(`/users/product/${productId}`);
  }

  async deleteUser() {
    await axiosInstance.delete(`/users`);
  }
}

export const userService = new UserService();
