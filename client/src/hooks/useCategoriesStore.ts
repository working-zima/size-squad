import { container } from "tsyringe";
import { useStore } from "usestore-ts";

import CategoriesStore from "../stores/CategoriesStore";

/**
 * `CategoriesStore`을 사용하는 역할
 * @returns store
 */
export default function useCategoriesStore() {
  const store = container.resolve(CategoriesStore);

  return useStore(store);
}
