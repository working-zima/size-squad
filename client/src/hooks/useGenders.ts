import { useQuery } from "@tanstack/react-query";
import { productAttributeService } from "../services/ProductAttributeService";

export default function useGenders() {
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
