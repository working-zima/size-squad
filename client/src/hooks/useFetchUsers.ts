import { useEffect } from 'react'

import useUserStore from './useUserStore'
import { PER } from '../constants';

type useFetchUserStoreProps = {
  keyword?: string,
  sortCode?: string,
  per?: number
}

export default function useFetchUsers({
  keyword,
  sortCode,
  per = PER
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
