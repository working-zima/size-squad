import { useEffect } from 'react';

import { Category, SubCategorySummary } from '../types';

import useCategoriesStore from './useCategoriesStore';

/**
 * categories를 fetch하는 역할
 * @param categoryId
 * @returns `{categories, subCategories}`
 */
export default function useFetchCategories({ categoryId } : {
  categoryId?: string;
}): {categories: Category[], subCategories: SubCategorySummary[]} {
  const [{ categories, subCategories }, store] = useCategoriesStore();

  useEffect(() => {
    store.fetchCategories({ categoryId });
  }, [categoryId, store]);

  return { categories, subCategories };
}
