import styled from 'styled-components';

import SizeCard from './SizeCard';
import InfoCard from './InfoCard';

import { Product } from '../types';

import useViewModeStore from '../hooks/useViewModeStore';

const Container = styled.div`
  flex: 1 1 100%;
  margin: 1rem 0;
  padding: 1rem ${(props) => props.theme.sizes.contentPadding};
  border-radius: 30px;
  background-color: ${(props) => props.theme.colors.dividerColor};
  font-size: 1.2rem;
  line-height: 1.5;

  span {
    color: ${(props) => props.theme.colors.primaryBlack}
  }
`;

type ProductProps = {
  product: Product;
}

export default function Product({
  product,
}: ProductProps) {
  const [{ isDescriptionView }] = useViewModeStore();

  return (
    <Container>
      {isDescriptionView
        ? (<InfoCard product={product} />)
        : (<SizeCard product={product} />)}
    </Container>
  );
}
