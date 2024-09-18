import { useEffect } from 'react';

import useAccessToken from './useAccessToken';

import { apiService } from '../services/ApiService';

export default function useCheckAccessToken(): void {
  const { accessToken, setAccessToken } = useAccessToken();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        await apiService.fetchCurrentUser();

      } catch (error) {
        console.log(`useCheckAccessToken: `, error)
        setAccessToken('');
      }
    };

    fetchCurrentUser();
  }, [accessToken, setAccessToken]);
}
