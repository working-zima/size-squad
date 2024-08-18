import styled from 'styled-components';

import Description from './Description';

import { ProductResponse } from '../types';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

type InfoCardProps = {
  product: ProductResponse;
}

export default function InfoCard({ product }: InfoCardProps) {

  return (
    <Container>
      <Description product={product} />
    </Container>
  );
}
