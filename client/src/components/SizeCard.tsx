import styled from 'styled-components';

import { MEASUREMENT_MESSAGES } from '../constants';

import { ProductResponse } from '../types';

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
  product: ProductResponse;
}

export default function SizeCard({ product }: SizeCardProps) {
  const values = Object.values(product.measurements);

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>
              사이즈 (CM)
            </th>
            {product.measurements.map((measurement) => (
              <th key={measurement._id}>
                {MEASUREMENT_MESSAGES[measurement.name]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>
              {product.size.name}
            </th>
            {values.map((value) => (
              <td key={value._id}>{value.value}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </Container>
  );
}
