import { useSearchParams } from 'react-router-dom';

import styled from 'styled-components';

import AccessDeniedPage from './AccessDeniedPage';
import NoListPage from './NoListPage';

import CategoryBar from '../components/category/CategoryBar';
import Products from '../components/Products';

import useAccessToken from '../hooks/useAccessToken';
import useFetchCategories from '../hooks/useFetchCategories';
import useFetchProducts from '../hooks/useFetchProducts';
import { useEffect } from 'react';
import ErrorPage from './ErrorPage';

const Container = styled.div`
  padding-bottom: 24px;
`;

export default function MySizeListPage() {
  const { accessToken } = useAccessToken();

  const [params] = useSearchParams();
  const categoryId = params.get('category1DepthCode') ?? undefined;
  const subCategoryId = params.get('category2DepthCodes') ?? undefined;

  const { categories, allSubCategories } = useFetchCategories();
  const { products, error, loading, errorMessage } = useFetchProducts(
    { categoryId, subCategoryId }
  );

  if (error) {
    return (
      <ErrorPage errorMessage={errorMessage}/>
    );
  }

  if (loading) {
    return (
      <p>Loading...</p>
    );
  }

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
