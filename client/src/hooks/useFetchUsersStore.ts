import { useEffect } from 'react'

import useUserStore from './useUserStore'

type useFetchUserStoreProps = {
  keyword?: string,
  sortCode?: string,
  per?: number
}

export default function useFetchMyUserData({
  keyword,
  sortCode,
  per = 10
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
