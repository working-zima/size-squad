import { useEffect } from 'react'
import useUserStore from './useUserStore'

export default function useFetchUser() {
  const [{ user, loading, error, done }, store] = useUserStore();

  useEffect(() => {
    store.fetchUser();
  }, [store])

  return { user, loading, error, done }
}
