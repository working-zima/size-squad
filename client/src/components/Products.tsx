import styled from 'styled-components';

import Product from './Product';

import { ProductResponse, Summary } from '../types';

const Container = styled.div`
  margin: 0 10px;

  h2 {
    margin-top: 0.8rem;
    font-size: 2.4rem;
    font-weight: 500;
    line-height: 1.25;
  }
`;

type ProductsProps = {
  subCategory: Summary;
  products: ProductResponse[];
}

export default function Products({ subCategory, products }: ProductsProps) {
  const filteredProduct = products.filter((product) => (
    product.subCategory && product.subCategory._id === subCategory._id
  ));

  return (
    !!filteredProduct.length && (
      <Container>
        {filteredProduct.map((product) => (
          <Product
            key={product._id}
            product={product}
          />
        ))}
      </Container>
    )
  );
}
