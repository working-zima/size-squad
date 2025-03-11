import { useEffect } from "react";

import useUserStore from "./useUserStore";
import { DEFAULT_PER, SORT_OPTIONS } from "../constants/constants";
import { useQuery } from "@tanstack/react-query";
import { userService } from "../services/UserService";
import { PaginationResponse, User } from "../types";

type useFetchUserStoreProps = {
  keyword?: string;
  sortCode?: string;
  per?: number;
};

export default function useFetchUsers({
  keyword,
  sortCode,
  per = DEFAULT_PER,
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
    queryKey: ["users", keyword, sortCode, per],
    queryFn: () =>
      userService.fetchUsers({ keyword, sortField, sortOrder, page: 1, per }),
    staleTime: 1000 * 60 * 5,
  });

  return { users, isLoading, isError, error };
}
