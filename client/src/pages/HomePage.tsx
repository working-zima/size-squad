import styled from "styled-components";

import NoListPage from "./NoListPage";

import Product from "../components/mySize/Product";
import LoadingSpinner from "../components/ui/LoadingSpinner";

import useAccessToken from "../hooks/useAccessToken";
import useFetchProducts from "../hooks/useFetchProducts";
import useFetchUserStore from "../hooks/useFetchUserStore";

const Container = styled.div`
  margin-bottom: 40px;
`

const Title = styled.div`
  font-size: 2.4rem;
  font-weight: 500;
  padding: 2rem 1rem 1.6rem 1rem;
`

const Products = styled.div`
  margin: 0 10px;
  border: 1px solid ${props => props.theme.colors.borderColor};
  border-width: 1px 0;
  border-radius: 2px;
  height: 260px;
  overflow-y: scroll;

  scrollbar-width: none; // 파이어폭스
  -ms-overflow-style: none; // 인터넷 익스플로러
  &::-webkit-scrollbar {
    display: none; // 크롬, 사파리, 오페라, 엣지
  }
`;

export default function HomePage() {
  useAccessToken();
  const { products, state: productsState, } = useFetchProducts({ per: 10 });
  const { user } = useFetchUserStore();

  return (
    <Container>
      <Title>
        <p>최근 등록된 사이즈</p>
      </Title>
      <Products>
        {productsState === 'loading' && <LoadingSpinner />}
        {productsState !== 'loading' && products.length === 0 && <NoListPage />}
        {productsState !== 'loading' &&
          products.length > 0 &&
          products.map((product) => (
            <Product key={product._id} product={product} user={user} />
          ))}
      </Products>
    </Container>
  );
}
