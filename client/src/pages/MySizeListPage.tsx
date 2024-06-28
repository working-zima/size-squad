import { useSearchParams } from 'react-router-dom';

import styled from 'styled-components';

import CategoryBar from '../components/category/CategoryBar';
import Products from '../components/Products';

import useFetchCategories from '../hooks/useFetchCategories';
import useCategoriesStore from '../hooks/useCategoriesStore';
import useFetchProducts from '../hooks/useFetchProducts';

import { SubCategorySummary } from '../types';

const Container = styled.div`
  padding-bottom: 24px;
`;

export default function MySizeListPage() {
  const [params] = useSearchParams();
  const categoryId = params.get('category1DepthCode') ?? undefined;
  const subCategoryId = params.get('category2DepthCodes') ?? undefined;
  const [{ categories }] = useCategoriesStore();

  useFetchCategories();
  // 회원가입 기능 생성 후 users/product로 받아오는 로직으로 변경할 것
  useFetchProducts({ categoryId, subCategoryId });

  const allSubCategories = categories.reduce<SubCategorySummary[]>(
    (acc, category) => [...acc, ...category.subCategories], []
  );

  const subCategories = categoryId
  ? categories.find(category => category._id === categoryId)?.subCategories || []
  : allSubCategories;

  return (
    <Container>
      <CategoryBar categories={categories} subCategories={subCategories}/>
      {subCategories.map((subCategory) => (
        <Products key={subCategory._id} subCategory={subCategory} />
      ))}
    </Container>
  );
}