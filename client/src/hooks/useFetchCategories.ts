import { useEffect } from 'react';

import useCategoriesStore from './useCategoriesStore';
import { Category, Summary } from '../types';

/**
 * categories를 fetch하는 역할
 * @returns `{categories, subCategories}`
 */
export default function useFetchCategories(): {
  categories: Category[],
  allSubCategories: Summary[],
  state: 'loading' | 'fetched' | 'idle' | 'error'
} {
  const [
    { categories, allSubCategories, state }, store
  ] = useCategoriesStore();

  useEffect(() => {
    store.fetchCategories();
  }, [store]);

  return { categories, allSubCategories, state };
}
