import { useEffect } from 'react';

import { apiService } from '../services/ApiService';

import { accessTokenUtil } from '../auth/accessTokenUtil';
import { LOCAL_STORAGE } from '../auth/constants';

export default function useCheckAccessToken(): void {
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const accessToken = accessTokenUtil.getAccessToken();
      if (!accessToken) return

      try {
        await apiService.fetchCurrentUser();
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
