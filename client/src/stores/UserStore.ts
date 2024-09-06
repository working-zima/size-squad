import { singleton } from "tsyringe";
import { Action, Store } from "usestore-ts";

import { apiService } from "../services/ApiService";

import { PaginationResponse, SortOption, User } from "../types";

import { nullUser } from "../nullObject";

import { SORT_OPTIONS } from "../constants";

@singleton()
@Store()
class UserStore {
  user: User = nullUser;

  users: User[] = [nullUser];

  page = 1;

  sortOption: SortOption = SORT_OPTIONS[0];

  hasNextPage = true;

  keyword = '';

  per = 10;

  totalDocs = 0;

  errorMessage = '';

  state: 'loading' | 'fetched' | 'idle' | 'error' = 'idle'

  get passwordValid() {
    return
  }

  @Action()
  private setUser(user: User) {
    this.user = user;
  }

  @Action()
  private setUsers(users: User[]) {
    this.users = users;
  }

  @Action()
  private setSortOption(sortOption: SortOption) {
    this.sortOption = sortOption;
  }

  @Action()
  private setPage(nextPage: number) {
    this.page = nextPage;
  }

  @Action()
  private setTotalDocs(totalDocs: number) {
    this.totalDocs = totalDocs;
  }

  @Action()
  private setPer(per: number) {
    this.per = per;
  }

  @Action()
  reset() {
    this.user = nullUser;
    this.users = [nullUser];
    this.errorMessage = '';
    this.state = 'idle';
  }

  @Action()
  private handleUserResponse(users: PaginationResponse<User>) {
    if (!users.hasNextPage) this.setHasNextPage();
    if (users.totalPages >= this.page) this.setUsers(users.docs);
    if (users.nextPage) this.setPage(users.nextPage);
  }

  @Action()
  private setHasNextPage() {
    this.hasNextPage = false;
  }

  async fetchUser() {
    try {
      this.startLoading();
      const user = await apiService.fetchCurrentUser();

      this.setUser(user);
      this.setDone();
    } catch (error) {
      const typedError = error as { status?: number; message: string };
      this.errorMessage = typedError.message || '예기치 못한 오류가 발생했습니다.'

      this.setError();
    }
  }

  async fetchUsers({
    keyword,
    sortCode,
    per
  }: {
    keyword: any;
    sortCode?: string,
    per: any;
  }) {
    this.startLoading();
    try {
      const sortOption = sortCode
        ? SORT_OPTIONS[sortCode]
        : SORT_OPTIONS.RECENT;
      const sortField = Object.keys(sortOption.sort)[0];
      const sortOrder = Object.values(sortOption.sort)[0];

      const users = await apiService.fetchUsers({
        keyword,
        sortField,
        sortOrder,
        page: 1,
        per: per
      });

      this.handleUserResponse(users);
      this.setSortOption(sortOption);
      this.setPer(per);
      this.setTotalDocs(users.totalDocs);
      this.setDone();
    } catch (error) {
      const typedError = error as { status?: number; message: string };
      this.errorMessage = typedError.message || '예기치 못한 오류가 발생했습니다.'

      this.setError();
    }
  }

  @Action()
  private startLoading() {
    this.reset()
    this.state = 'loading';
  }

  @Action()
  private setDone() {
    this.state = 'fetched';
  }

  @Action()
  private setError() {
    this.user = nullUser;
    this.state = 'error';
  }
}

export default UserStore;
