import { useEffect, useRef } from 'react';

import useIntersectionObserver from './useIntersectionObserver';
import useProductsStore from './useProductsStore';

const ioOptions = { threshold: 1 }

type useInfiniteScrollProps = {
  keyword?: string,
  categoryId?: string,
  subCategoryId?: string,
  sortCode?: string,
  per?: number,
  userId?: string,
}

export default function useFetchMyProducts({
  keyword,
  categoryId,
  subCategoryId,
  sortCode,
  per,
  userId
}: useInfiniteScrollProps) {
  const [{
    products = [],
    errorMessage,
    state,
    sortOption,
    totalDocs,
    hasNextPage
  }, store] = useProductsStore();

  const moreRef = useRef<HTMLDivElement>(null)

  const { entries: [entry] } = useIntersectionObserver(moreRef, ioOptions)
  const isIntersecting = entry?.isIntersecting

  useEffect(() => {
    if (userId && state !== 'loading') {
      store.fetchMyInitialProducts({
        keyword, categoryId, subCategoryId, sortCode, per, userId
      });
    }
  }, [keyword, categoryId, subCategoryId, sortCode, per, userId, store]);

  useEffect(() => {
    if (products.length === 0 || state === 'loading') return;
    if (isIntersecting) store.fetchMoreMyProducts();
  }, [isIntersecting]);

  return {
    products,
    state,
    subCategoryId,
    errorMessage,
    sortOption,
    totalDocs,
    store,
    moreRef,
  };
};
