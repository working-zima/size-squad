import { useNavigate, useSearchParams } from 'react-router-dom';

import styled from 'styled-components';

import AccessDeniedPage from './AccessDeniedPage';
import ErrorPage from './ErrorPage';
import NoListPage from './NoListPage';

import CategoryBar from '../components/category/CategoryBar';
import Product from '../components/mySize/Product';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import BorderlessComboBox from '../components/ui/selectbox/BorderlessComboBox';

import { SortOption } from '../types';

import useAccessToken from '../hooks/useAccessToken';
import useFetchCategories from '../hooks/useFetchCategories';
import useFetchMyProducts from '../hooks/useFetchMyProducts';
import useFetchMyUserData from '../hooks/useFetchMyUserData';

import { SORT_OPTIONS } from '../constants';

const Container = styled.div`
  height: 100%;
`;

const SortWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  font-size: 1.3rem;
  line-height: 20px;
  color: ${props => props.theme.colors.unSelectedText};
`

const Products = styled.div`
  margin: 0 10px;
`;

export default function MySizeListPage() {
  const { accessToken } = useAccessToken();
  const navigate = useNavigate();

  const [params] = useSearchParams();
  const categoryId = params.get('category1DepthCode') ?? undefined;
  const subCategoryId = params.get('category2DepthCode') ?? undefined;
  const sortCode = params.get('sortCode') ?? undefined;

  const { user } = useFetchMyUserData();

  const {
    categories,
    allSubCategories,
    state: categoriesState
  } = useFetchCategories();

  const {
    products,
    errorMessage,
    moreRef,
    state: productsState,
    sortOption,
    totalDocs
  } = useFetchMyProducts({
    categoryId,
    subCategoryId,
    sortCode,
    userId: user._id
  });

  const subCategories = categoryId
    ? categories
      .find(category => category._id === categoryId)?.subCategories || []
    : allSubCategories;

  const handleNavigate = (sortOption: SortOption) => {
    const queryParams: string[] = [];
    if (categoryId) {
      queryParams.push(`category1DepthCode=${categoryId}`);
    }
    if (subCategoryId) {
      queryParams.push(`category2DepthCode=${subCategoryId}`);
    }
    queryParams.push(`sortCode=${sortOption.urlParam}`);
    const queryString = queryParams.join('&');
    const path = `/mysize${queryString ? `?${queryString}` : ''}`;
    navigate(path);
  }

  if (!accessToken) return (<AccessDeniedPage />);
  if (productsState === 'error') {
    return (<ErrorPage errorMessage={errorMessage} />);
  }

  return (
    <Container>
      <CategoryBar
        categories={categories}
        subCategories={subCategories}
        categoriesState={categoriesState}
      />
      <SortWrapper>
        <p>
          Total {totalDocs.toLocaleString()}
        </p>
        <BorderlessComboBox
          selectedItem={sortOption}
          items={Object.values(SORT_OPTIONS)}
          itemToId={(item) => item?._id || ''}
          itemToText={(item) => item?.name || ''}
          onChange={(value) => value && handleNavigate(value)}
        />
      </SortWrapper>
      <Products>
        {productsState === 'loading' && <LoadingSpinner />}
        {productsState !== 'loading' && products.length === 0 && <NoListPage />}
        {products.map((product) => (
          <Product key={product._id} product={product} user={user} />
        ))}
      </Products>
      <div id='more button' ref={moreRef} />
    </Container>
  );
}
