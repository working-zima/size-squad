import { container } from 'tsyringe';
import { useStore } from 'usestore-ts';

import AuthStore from '../stores/AuthStore';

export default function useAuthStore() {
  const store = container.resolve(AuthStore);

  return useStore(store);
}
