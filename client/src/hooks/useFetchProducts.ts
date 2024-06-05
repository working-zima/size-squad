import { useEffect } from 'react';

import useProductsStore from './useProductsStore';

type useFetchProductsProps = {
  categoryId?: string;
  subCategoryId?: string;
};

export default function useFetchProducts({
  categoryId, subCategoryId,
}: useFetchProductsProps) {
  const [{ products }, store] = useProductsStore();

  useEffect(() => {
    store.fetchProducts({ categoryId, subCategoryId });
  }, [categoryId, store]);

  return { products };
}
