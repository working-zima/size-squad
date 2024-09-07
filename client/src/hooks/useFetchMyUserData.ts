import { useEffect } from 'react'

import useUserStore from './useUserStore'

export default function useFetchMyUserData() {
  const [{ user, state, errorMessage }, store] = useUserStore();

  useEffect(() => {
    store.fetchMyUserData();
  }, [store])

  return { user, state, errorMessage, store }
}
