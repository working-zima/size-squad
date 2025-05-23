import { useQuery } from '@tanstack/react-query';

import { userService } from '../services/UserService';

type useFetchUsersProps = {
  id: string | undefined;
};

export default function useUser({ id }: useFetchUsersProps) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['user', id],
    queryFn: () =>
      userService.fetchUser({
        userId: id!,
      }),
    enabled: !!id,
  });

  return {
    user: data?.user,
    isOwner: data?.isOwner,
    isLoading,
    isError,
    error,
  };
}
