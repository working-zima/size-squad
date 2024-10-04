import { useEffect } from 'react';

import useAuthStore from './useAuthStore';

import { accessTokenUtil } from '../auth/accessTokenUtil';
import { LOCAL_STORAGE } from '../auth/constants';

export default function useCheckAccessToken(): void {
  const [, store] = useAuthStore();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const accessToken = accessTokenUtil.getAccessToken();
      if (!accessToken) return
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
  }, []);
}
