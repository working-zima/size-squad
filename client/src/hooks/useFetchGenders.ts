import { useQuery } from "@tanstack/react-query";
import { productAttributeService } from "../services/ProductAttributeService";

export default function useFetchGenders() {
  const {
    data: genders = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["genders"],
    queryFn: () => productAttributeService.fetchGenders(),
  });

  return { genders, isLoading, isError, error };
}
