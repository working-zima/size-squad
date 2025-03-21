import { useQuery } from "@tanstack/react-query";
import { productAttributeService } from "../services/ProductAttributeService";

export default function useInitialData() {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["initial"],
    queryFn: () => productAttributeService.fetchInitialData(),
  });

  return { data, error, isLoading, isError };
}
