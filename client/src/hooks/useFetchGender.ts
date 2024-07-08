import { useEffect } from "react";

import useGenderStore from "./useGenderStore"

export default function useFetchGender() {
  const [{ genderList, error, loading }, store] = useGenderStore();

  useEffect(() => {
      store.fetchGender();
  }, [store])

  return { genderList, error, loading }
}
