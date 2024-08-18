import styled from 'styled-components';

import SizeCard from './SizeCard';
import InfoCard from './InfoCard';

import { ProductResponse } from '../types';

import useViewModeStore from '../hooks/useViewModeStore';
import { Link } from 'react-router-dom';
import { ConfirmTrigger } from './ui/modal/ModalTrigger';
import useProductsStore from '../hooks/useProductsStore';
import { useEffect, useState } from 'react';

const Container = styled.div`
  padding: 1rem 0.1rem;
  font-size: 1.3rem;
  line-height: 1.67;
  border-bottom: 1px solid ${(props) => props.theme.colors.dividerColor};
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  height: 30px;
`;

const Brand = styled.div`
  display: flex;
  flex: 3;
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

const Name = styled.div`
  flex: 6;
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
  display: flex;
  flex: 1;
  white-space: nowrap;
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

type ProductProps = {
  product: ProductResponse;
}

export default function Product({
  product,
}: ProductProps) {
  const [{ isDescriptionView }] = useViewModeStore();
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
        <Brand>
          <p><h3>{product.brand}</h3></p>
        </Brand>
        <Name>
          <p><strong>{product.name}</strong></p>
        </Name>
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
      {isDescriptionView
        ? (<InfoCard product={product} />)
        : (<SizeCard product={product} />)}
    </Container>
  );
}
