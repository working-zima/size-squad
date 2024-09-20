import styled from 'styled-components';
import { FIT, MEASUREMENT } from '../../constants/apiLocalizationMap';
import { ProductResponse } from '../../types';

type ContainerProps = {
  columnsCount: number;
}

const Container = styled.div<ContainerProps>`
  display: grid;
  grid-template-columns: repeat(${props => props.columnsCount + 1}, 1fr);
  grid-template-rows: auto auto;
  align-items: center;
  overflow-x: auto;
  font-size: 1.2rem;
  min-height: 71px;
  color: ${props => props.theme.colors.secondaryTextColor};
  white-space: nowrap;
  border-radius: 3px;
`;

type CellProps = {
  gridColumn: number;
  gridRow: number;
}

const Cell = styled.div<CellProps>`
  display: grid;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  font-weight: 500;
  position: ${props => (props.gridColumn === 1 ? 'sticky' : 'static')};
  left: ${props => (props.gridColumn === 1 ? '0' : 'auto')};
  z-index: ${props => (props.gridColumn === 1 ? '1' : 'auto')};
  background-color: ${props => (props.gridRow === 1
    ? props.theme.colors.backgroundColor
    : props.theme.colors.primaryWhite
  )};
  grid-row: ${props => props.gridRow};
  grid-column: ${props => props.gridColumn};
`;

type SizeCardProps = {
  product: ProductResponse;
}

export default function SizeCard({ product }: SizeCardProps) {
  const values = Object.values(product.measurements);

  return (
    <Container columnsCount={product.measurements.length}>
      <Cell
        gridColumn={1}
        gridRow={1}
      >
        {FIT[product.fit.name]}핏 (cm)
      </Cell>
      {product.measurements.map((measurement, index) => (
        <Cell
          key={measurement._id}
          gridColumn={2 + index}
          gridRow={1}
        >
          {MEASUREMENT[measurement.name]}
        </Cell>
      ))}

      <Cell
        gridColumn={1}
        gridRow={2}
      >
        {product.size.name}
      </Cell>
      {values.map((value, index) => (
        <Cell
          key={value._id}
          gridColumn={2 + index}
          gridRow={2}
        >
          {value.value}
        </Cell>
      ))}
    </Container>
  );
}
