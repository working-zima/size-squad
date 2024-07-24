import ComboBox from '../ui/ComboBox';

import useProductFormStore from '../../hooks/useProductFormStore';
import useInitialDataStore from '../../hooks/useInitialDataStore';

import { nullCategory, nullSummary } from '../../nullObject';

import { CATEGORY_MESSAGES, SUBCATEGORY_MESSAGES } from '../../constants';
import { Summary } from '../../types';
import { useEffect } from 'react';

export default function MySizeNewCategory() {
  const [{ category, subCategory }, store] = useProductFormStore();
  const [{ categories }] = useInitialDataStore()

  let subCategories = categories
    .find(cat => cat._id === category._id)?.subCategories;

  if(!subCategories?.length) subCategories = [nullSummary];

  useEffect(() => {
    const isAvailableSubs = categories.find(cat => cat._id === category._id)?.subCategories.some(subCat => subCat._id === subCategory._id)

    if (isAvailableSubs) return;

    const selectedCategory = categories
    .find(cat => cat._id === category._id) || nullCategory;

    store.changeSubCategory(selectedCategory?.subCategories[0])
    store.changeType(selectedCategory?.type)
  }, [category])

  return (
    <>
      <ComboBox
        label="카테고리"
        selectedItem={category}
        items={categories}
        itemToId={(item) => item?._id || ''}
        itemToText={(item) => CATEGORY_MESSAGES[item?.name] || ''}
        onChange={(value) => value
          && store.changeCategory({_id: value._id, name: value.name})}
      />
      <ComboBox
        label="세부 카테고리"
        selectedItem={subCategory}
        items={subCategories}
        itemToId={(item) => item?._id || ''}
        itemToText={(item) => SUBCATEGORY_MESSAGES[item?.name] || ''}
        onChange={(value) => value && store.changeSubCategory(value)}
      />
    </>
  )
}

