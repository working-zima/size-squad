import styled from 'styled-components';

import SizeCard from './SizeCard';
import InfoCard from './InfoCard';

import { ProductResponse } from '../types';

import useViewModeStore from '../hooks/useViewModeStore';

const Container = styled.div`
  flex: 1 1 100%;
  padding: 1rem 0.1rem;
  font-size: 1.2rem;
  line-height: 1.5;
  border-bottom: 1px solid ${(props) => props.theme.colors.dividerColor};

  span {
    color: ${(props) => props.theme.colors.primaryBlack}
  }
`;

type ProductProps = {
  product: ProductResponse;
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
