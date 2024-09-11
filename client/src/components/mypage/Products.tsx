import styled from "styled-components";
import LoadingSpinner from "../ui/LoadingSpinner";
import NoListPage from "../../pages/NoListPage";
import Product from "../mySize/Product";
import { ApiState, ProductResponse, User } from "../../types";

const Container = styled.div`
  margin: 0 10px;

  & > div:first-of-type {
    border: 0;
  }
`;

type ProductsProps = {
  productsState: ApiState;
  products: ProductResponse[];
  LoginUser: User;
}

export default function Products({
  productsState, products, LoginUser
}: ProductsProps) {
  return (
    <Container>
      {productsState === 'loading' && <LoadingSpinner />}
      {productsState !== 'loading' && products.length === 0 && <NoListPage />}
      {products.map((product) => (
        <Product key={product._id} product={product} user={LoginUser} />
      ))}
    </Container>
  )
}