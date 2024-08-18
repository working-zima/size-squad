import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import Description from './Description';

import { ConfirmTrigger } from './ui/modal/ModalTrigger';

import { ProductResponse } from '../types';

import useProductsStore from '../hooks/useProductsStore';

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
  text-align: left;
  word-break: break-all;
  overflow: auto hidden;
  white-space: nowrap;
  scrollbar-width: none;

  h3 {
    font-weight: bold;
    margin-right: 1rem;
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

  .delete-link > button:first-of-type {
    color: ${(props) => props.theme.colors.primaryRed};
    font-weight: bold;
    font-size: 1.2rem;
    margin-right: 1rem;
  }
`;

type InfoCardProps = {
  product: ProductResponse;
}

export default function InfoCard({ product }: InfoCardProps) {
  const [confirmed, setConfirmed] = useState<boolean | null>(null)
  const [, store] = useProductsStore();

  useEffect(() => {
    if (!!confirmed) {
      store.deleteAndFetchProducts(product._id);
    }
  }, [confirmed]);

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
          >
            수정
          </Link>
          <Link
            to="/mysize"
            className="delete-link"
          >
            <ConfirmTrigger
              title={'사이즈 삭제'}
              buttonText={'삭제'}
              confirmed={confirmed}
              setConfirmed={setConfirmed}
            >
              <p>정말로 삭제하시겠습니까?</p>
            </ConfirmTrigger>
          </Link>
        </EditDeleteWrapper>
      </InfoContainer>
      <Description product={product} />
    </Container>
  );
}
