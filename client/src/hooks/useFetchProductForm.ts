import { useEffect } from 'react';

import useProductFormStore from './useProductFormStore';

export default function useFetchProductForm({
  productId,
}: {
  productId: string;
}) {
  const [{ product, state }, store] = useProductFormStore();

  useEffect(() => {
    store.fetchProduct({ productId });
  }, [productId, store]);

  return { product, state, store };
}
