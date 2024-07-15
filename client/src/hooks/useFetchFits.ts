import { useEffect } from "react";

import useFitsStore from "./useFitsStore";

export default function useFetchFits() {
  const [{ fits, error, loading }, store] = useFitsStore();

  useEffect(() => {
      store.fetchFits();
  }, [store])

  return { fits, error, loading }
}
