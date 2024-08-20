import { useEffect } from "react";

import useGendersStore from "./useGenderStore"

export default function useFetchGenders() {
  const [{ genders, error, errorMessage, loading }, store] = useGendersStore();

  useEffect(() => {
    store.fetchGenders();
  }, [store])

  return { genders, error, errorMessage, loading }
}
