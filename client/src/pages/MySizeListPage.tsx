import { useSearchParams } from 'react-router-dom';

import styled from 'styled-components';

import CategoryBar from '../components/category/CategoryBar';
import Products from '../components/Products';
import AccessDeniedPage from './AccessDeniedPage';

import useAccessToken from '../hooks/useAccessToken';
import useFetchCategories from '../hooks/useFetchCategories';
import useFetchProducts from '../hooks/useFetchProducts';
import NoListPage from './NoListPage';
import { useEffect } from 'react';

const Container = styled.div`
  padding-bottom: 24px;
`;

export default function MySizeListPage() {
  const { accessToken } = useAccessToken();

  const [params] = useSearchParams();
  const categoryId = params.get('category1DepthCode') ?? undefined;
  const subCategoryId = params.get('category2DepthCodes') ?? undefined;

  const { categories, allSubCategories } = useFetchCategories();
  const { products } = useFetchProducts({ categoryId, subCategoryId });

  const subCategories = categoryId
    ? categories.find(category => category._id === categoryId)?.subCategories
      || []
    : allSubCategories;

  if (!accessToken) {
    return (
      <AccessDeniedPage />
    );
  }

  if(!products.length) {
    return (
      <Container>
        <CategoryBar categories={categories} subCategories={subCategories}/>
        <NoListPage/>
      </Container>
    )
  }

  return (
    <Container>
      <CategoryBar categories={categories} subCategories={subCategories}/>
      {subCategories.map((subCategory) => (
        <Products
          key={subCategory._id}
          subCategory={subCategory}
          products={products}
        />
      ))}
    </Container>
  );
}
