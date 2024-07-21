import ComboBox from '../ui/ComboBox';

import useProductFormStore from '../../hooks/useProductFormStore';
import useInitialDataStore from '../../hooks/useInitialDataStore';

import { nullSummary } from '../../nullObject';

import { CATEGORY_MESSAGES, SUBCATEGORY_MESSAGES } from '../../constants';
import { Category } from '../../types';
import { useEffect } from 'react';


export default function MySizeNewCategory() {
  const [{ category, subCategory }, store] = useProductFormStore();
  const [{ categories }] = useInitialDataStore()

  const subCategories = categories
    .find(categoryElem => categoryElem._id === category._id)?.subCategories
      || [nullSummary];

  useEffect(() => {
    const type = categories
      .find(categoryElem => (categoryElem._id === category._id))?.type
      || nullSummary;

    store.changeType(type);
    store.changeSubCategory(subCategories[0]);
  }, [category])

  return (
    <>
      <ComboBox
        label="카테고리"
        selectedItem={category}
        items={categories}
        itemToId={(item) => item?._id || ''}
        itemToText={(item) => CATEGORY_MESSAGES[item?.name] || ''}
        onChange={(value) => value && store.changeCategory(
          {_id: value._id, name: value.name}
        )}
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

