import { useEffect } from 'react'

import useUserStore from './useUserStore'
import { DEFAULT_PER } from '../constants/constants';

type useFetchUserStoreProps = {
  keyword?: string,
  sortCode?: string,
  per?: number
}

export default function useFetchUsers({
  keyword,
  sortCode,
  per = DEFAULT_PER
}: useFetchUserStoreProps) {
  const [{ users, state, errorMessage }, store] = useUserStore();

  useEffect(() => {
    store.fetchUsers({
      keyword,
      sortCode,
      per
    });
  }, [keyword, sortCode, per, store])

  return { users, state, errorMessage, store }
}
