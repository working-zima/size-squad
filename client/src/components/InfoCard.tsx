import styled from 'styled-components';

import { ProductResponse } from '../types';
import LineClampedText from './ui/LineClamp';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 71px;
  color: ${(props) => props.theme.colors.secondaryTextColor};
`;

type InfoCardProps = {
  product: ProductResponse;
}

export default function InfoCard({ product }: InfoCardProps) {

  return (
    <Container>
      {/* <Description product={product} /> */}
      <LineClampedText
        text={[product.description
          ? product.description
          : '기억해둘 메모를 적어보세요'
        ]}
        lines={3}
      />
    </Container>
  );
}
