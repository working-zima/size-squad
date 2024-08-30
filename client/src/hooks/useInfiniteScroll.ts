import { useEffect, useRef } from 'react';

import useIntersectionObserver from './useIntersectionObserver';

import useProductsStore from './useProductsStore';

const ioOptions = { threshold: 1 }

type useInfiniteScrollProps = {
  keyword?: string,
  categoryId?: string,
  subCategoryId?: string,
  sortCode?: string
}

const useInfiniteScroll = ({
  keyword,
  categoryId,
  subCategoryId,
  sortCode
}: useInfiniteScrollProps) => {
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
    store.fetchInitialProducts({ keyword, categoryId, subCategoryId, sortCode });
  }, [categoryId, subCategoryId, sortCode, keyword, store]);

  useEffect(() => {
    if (isIntersecting) {
      store.fetchMoreProducts({ keyword, categoryId, subCategoryId })
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

export default useInfiniteScroll;
