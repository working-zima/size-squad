import { useEffect } from 'react';

import { userService } from '../services/UserService';

import { accessTokenUtil } from '../auth/accessTokenUtil';
import { LOCAL_STORAGE } from '../auth/constants';
import useAuthStore from './useAuthStore';

export default function useCheckAccessToken(): void {
  const [, store] = useAuthStore();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const accessToken = accessTokenUtil.getAccessToken();
      if (!accessToken) return

      try {
        await store.fetchMyUserData();
      } catch (error) {
        accessTokenUtil.setAccessToken('')
      }
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
