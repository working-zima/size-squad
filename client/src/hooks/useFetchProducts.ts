import { useEffect } from 'react';

import useProductsStore from './useProductsStore';

type useFetchProductsProps = {
  categoryId?: string;
  subCategoryId?: string;
};

export default function useFetchProducts({
  categoryId, subCategoryId,
}: useFetchProductsProps) {
  const [{
    products = [],
    errorMessage,
    state
  }, store] = useProductsStore();

  useEffect(() => {
    store.fetchMyProducts({ categoryId, subCategoryId });
  }, [categoryId, subCategoryId, store]);

  return { products, errorMessage, state, store };
}
