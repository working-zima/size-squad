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

const Products = styled.div`
  margin: 0 10px;
`;

export default function HomePage() {
  useAccessToken();
  const { products, state: productsState, } = useFetchProducts({ per: 3 });
  const { user } = useFetchUserStore();

  return (
    <Container>
      <div>
        최근 올라온 사이즈
      </div>
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
