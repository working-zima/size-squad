import { useStore } from "usestore-ts";
import { container } from "tsyringe";

import InitialDataStore from "../stores/InitialDataStore";

export default function useInitialDataStore() {
  const store = container.resolve(InitialDataStore)

  return useStore(store)
}