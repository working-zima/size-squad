import { useEffect, useRef } from 'react';

import useIntersectionObserver from './useIntersectionObserver';
import useProductsStore from './useProductsStore';

const ioOptions = { threshold: 1 }

type useInfiniteScrollProps = {
  keyword?: string,
  categoryId?: string,
  subCategoryId?: string,
  sortCode?: string,
  per?: number
}

export default function useFetchMyProducts({
  keyword,
  categoryId,
  subCategoryId,
  sortCode,
  per = 10
}: useInfiniteScrollProps) {
  const [{
    products = [],
    errorMessage,
    state,
    sortOption,
    totalDocs,
  }, store] = useProductsStore();
  const moreRef = useRef<HTMLDivElement>(null)

  const { entries: [entry] } = useIntersectionObserver(moreRef, ioOptions)
  const isIntersecting = entry?.isIntersecting

  useEffect(() => {
    store.fetchMyInitialProducts({
      keyword, categoryId, subCategoryId, sortCode, per
    });
  }, [categoryId, subCategoryId, sortCode, keyword, per, store]);

  useEffect(() => {
    if (isIntersecting) {
      store.fetchMoreMyProducts({ keyword, categoryId, subCategoryId })
    }
  }, [isIntersecting, store]);

  return {
    products,
    state,
    moreRef,
    errorMessage,
    sortOption,
    totalDocs,
    store
  };
};
