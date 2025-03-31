import { useEffect, useRef } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";

import useIntersectionObserver from "./useIntersectionObserver";
import { productService } from "../services/ProductService";

import { SORT_OPTIONS } from "../constants/constants";
import { queryKeys } from "../constants/queryKeys";
import { productParamsStore } from "../stores/productParamsStore";

const ioOptions = { threshold: 1 };

type useUserProductsProps = {
  keyword?: string;
  categoryId?: string;
  subCategoryId?: string;
  sortCode?: string;
  per?: number;
  userId?: string;
};

export function useUserProducts() {
  const { keyword, categoryId, subCategoryId, sortCode, per, userId } =
    productParamsStore((state) => state);

  const queryKey = queryKeys.userProducts({
    keyword,
    categoryId,
    subCategoryId,
    sortCode,
    per,
    userId,
  });

  const sortOption = sortCode ? SORT_OPTIONS[sortCode] : SORT_OPTIONS.RECENT;
  const sortField = Object.keys(sortOption.sort)[0];
  const sortOrder = Object.values(sortOption.sort)[0];

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 1 }) =>
      productService.fetchMyProducts({
        keyword,
        categoryId,
        subCategoryId,
        sortField,
        sortOrder,
        page: pageParam,
        per,
        userId,
      }),
    getNextPageParam: (lastPage) => lastPage?.nextPage ?? undefined,
    initialPageParam: 1,
  });

  const moreRef = useRef<HTMLDivElement>(null);

  const {
    entries: [entry],
  } = useIntersectionObserver(moreRef, ioOptions);
  const isIntersecting = entry?.isIntersecting;

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, isFetching]);

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isError,
    error,
    moreRef,
    sortOption,
  };
}
