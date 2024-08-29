import { useSearchParams } from 'react-router-dom';

import SearchInput from '../components/SearchInput';

import usePortal from '../hooks/usePortal';
import { useEffect } from 'react';
import styled from 'styled-components';
import BorderlessComboBox from '../components/ui/selectbox/BorderlessComboBox';
import { SORT_OPTIONS } from '../constants';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Product from '../components/mySize/Product';
import NoListPage from './NoListPage';
import ErrorPage from './ErrorPage';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

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
  let [searchParams] = useSearchParams();

  const {
    opened: headerOpened,
    openModal: openHeader,
    closeModal: closeHeader
  } = usePortal();
  const {
    opened: bodyOpened,
    openModal: openBody,
    closeModal: closeBody
  } = usePortal();

  const {
    products,
    errorMessage,
    moreRef,
    state: productsState,
    sortOption,
    totalDocs
  } = useInfiniteScroll({});

  useEffect(() => {
    openHeader();
  }, [])

  const handleNavigate = (value: any) => { }

  return (
    <Container>
      <SearchInput
        headerOpened={headerOpened}
        bodyOpened={bodyOpened}
        hideHeader={closeHeader}
        hideBody={closeBody}
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
        {products.length === 0 && <NoListPage />}
        {productsState === 'error' && <ErrorPage errorMessage={errorMessage} />}
      </Products>
      <div id='more button' ref={moreRef} />
    </Container>
  )
}
