import { useRouteError, useSearchParams, Link } from 'react-router-dom';

import styled from 'styled-components';

import CategoryBar from '../components/category/CategoryBar';
import Products from '../components/Products';

import useAccessToken from '../hooks/useAccessToken';
import useFetchCategories from '../hooks/useFetchCategories';
import useCategoriesStore from '../hooks/useCategoriesStore';
import useFetchProducts from '../hooks/useFetchProducts';

import { SubCategorySummary } from '../types';
import AccessDeniedPage from './AccessDeniedPage';

const Container = styled.div`
  padding-bottom: 24px;
`;

export default function MySizeListPage() {
  const { accessToken } = useAccessToken();
  const [params] = useSearchParams();
  const categoryId = params.get('category1DepthCode') ?? undefined;
  const subCategoryId = params.get('category2DepthCodes') ?? undefined;
  const [{ categories }] = useCategoriesStore();
  const error = useRouteError() as Error;

  useFetchCategories();
  // 회원가입 기능 생성 후 users/product로 받아오는 로직으로 변경할 것
  useFetchProducts({ categoryId, subCategoryId });

  const allSubCategories = categories.reduce<SubCategorySummary[]>(
    (acc, category) => [...acc, ...category.subCategories], []
  );

  const subCategories = categoryId
  ? categories.find(category => category._id === categoryId)?.subCategories || []
  : allSubCategories;

  if (!accessToken) {
    return (
      <AccessDeniedPage />
    );
  }

  return (
    <Container>
      <CategoryBar categories={categories} subCategories={subCategories}/>
      {subCategories.map((subCategory) => (
        <Products key={subCategory._id} subCategory={subCategory} />
      ))}
    </Container>
  );
}
