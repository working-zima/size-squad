import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { userService } from "../services/UserService";
import { queryKeys } from "../constants/queryKeys";
import { PaginationResponse, ProductResponse } from "../types";
import { ProductParamsStore } from "../stores/ProductParamsStore";
import {
  findProductFromUserProductsByProductId,
  getRelatedUserProductQueryKeys,
} from "../utils/queryUtils";

/**
 * 사용자 사이즈를 삭제하는 React Query용 커스텀 훅
 *
 * @returns useMutation() : 결과 객체
 *
 * @example
 * const deleteMutation = useDeleteUserProduct();
 * deleteMutation.mutate(productId);
 */
export default function useDeleteUserProduct() {
  const queryClient = useQueryClient();

  // TODO: onMutate, onSettled 모두에서 데이터 변경 중, 최적화를 위해 onMutate는 보이는 데이터만 바꾸고 onSettled에서 보이지 않지만 관련 데이터 수정을 고려해 보는 중
  const useDeleteUserProductMutation = useMutation({
    /** 서버에 데이터 삭제 요청 */
    mutationFn: async (productId: string) => {
      const deletedProduct = await userService.deleteMyProducts({ productId });
      return deletedProduct;
    },

    /** mutationFn 실행 전 */
    onMutate: async (deletedId: string) => {
      const params = ProductParamsStore.getState();
      const queryKey = queryKeys.userProducts(params);

      // 삭제 대상 데이터를 캐시에서 탐색
      const deletedProduct = findProductFromUserProductsByProductId(
        queryClient,
        deletedId
      );

      if (!deletedProduct) return { previousData: null };

      // 관련된 userProducts 쿼리 캐시 key를 식별
      const relatedKeys = getRelatedUserProductQueryKeys(
        queryClient,
        deletedProduct
      );

      // 병렬로 동일 조회 쿼리가 실행되고 있다면 멈춰서 캐시 충돌 방지
      await queryClient.cancelQueries({ queryKey });

      // 이전 상태 저장 (실패 시 롤백용)
      const previousStates = new Map(
        relatedKeys.map((key) => [key, queryClient.getQueryData(key)])
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
              docs: page.docs.filter((product) => product._id !== deletedId),
            })),
          };
        });
      });

      queryClient.removeQueries({
        queryKey: queryKeys.product(deletedId),
      });

      return { previousStates };
    },

    /** mutationFn 실패 시 이전 캐시 상태로 롤백 */
    onError: (error, deletedId, context) => {
      context?.previousStates?.forEach((data, key) => {
        queryClient.setQueryData(key, data);
      });
    },

    /** finally */
    onSettled: (data, error, deletedId) => {
      const deletedProduct = findProductFromUserProductsByProductId(
        queryClient,
        deletedId
      );

      if (!deletedProduct) return;

      const relatedKeys = getRelatedUserProductQueryKeys(
        queryClient,
        deletedProduct
      );

      relatedKeys.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });
    },
  });

  return useDeleteUserProductMutation;
}
