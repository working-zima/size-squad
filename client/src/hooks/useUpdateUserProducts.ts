import { useMutation } from "@tanstack/react-query";
import { productService } from "../services/ProductService";

export default function useUpdateProduct() {
  return useMutation({
    mutationFn: productService.updateProduct,
  });
}
