import { useEffect } from 'react'

import useUserStore from './useUserStore'

export default function useFetchUser({ id }: { id: string | undefined }) {
  const [{ user, state, errorMessage, isOwner }, store] = useUserStore();

  useEffect(() => {
    if (id) store.fetchUser({ id });
  }, [id, store])

  return { user, state, errorMessage, isOwner, store }
}
