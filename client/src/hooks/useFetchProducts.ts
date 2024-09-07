import { useEffect, useRef } from 'react';

import useProductsStore from './useProductsStore';
import useIntersectionObserver from './useIntersectionObserver';

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
  per = 10
}: useInfiniteScrollProps) {
  const [{
    products = [],
    errorMessage,
    subCategoryId: selectedSubCategoryId,
    state,
    sortOption,
    totalDocs,
  }, store] = useProductsStore();
  const moreRef = useRef<HTMLDivElement>(null)

  const { entries: [entry] } = useIntersectionObserver(moreRef, ioOptions)
  const isIntersecting = entry?.isIntersecting

  useEffect(() => {
    store.fetchInitialProducts({
      keyword, categoryId, subCategoryId, sortCode, per
    });
  }, [categoryId, subCategoryId, sortCode, keyword, per, store]);

  useEffect(() => {
    if (isIntersecting) {
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
