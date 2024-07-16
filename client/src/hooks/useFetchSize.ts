import { useEffect } from 'react';

import useSizeStore from './useSizeStore';

export default function useFetchSize() {
  const [{ sizes = [] }, store] = useSizeStore();

  useEffect(() => {
    store.fetchSizes();
  }, [store]);

  return { sizes };
}
