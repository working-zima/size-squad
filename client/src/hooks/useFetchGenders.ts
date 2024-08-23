import { useEffect } from "react";

import useGendersStore from "./useGenderStore"

export default function useFetchGenders() {
  const [{ genders, errorMessage, state }, store] = useGendersStore();

  useEffect(() => {
    store.fetchGenders();
  }, [store])

  return { genders, errorMessage, state }
}
