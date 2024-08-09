import styled from 'styled-components';

import ProductComponent from './Product';

import { ProductResponse, Summary } from '../types';

import { SUBCATEGORY_MESSAGES } from '../constants';

const Container = styled.div`
  margin: 0 10px;

  h2 {
    margin-bottom: 0.8rem;
    font-size: 2.4rem;
    font-weight: 500;
    line-height: 1.25;
  }
`;

const SubCategoryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: sticky;
  padding: 0.8rem 0 0 0;

  button {
    margin-bottom: 0.8rem;
    padding: 0;
    border: none;
    color: ${(props) => props.theme.colors.unSelectedText};
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
      <SubCategoryWrapper>
        <h2>{SUBCATEGORY_MESSAGES[subCategory.name]}</h2>
      </SubCategoryWrapper>
      {filteredProduct.map((product) => (
        <ProductComponent
          key={product._id}
          product={product}
        />
      ))}
    </Container>
    )
  );
}
