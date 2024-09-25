import { Dispatch, SetStateAction } from 'react'
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { ConfirmTrigger } from '../ui/modal/ModalTrigger';

import { ProductResponse } from '../../types';

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;
  white-space: nowrap;
  font-weight: 500;
  font-size: 1.3rem;
  -webkit-tap-highlight-color: transparent;
  user-select: none;

  .edit-link {
    color: ${(props) => props.theme.colors.primaryBlack};
    margin-right: 1rem;
  }

  .delete-link > button:first-of-type {
    color: ${(props) => props.theme.colors.primaryRed};
    font-weight: 500;
    font-size: 1.3rem;
    padding-right: 0;
  }
`;

type EditDeleteButtonsProps = {
  product: ProductResponse;
  confirmed: boolean | null
  setConfirmed: Dispatch<SetStateAction<boolean | null>>;
}

export default function EditDeleteButtons({
  product, confirmed, setConfirmed
}: EditDeleteButtonsProps) {
  return (
    <Container>
      <Link
        to={`/mysize/${product._id}/edit`}
        className="edit-link"
      >
        수정
      </Link>
      <div className="delete-link">
        <ConfirmTrigger
          title={'사이즈 삭제'}
          buttonText={'삭제'}
          confirmed={confirmed}
          setConfirmed={setConfirmed}
        >
          <p>정말로 삭제하시겠습니까?</p>
        </ConfirmTrigger>
      </div>
    </Container>
  )
}
