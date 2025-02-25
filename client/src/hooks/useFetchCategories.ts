import { useQuery } from "@tanstack/react-query";
import { productAttributeService } from "../services/ProductAttributeService";
import { Summary } from "../types";

export default function useFetchCategories() {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: () => productAttributeService.fetchCategories(),
  });

  const categories = data || [];
  const allSubCategories: Summary[] = categories.flatMap(
    (category) => category.subCategories
  );

  return {
    categories,
    allSubCategories,
    isLoading,
    isError,
    error,
  };
}
