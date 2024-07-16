import { Category } from '../../types';

import ComboBox from '../ui/ComboBox';

import useProductFormStore from '../../hooks/useProductFormStore';

type MySizeNewCategoryProps = {
  categories: Category[];
}

export default function MySizeNewCategory({
  categories
}: MySizeNewCategoryProps) {
  const [{ category, subCategory }, store] = useProductFormStore();

  return (
    <>
      <ComboBox
        label="카테고리"
        selectedItem={category}
        items={categories}
        itemToId={(item) => item?._id || ''}
        itemToText={(item) => item?.category || ''}
        onChange={(value) => value && store.changeCategory(value)}
      />
      <ComboBox
        label="세부 카테고리 (카테고리를 먼저 고르세요.)"
        selectedItem={subCategory}
        items={category.subCategories}
        itemToId={(item) => item?._id || ''}
        itemToText={(item) => item?.subCategory || ''}
        onChange={(value) => value && store.changeSubCategory(value)}
      />
    </>
  )
}

