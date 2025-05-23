import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '../constants/queryKeys';
import { productService } from '../services/ProductService';
import { ProductParamsStore } from '../stores/ProductParamsStore';
import { ProductRequest } from '../types';

// TODO: 훅 아직 미완성
export default function useUpdateProduct() {
  const queryClient = useQueryClient();

  const params = ProductParamsStore.getState();
  const queryKey = queryKeys.userProducts(params);

  const useUpdateProductMutation = useMutation({
    mutationFn: ({
      _id,
      author,
      name,
      brand,
      category,
      subCategory,
      gender,
      size,
      fit,
      measurements,
      description,
    }: ProductRequest) =>
      productService.updateProduct({
        _id,
        author,
        name,
        brand,
        category,
        subCategory,
        gender,
        size,
        fit,
        measurements,
        description,
      }),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData(queryKey);

      return { previousData };
    },

    onError: (error, productId, context: any) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return useUpdateProductMutation;
}
