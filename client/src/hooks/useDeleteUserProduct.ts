import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userService } from "../services/UserService";
import { queryKeys } from "../constants/queryKeys";
import { ProductResponse } from "../types";

type useDeleteUserProductProps = {
  keyword?: string;
  categoryId?: string;
  subCategoryId?: string;
  sortCode?: string;
  per?: number;
  userId?: string;
};

export default function useDeleteUserProduct({
  keyword,
  categoryId,
  subCategoryId,
  sortCode,
  per,
  userId,
}: useDeleteUserProductProps = {}) {
  const queryClient = useQueryClient();

  const queryKey = queryKeys.userProducts({
    keyword,
    categoryId,
    subCategoryId,
    sortCode,
    per,
    userId,
  });

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

      return { previousData };
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
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

  return useDeleteUserProductMutation;
}
