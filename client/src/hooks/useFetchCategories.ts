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
  loading: boolean
} {
  const [
    { categories, allSubCategories, loading }, store
  ] = useCategoriesStore();

  useEffect(() => {
    store.fetchCategories();
  }, [store]);

  return { categories, allSubCategories, loading };
}
