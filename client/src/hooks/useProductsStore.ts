import { container } from 'tsyringe';
import { useStore } from 'usestore-ts';

import ProductsStore from '../stores/ProductsStore';

export default function useProductsStore() {
  const store = container.resolve(ProductsStore);

  return useStore(store);
}
