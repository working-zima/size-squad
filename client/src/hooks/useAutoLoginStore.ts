import { container } from 'tsyringe';
import { useStore } from 'usestore-ts';

import AutoLoginStore from '../stores/AutoLoginStore';

export default function useAutoLoginStore() {
  const store = container.resolve(AutoLoginStore);

  return useStore(store);
}
