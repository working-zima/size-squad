import { useMutation, useQueryClient } from '@tanstack/react-query';

import { productService } from '../services/ProductService';
import { ProductRequest } from '../types';
import { getRelatedUserProductQueryKeys } from '../utils/queryUtils';

/**
 * 사용자 사이즈를 수정하는 React Query용 커스텀 훅
 *
 * @returns updateProductMutation : 결과 객체
 */
export default function useUpdateUserProduct() {
  const queryClient = useQueryClient();

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
    }: ProductRequest) => {
      return productService.updateProduct({
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
      });
    },

    onSuccess: (_data, updatedProduct: ProductRequest) => {
      const relatedKeys = getRelatedUserProductQueryKeys(queryClient, {
        authorId: updatedProduct.author,
        categoryId: updatedProduct.category,
        subCategoryId: updatedProduct.subCategory,
      });

      relatedKeys.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });
    },
  });

  return useUpdateProductMutation;
}
