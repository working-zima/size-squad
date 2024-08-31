import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import styled from 'styled-components';

import NoListPage from './NoListPage';
import ErrorPage from './ErrorPage';

import SearchInput from '../components/SearchInput';
import Product from '../components/mySize/Product';
import BorderlessComboBox from '../components/ui/selectbox/BorderlessComboBox';
import LoadingSpinner from '../components/ui/LoadingSpinner';

import { SortOption } from '../types';

import usePortal from '../hooks/usePortal';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import useProductsStore from '../hooks/useProductsStore';

import { SORT_OPTIONS } from '../constants';
import useAccessToken from '../hooks/useAccessToken';
import AccessDeniedPage from './AccessDeniedPage';

const Container = styled.div`
  height: 100%;
`

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

export default function SearchResultPage() {
  const { accessToken } = useAccessToken();
  const [, store] = useProductsStore();

  const navigate = useNavigate();

  let [params] = useSearchParams();
  const query = params.get('query') || '';
  const sortCode = params.get('sortCode') ?? undefined;

  const {
    opened: headerOpened,
    openModal: openHeader,
    closeModal: hideHeader
  } = usePortal();

  const {
    opened: bodyOpened,
    openModal: openBody,
    closeModal: hideBody
  } = usePortal();

  const {
    products,
    errorMessage,
    moreRef,
    state: productsState,
    sortOption,
    totalDocs
  } = useInfiniteScroll({ keyword: query, sortCode });

  useEffect(() => {
    openHeader();
    store.changeKeyword(query);
  }, [query])

  const handleNavigate = (sortOption: SortOption) => {
    const path = `/search?query=${query}&sortCode=${sortOption.urlParam}`;
    navigate(path);
  }

  if (!accessToken) return <AccessDeniedPage />;

  return (
    <Container>
      <SearchInput
        headerOpened={headerOpened}
        bodyOpened={bodyOpened}
        hideHeader={hideHeader}
        hideBody={hideBody}
        openBody={openBody}
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
        {products.map(product => (
          <Product
            key={product._id}
            product={product}
          />
        ))}
        {products.length === 0 && productsState === 'error' && <NoListPage />}
        {productsState === 'error' && <ErrorPage errorMessage={errorMessage} />}
      </Products>
      <div id='more button' ref={moreRef} />
    </Container>
  )
}
