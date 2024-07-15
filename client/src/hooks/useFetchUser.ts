import { useEffect } from 'react'
import useUserStore from './useUserStore'

export default function useFetchUser() {
  const [
    {
      userId, email, name, gender, height, weight, description,
      followers, following
    }
    , store
  ] = useUserStore();

  useEffect(() => {
    store.fetchUser();
  }, [store])

  return {
    userId, email, name, gender, height, weight, description,
    followers, following
  }
}
