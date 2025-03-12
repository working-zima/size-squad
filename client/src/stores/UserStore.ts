import { singleton } from "tsyringe";
import { Action, Store } from "usestore-ts";

import { ApiState, PaginationResponse, SortOption, User } from "../types";
import { nullUser } from "../nullObject";

import { userService } from "../services/UserService";

import { FETCH_STATE, DEFAULT_PER, SORT_OPTIONS } from "../constants/constants";
import { ERROR_MESSAGES } from "../constants/messages";

@singleton()
@Store()
class UserStore {
  user: User = nullUser;

  users: User[] = [nullUser];

  page = 1;

  sortOption: SortOption = SORT_OPTIONS[0];

  hasNextPage = true;

  keyword = "";

  per = DEFAULT_PER;

  totalDocs = 0;

  isOwner = false;

  errorMessage = "";

  state: ApiState = FETCH_STATE.IDLE;

  get passwordValid() {
    return;
  }

  @Action()
  private setUser(user: User) {
    this.user = user;
    this.errorMessage = "";
  }

  // @Action()
  // private setUsers(users: User[]) {
  //   this.users = users;
  //   this.errorMessage = "";
  // }

  // @Action()
  // private setSortOption(sortOption: SortOption) {
  //   this.sortOption = sortOption;
  // }

  // @Action()
  // private setPage(nextPage: number) {
  //   this.page = nextPage;
  // }

  // @Action()
  // private setTotalDocs(totalDocs: number) {
  //   this.totalDocs = totalDocs;
  // }

  // @Action()
  // private setPer(per: number) {
  //   this.per = per;
  // }

  @Action()
  private setIsOwner(isOwner: boolean) {
    this.isOwner = isOwner;
  }

  @Action()
  reset() {
    this.user = nullUser;
    this.users = [nullUser];
    this.isOwner = false;
    this.page = 1;
    this.errorMessage = "";
    this.state = FETCH_STATE.IDLE;
  }

  // @Action()
  // private handleUserResponse(users: PaginationResponse<User>) {
  //   if (!users.hasNextPage) this.setHasNextPage();
  //   if (users.totalPages >= this.page) this.setUsers(users.docs);
  //   if (users.nextPage) this.setPage(users.nextPage);
  // }

  // @Action()
  // private setHasNextPage() {
  //   this.hasNextPage = false;
  // }

  async fetchUser({ id }: { id: string }) {
    this.startLoading();
    try {
      const { user, isOwner } = await userService.fetchUser({ userId: id });

      this.setUser(user);
      this.setIsOwner(isOwner);
      this.setDone();
    } catch (error) {
      const typedError = error as { status?: number; message: string };
      this.errorMessage = typedError.message || ERROR_MESSAGES.UNEXPECTED;

      this.setError();
    }
  }

  // async fetchUsers({
  //   keyword,
  //   sortCode,
  //   per,
  // }: {
  //   keyword: any;
  //   sortCode?: string;
  //   per: any;
  // }) {
  //   this.startLoading();
  //   try {
  //     const sortOption = sortCode
  //       ? SORT_OPTIONS[sortCode]
  //       : SORT_OPTIONS.RECENT;
  //     const sortField = Object.keys(sortOption.sort)[0];
  //     const sortOrder = Object.values(sortOption.sort)[0];

  //     const users = await userService.fetchUsers({
  //       keyword,
  //       sortField,
  //       sortOrder,
  //       page: 1,
  //       per: per,
  //     });

  //     this.handleUserResponse(users);
  //     this.setSortOption(sortOption);
  //     this.setPer(per);
  //     this.setTotalDocs(users.totalDocs);
  //     this.setDone();
  //   } catch (error) {
  //     const typedError = error as { status?: number; message: string };
  //     this.errorMessage = typedError.message || ERROR_MESSAGES.UNEXPECTED;

  //     this.setError();
  //   }
  // }

  @Action()
  private startLoading() {
    this.reset();
    this.state = FETCH_STATE.LOADING;
  }

  @Action()
  private setDone() {
    this.state = FETCH_STATE.FETCHED;
  }

  @Action()
  private setError() {
    this.user = nullUser;
    this.state = FETCH_STATE.ERROR;
  }
}

export default UserStore;
