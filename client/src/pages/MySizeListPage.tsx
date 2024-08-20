import { useSearchParams } from 'react-router-dom';

import styled from 'styled-components';

import AccessDeniedPage from './AccessDeniedPage';
import NoListPage from './NoListPage';
import ErrorPage from './ErrorPage';

import CategoryBar from '../components/category/CategoryBar';
import Products from '../components/Products';

import useAccessToken from '../hooks/useAccessToken';
import useFetchCategories from '../hooks/useFetchCategories';
import useFetchProducts from '../hooks/useFetchProducts';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const Container = styled.div`
  padding-bottom: 24px;
`;

export default function MySizeListPage() {
  const { accessToken } = useAccessToken();

  const [params] = useSearchParams();
  const categoryId = params.get('category1DepthCode') ?? undefined;
  const subCategoryId = params.get('category2DepthCodes') ?? undefined;

  const {
    categories,
    allSubCategories,
    loading: categoriesLoading
  } = useFetchCategories();
  const {
    products,
    error,
    loading: productsLoading,
    errorMessage
  } = useFetchProducts({ categoryId, subCategoryId });

  const loading = categoriesLoading || productsLoading;

  const subCategories = categoryId
    ? categories.find(category => category._id === categoryId)?.subCategories
    || []
    : allSubCategories;

  if (!accessToken) return (<AccessDeniedPage />);
  if (error) return (<ErrorPage errorMessage={errorMessage} />);
  if (loading) return (<LoadingSpinner />);

  if (!products.length) {
    return (
      <Container>
        <CategoryBar categories={categories} subCategories={subCategories} />
        <NoListPage />
      </Container>
    )
  }

  return (
    <Container>
      <CategoryBar categories={categories} subCategories={subCategories} />
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
