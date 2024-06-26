import styled from 'styled-components';

import Product from './Product';

import { SubCategorySummary } from '../types';

import useProductsStore from '../hooks/useProductsStore';

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
}

export default function Products({ subCategory }: ProductsProps) {
  const [{ products }] = useProductsStore();

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
        <Product
          key={product._id}
          product={product}
        />
      ))}
    </Container>
    )
  );
}
