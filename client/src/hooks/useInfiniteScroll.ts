import { useEffect, useRef } from 'react';

import useIntersectionObserver from './useIntersectionObserver';

import useProductsStore from './useProductsStore';

const ioOptions = { threshold: 1 }

type useInfiniteScrollProps = {
  categoryId?: string,
  subCategoryId?: string
}

const useInfiniteScroll = ({
  categoryId,
  subCategoryId
}: useInfiniteScrollProps) => {
  const [{
    products = [],
    errorMessage,
    state,
  }, store] = useProductsStore();

  const moreRef = useRef<HTMLDivElement>(null)

  const { entries: [entry] } = useIntersectionObserver(moreRef, ioOptions)
  const isIntersecting = entry?.isIntersecting

  useEffect(() => {
    store.fetchInitialProducts({ categoryId, subCategoryId });
  }, [categoryId, subCategoryId, store]);

  useEffect(() => {
    if (isIntersecting) store.fetchMoreProducts({ categoryId, subCategoryId });
  }, [isIntersecting, store]);

  return {
    products,
    state,
    moreRef,
    errorMessage,
    store
  };
};

export default useInfiniteScroll;
