import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userService } from "../services/UserService";
import { queryKeys } from "../constants/queryKeys";
import { ProductResponse } from "../types";
import { ProductParamsStore } from "../stores/ProductParamsStore";

export default function useDeleteUserProduct() {
  const queryClient = useQueryClient();

  const params = ProductParamsStore.getState();
  const queryKey = queryKeys.userProducts(params);

  const useDeleteUserProductMutation = useMutation({
    mutationFn: (productId: string) =>
      userService.deleteMyProducts({ productId }),

    onMutate: async (deletedId: string) => {
      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => ({
            ...page,
            docs: page.docs.filter(
              (product: ProductResponse) => product._id !== deletedId
            ),
          })),
        };
      });

      queryClient.removeQueries({
        queryKey: queryKeys.product(deletedId),
      });

      return { previousData };
    },

    onError: (error, productId, context: any) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["userProducts"] });
    },
  });

  return useDeleteUserProductMutation;
}
