import styled from 'styled-components';

import ProductComponent from './Product';

import { Product, ProductResponse, SubCategorySummary } from '../types';

import { key } from '../utils';

const Container = styled.div`
    h2 {
    margin-bottom: 0.8rem;
    font-size: 2.4rem;
    font-weight: 500;
    line-height: 1.25;
  }
`;

const SectionDivider = styled.div`
  height: 10px;
  background-color: ${(props) => props.theme.colors.lineColor};
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: sticky;
  padding: 0.8rem ${(props) => props.theme.sizes.contentPadding};

  button {
    margin-bottom: 0.8rem;
    padding: 0;
    border: none;
    color: ${(props) => props.theme.colors.unSelectedText};
  }
`;

type ProductsProps = {
  subCategory: SubCategorySummary;
  products: ProductResponse[];
}

export default function Products({ subCategory, products }: ProductsProps) {
  const filteredProduct = products.filter(
    (product) => (product.subCategoryId._id === subCategory._id),
  );

  return (
    !!filteredProduct.length && (
    <Container>
      <SectionDivider />
      <Wrapper>
        <h2>{subCategory.subCategory}</h2>
      </Wrapper>
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
