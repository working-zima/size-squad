import { Link } from 'react-router-dom';

import styled from 'styled-components';

import Description from './Description';

import { Product, ProductResponse } from '../types';
import useProductFormStore from '../hooks/useProductFormStore';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
`;

const EditDeleteWrapper = styled.div`
  font-weight: bold;
  -webkit-tap-highlight-color: transparent;

  .edit-link {
    color: ${(props) => props.theme.colors.primaryBlack};
    margin-right: 1rem;
  }

  .delete-link {
    color: ${(props) => props.theme.colors.primaryRed};
    margin-right: 1rem;
  }
`;

type InfoCardProps = {
  product: ProductResponse;
}

export default function InfoCard({ product }: InfoCardProps) {
  const [, store] = useProductFormStore();
  const handleEditClick = () => {
    store.setProduct(product);
  };

  return (
    <Container>
      <InfoContainer>
        <DetailWrapper>
          <h3>
            {product.brand}
          </h3>
          <strong>
            {product.name}
          </strong>
        </DetailWrapper>
        <EditDeleteWrapper>
          <Link
            to={`/mysize/${product._id}/edit`}
            className="edit-link"
            onClick={handleEditClick}
          >
            수정
          </Link>
          <Link to="/mysize" className="delete-link">
            삭제
          </Link>
        </EditDeleteWrapper>
      </InfoContainer>
      <Description product={product} />
    </Container>
  );
}
