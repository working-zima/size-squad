import { useEffect } from 'react';

import { accessTokenUtil } from '../auth/accessTokenUtil';
import { LOCAL_STORAGE } from '../auth/constants';
import useAuthStore from './useAuthStore';

export default function useCheckAccessToken(): void {
  const [, store] = useAuthStore();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const accessToken = accessTokenUtil.getAccessToken();
      if (!accessToken) return;
      await store.fetchMyUserData();
    };

    fetchCurrentUser();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === LOCAL_STORAGE.ACCESS_TOKEN) fetchCurrentUser();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
