import { container } from 'tsyringe';
import { useStore } from 'usestore-ts';

import SizeStore from '../stores/sizeStore';

export default function useSizeStore() {
  const store = container.resolve(SizeStore);

  return useStore(store);
}
