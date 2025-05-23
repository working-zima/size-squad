import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

import { DEFAULT_PER, SORT_OPTIONS } from '../constants/constants';
import { productService } from '../services/ProductService';
import useIntersectionObserver from './useIntersectionObserver';

const ioOptions = { threshold: 1 };

type useProducts = {
  keyword?: string;
  categoryId?: string;
  subCategoryId?: string;
  sortCode?: string;
  per?: number;
};

export function useProducts({
  keyword,
  categoryId = '',
  subCategoryId = '',
  sortCode,
  per = DEFAULT_PER,
}: useProducts) {
  const sortOption = sortCode ? SORT_OPTIONS[sortCode] : SORT_OPTIONS.RECENT;
  const sortField = Object.keys(sortOption.sort)[0];
  const sortOrder = Object.values(sortOption.sort)[0];

  const moreRef = useRef<HTMLDivElement>(null);
  const {
    entries: [entry],
  } = useIntersectionObserver(moreRef, ioOptions);
  const isIntersecting = entry?.isIntersecting;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ['products', keyword, categoryId, subCategoryId, sortCode, per],
    queryFn: ({ pageParam = 1 }) =>
      productService.fetchProducts({
        keyword,
        categoryId,
        subCategoryId,
        sortField,
        sortOrder,
        page: pageParam,
        per,
      }),
    getNextPageParam: (lastPage) => lastPage.nextPage || undefined,
    initialPageParam: 1,
  });

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, isFetching, fetchNextPage]);

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
