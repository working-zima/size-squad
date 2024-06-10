import { container } from 'tsyringe';
import { useStore } from 'usestore-ts';

import ViewModeStore from '../stores/ViewModeStore';

export default function useViewModeStore() {
  const store = container.resolve(ViewModeStore);

  return useStore(store);
}
