import { container } from 'tsyringe';
import { useStore } from 'usestore-ts';

import FitsStore from '../stores/FitsStore';

export default function useFitsStore() {
  const store = container.resolve(FitsStore);
  return useStore(store);
}
