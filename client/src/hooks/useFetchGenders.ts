import { useEffect } from "react";

import useGendersStore from "./useGenderStore"

export default function useFetchGenders() {
  const [{ genders, error, loading }, store] = useGendersStore();

  useEffect(() => {
      store.fetchGenders();
  }, [store])

  return { genders, error, loading }
}
