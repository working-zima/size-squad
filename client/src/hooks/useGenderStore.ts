import { useStore } from "usestore-ts";
import { container } from "tsyringe";

import GenderStore from "../stores/GenderStore";

export default function useGenderStore() {
  const store = container.resolve(GenderStore)

  return useStore(store)
}