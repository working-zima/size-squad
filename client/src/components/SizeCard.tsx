import styled from 'styled-components';

import { MEASUREMENT_MESSAGES } from '../constants';

import { Product } from '../types';

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 5.4rem;
  overflow: auto hidden;
  white-space: nowrap;
  scrollbar-width: none;

  table {
    thead {
      border-bottom: 1px solid ${(props) => props.theme.colors.borderColor};
    }

    th {
      vertical-align: middle;
      width: 68px;
      min-width: 68px;
      height: 30px;
      background-color: ${(props) => props.theme.colors.dividerColor};

      &:first-child {
        position: sticky;
        left: 0px;
        border-right: 1px solid ${(props) => props.theme.colors.borderColor};
      }
    }

    td {
      vertical-align: middle;
      text-align: center;
    }
  }
`;

type SizeCardProps = {
  product: Product;
}

export default function SizeCard({ product }: SizeCardProps) {
  const keys = Object.keys(product.measurements);
  const values = Object.values(product.measurements);

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>
              사이즈 (CM)
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
    </Container>
  );
}
