import styled from 'styled-components';

import Description from './Description';

import { ProductResponse } from '../types';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 60px;
  color: ${(props) => props.theme.colors.secondaryTextColor};
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
