import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../constants/queryKeys';
import { productService } from '../services/ProductService';

export default function useProduct(productId: string) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: queryKeys.product(productId),
    queryFn: () => productService.fetchProduct({ productId }),
    enabled: !!productId,
  });

  return { data, isLoading, isError, error };
}
