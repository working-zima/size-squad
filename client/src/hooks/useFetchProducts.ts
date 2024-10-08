import { useEffect, useRef } from 'react';

import useProductsStore from './useProductsStore';
import useIntersectionObserver from './useIntersectionObserver';

import { DEFAULT_PER } from '../constants/constants';

const ioOptions = { threshold: 1 }

type useInfiniteScrollProps = {
  keyword?: string,
  categoryId?: string,
  subCategoryId?: string,
  sortCode?: string,
  per?: number
}

export default function useFetchProducts({
  keyword,
  categoryId,
  subCategoryId,
  sortCode,
  per = DEFAULT_PER
}: useInfiniteScrollProps) {
  const [{
    products = [],
    errorMessage,
    subCategoryId: selectedSubCategoryId,
    state,
    sortOption,
    totalDocs,
    hasNextPage
  }, store] = useProductsStore();
  const moreRef = useRef<HTMLDivElement>(null)

  const { entries: [entry] } = useIntersectionObserver(moreRef, ioOptions)
  const isIntersecting = entry?.isIntersecting

  useEffect(() => {
    store.fetchInitialProducts({
      keyword, categoryId, subCategoryId, sortCode, per
    });
  }, [keyword, categoryId, subCategoryId, sortCode, per, store]);

  useEffect(() => {
    if (isIntersecting && hasNextPage) {
      store.fetchMoreProducts({ keyword })
    }
  }, [isIntersecting, store]);

  return {
    products,
    sortOption,
    selectedSubCategoryId,
    totalDocs,
    errorMessage,
    state,
    moreRef,
    store
  };
}
