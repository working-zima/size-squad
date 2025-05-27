import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { userService } from '../services/UserService';
import { ProductParamsStore } from '../stores/ProductParamsStore';
import { PaginationResponse, ProductResponse } from '../types';
import { queryKeys } from '../utils/queryKeys';
import {
  findProductFromUserProductsByProductId,
  getRelatedUserProductQueryKeys,
} from '../utils/queryUtils';

/**
 * 사용자 사이즈를 삭제하는 React Query용 커스텀 훅
 *
 * @returns useDeleteUserProductMutation : 결과 객체
 */
export default function useDeleteUserProduct() {
  const queryClient = useQueryClient();

  const useDeleteUserProductMutation = useMutation({
    /** 서버에 데이터 삭제 요청 */
    mutationFn: async (productId: string) => {
      const deletedProduct = await userService.deleteMyProducts({ productId });
      return deletedProduct;
    },

    /** mutationFn 실행 전 */
    onMutate: async (productId: string) => {
      const params = ProductParamsStore.getState();
      const queryKey = queryKeys.userProducts(params);

      // 삭제 대상 데이터를 캐시에서 탐색
      const deletedProduct = findProductFromUserProductsByProductId(
        queryClient,
        productId,
      );

      if (!deletedProduct) return { previousData: null };

      // 관련된 userProducts 쿼리 캐시 key를 식별
      const relatedKeys = getRelatedUserProductQueryKeys(queryClient, {
        authorId: deletedProduct.author._id,
        categoryId: deletedProduct.category._id,
        subCategoryId: deletedProduct.subCategory._id,
      });

      // 병렬로 동일 조회 쿼리가 실행되고 있다면 멈춰서 캐시 충돌 방지
      await queryClient.cancelQueries({ queryKey });

      // 이전 상태 저장 (실패 시 롤백용)
      const previousStates = new Map(
        relatedKeys.map((key) => [key, queryClient.getQueryData(key)]),
      );

      // 해당 캐시들에 대해 낙관적 삭제 처리
      relatedKeys.forEach((key) => {
        queryClient.setQueryData<
          InfiniteData<PaginationResponse<ProductResponse>>
        >(key, (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              docs: page.docs.filter((product) => product._id !== productId),
            })),
          };
        });
      });

      queryClient.removeQueries({
        queryKey: queryKeys.product(productId),
      });

      return { previousStates, relatedKeys };
    },

    /** mutationFn 실패 시 이전 캐시 상태로 롤백 */
    onError: (_error, _productId, context) => {
      context?.previousStates?.forEach((data, key) => {
        queryClient.setQueryData(key, data);
      });
    },

    /** 쿼리를 stale 상태로 강제 전환 */
    onSettled: (_data, _error, productId, context) => {
      if (!context?.relatedKeys) return;

      context.relatedKeys.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });
    },
  });

  return useDeleteUserProductMutation;
}
