import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { userService } from "../services/UserService";

import { PaginationResponse, User } from "../types";
import { DEFAULT_PER, SORT_OPTIONS } from "../constants/constants";

type useFetchUserStoreProps = {
  keyword?: string;
  sortCode?: string;
  per?: number;
  page: number;
};

export default function useUsers({
  keyword,
  sortCode,
  per = DEFAULT_PER,
  page,
}: useFetchUserStoreProps) {
  const sortOption = sortCode ? SORT_OPTIONS[sortCode] : SORT_OPTIONS.RECENT;
  const sortField = Object.keys(sortOption.sort)[0];
  const sortOrder = Object.values(sortOption.sort)[0];

  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery<PaginationResponse<User>>({
    queryKey: ["users", keyword, sortCode, per, page],
    queryFn: () =>
      userService.fetchUsers({
        keyword,
        sortField,
        sortOrder,
        page,
        per,
      }),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });

  return { users, isLoading, isError, error };
}
