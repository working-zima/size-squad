import { useEffect } from 'react';

import useCategoriesStore from './useCategoriesStore';
import { Category } from '../types';

/**
 * categories를 fetch하는 역할
 * @returns `{categories, subCategories}`
 */
export default function useFetchCategories(): { categories: Category[] } {
  const [{ categories }, store] = useCategoriesStore();

  useEffect(() => {
    store.fetchCategories();
  }, [store]);

  return { categories };
}
