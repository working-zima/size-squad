import { useMutation, useQueryClient } from '@tanstack/react-query';

import { productService } from '../services/ProductService';
import { ProductRequest, ProductResponse } from '../types';
import { getRelatedUserProductQueryKeys } from '../utils/queryUtils';

export default function useCreateUserProduct() {
  const queryClient = useQueryClient();

  const useCreateUserProductMutation = useMutation({
    mutationFn: (newProduct: ProductRequest) => {
      return productService.createProduct(newProduct);
    },

    onSuccess: (createdProduct: ProductResponse) => {
      const relatedKeys = getRelatedUserProductQueryKeys(queryClient, {
        authorId: createdProduct.author._id,
        categoryId: createdProduct.category._id,
        subCategoryId: createdProduct.subCategory._id,
      });

      relatedKeys.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });
    },
  });

  return useCreateUserProductMutation;
}
