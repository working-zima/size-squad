import { useEffect } from "react";

import useInitialDataStore from "./useInitialDataStore";

export default function useFetchInitialData() {
  const [{ categories, genders, fits, sizes }, store] = useInitialDataStore();

  useEffect(() => {
      store.fetchInitialData();
  }, [store])

  return { categories, genders, fits, sizes, store }
}
