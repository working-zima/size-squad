import { useEffect } from 'react'

import useAuthStore from './useAuthStore';

export default function useFetchMyUserData() {
  const [{ user, state, errorMessage }, store] = useAuthStore();

  useEffect(() => {
    store.fetchMyUserData();
  }, [store])

  return { user, state, errorMessage, store }
}
