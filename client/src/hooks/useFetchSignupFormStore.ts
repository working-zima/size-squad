import { useEffect } from 'react';

import useSignupFormStore from './useSignupFormStore';

export default function useFetchSignupFormStore() {
  const [{ user, error, loading, done }, store] = useSignupFormStore();

  useEffect(() => {
    store.fetchUser();
  }, [store]);

  return { user, error, loading, done, store };
}
