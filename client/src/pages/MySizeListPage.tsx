import { useSearchParams } from 'react-router-dom';

import styled from 'styled-components';

import AccessDeniedPage from './AccessDeniedPage';
import ErrorPage from './ErrorPage';
import NoListPage from './NoListPage';

import CategoryBar from '../components/category/CategoryBar';
import Products from '../components/Products';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import BorderlessComboBox from '../components/ui/selectbox/BorderlessComboBox';

import useAccessToken from '../hooks/useAccessToken';
import useFetchCategories from '../hooks/useFetchCategories';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

const options = [
  { _id: '1', name: '수정순' },
  { _id: '2', name: '이름순' }
]

const Container = styled.div`
  height: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  font-size: 1.4rem;
  color: ${props => props.theme.colors.unSelectedText};
`

export default function MySizeListPage() {
  const { accessToken } = useAccessToken();

  const [params] = useSearchParams();
  const categoryId = params.get('category1DepthCode') ?? undefined;
  const subCategoryId = params.get('category2DepthCodes') ?? undefined;

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
  } = useInfiniteScroll({ categoryId, subCategoryId });

  const subCategories = categoryId
    ? categories.find(category => category._id === categoryId)?.subCategories || []
    : allSubCategories;

  if (!accessToken) return <AccessDeniedPage />;
  if (productsState === 'error') {
    return <ErrorPage errorMessage={errorMessage} />
  }

  return (
    <Container>
      <CategoryBar
        categories={categories}
        subCategories={subCategories}
        categoriesState={categoriesState}
      />
      <Wrapper>
        <p>
          Total
        </p>
        <BorderlessComboBox
          selectedItem={options[0]}
          items={options}
          itemToId={() => options[0]._id}
          itemToText={() => options[0].name}
          onChange={() => { }}
        />
      </Wrapper>
      {subCategories.map(subCategory => (
        <Products
          key={subCategory._id}
          subCategory={subCategory}
          products={products}
        />
      ))}
      <div id='more button' ref={moreRef} />
      {productsState === 'loading' && <LoadingSpinner />}
      {products.length === 0 && <NoListPage />}
    </Container>
  );
}
