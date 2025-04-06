import { useMutation, useQueryClient } from "@tanstack/react-query";

import { productService } from "../services/ProductService";
import { ProductRequest } from "../types";
import { ProductParamsStore } from "../stores/ProductParamsStore";
import { queryKeys } from "../constants/queryKeys";

export default function useCreateUserProduct() {
  const queryClient = useQueryClient();

  const params = ProductParamsStore.getState();
  const queryKey = queryKeys.userProducts(params);

  const useCreateUserProductMutation = useMutation({
    mutationFn: (newProduct: ProductRequest) =>
      productService.createProduct(newProduct),

    onMutate: async (newProduct) => {
      await queryClient.cancelQueries({ queryKey });
    },
  });

  return useCreateUserProductMutation;
}
