import { useEffect } from 'react'
import useUserStore from './useUserStore'

export default function useFetchUserStore() {
  const [{ user, state }, store] = useUserStore();

  useEffect(() => {
    store.fetchUser();
  }, [store])

  return { user, state, store }
}
