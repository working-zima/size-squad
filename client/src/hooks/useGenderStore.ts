import { useStore } from "usestore-ts";
import { container } from "tsyringe";

import GendersStore from "../stores/GendersStore";

export default function useGendersStore() {
  const store = container.resolve(GendersStore)

  return useStore(store)
}