import { useEffect } from 'react';

import { Category, SubCategorySummary } from '../types';

import useCategoriesStore from './useCategoriesStore';

/**
 * categories를 fetch하는 역할
 * @param categoryId
 * @returns `{categories, subCategories}`
 */
export default function useFetchCategories()
: {categories: Category[]} {
  const [{ categories }, store] = useCategoriesStore();

  useEffect(() => {
    store.fetchCategories();
  }, [store]);

  return { categories };
}
