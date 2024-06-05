import styled from 'styled-components';

import Product from './Product';

import { SubCategoryList } from '../types';

import useProductsStore from '../hooks/useProductsStore';

const Container = styled.div`
    h2 {
    font-size: 2.4rem;
    font-weight: 500;
    line-height: 1.25;
    padding: 0.8rem ${(props) => props.theme.sizes.contentPadding};
    margin-bottom: 0.8rem;
  }
`;

const SectionDivider = styled.div`
  height: 10px;
  background-color: ${(props) => props.theme.colors.lineColor};
`;

type ProductsProps = {
  subCategory: SubCategoryList;
}

export default function Products({ subCategory }: ProductsProps) {
  const [{ products }] = useProductsStore();

  const filteredProduct = products.filter(
    (product) => (product.subCategory === subCategory),
  );

  return (
    <Container>
      <SectionDivider />
      <h2>{subCategory}</h2>
      {filteredProduct.map((product) => (
        <Product key={subCategory} product={product} />
      ))}
    </Container>
  );
}
