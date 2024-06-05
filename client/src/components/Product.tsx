import styled from 'styled-components';

import { Product } from '../types';

import { MEASUREMENT_MESSAGES } from '../constants';

const Container = styled.div`
  flex: 1 1 100%;
  margin: 1rem 0;
  padding: 1rem ${(props) => props.theme.sizes.contentPadding};
  line-height: 1.5;
  background-color: ${(props) => props.theme.colors.dividerColor};
  border-radius: 30px;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.2rem;
  text-align: left;
  word-break: break-all;
  overflow: auto hidden;
  white-space: nowrap;
  scrollbar-width: none;

  h3 {
    font-weight: bold;
  }

  strong {
    font-weight: bold;
    color: ${(props) => props.theme.colors.secondaryTextColor}
  }

  span {
    color: ${(props) => props.theme.colors.secondaryTextColor}
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SizeWrapper = styled.div`
  display: flex;
  width: 100%;
  overflow: auto hidden;
  font-size: 1.2rem;
  white-space: nowrap;
  scrollbar-width: none;

  table {


    thead {
      border-bottom: 1px solid ${(props) => props.theme.colors.tertiaryGrey};
    }

    th {
      vertical-align: middle;
      width: 68px;
      min-width: 68px;
      height: 30px;
      background-color: ${(props) => props.theme.colors.lineColor};

      &:first-child {
        position: sticky;
        left: 0px;
        border-right: 1px solid ${(props) => props.theme.colors.tertiaryGrey};
      }
    }

    td {
      vertical-align: middle;
      text-align: center;
    }
  }
`;

type ProductProps = {
  product: Product;
}

export default function Product({
  product,
}: ProductProps) {
  const keys = Object.keys(product.measurements);
  const values = Object.values(product.measurements);

  return (
    <Container>
      <InfoContainer>
        <DetailWrapper>
          <h3>
            {product.brand}
            {' '}
            -
            {' '}
            {product.name}
          </h3>
          <strong>{product.description}</strong>
        </DetailWrapper>
        <ButtonWrapper>
          <button type="submit">수정</button>
          <button type="submit">삭제</button>
        </ButtonWrapper>
      </InfoContainer>
      <SizeWrapper>
        <table>
          <thead>
            <tr>
              <th>
                {product.fits.name}
              </th>
              {keys.map((key) => (
                <th key={key}>{MEASUREMENT_MESSAGES[key]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                {product.size}
              </th>
              {values.map((value) => (
                <td key={value}>{value}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </SizeWrapper>
    </Container>
  );
}
