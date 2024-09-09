import { FormEvent, MouseEvent } from 'react'

import styled from 'styled-components';

import MySizeBrandInput from '../mySize/MySizeBrandInput';
import MySizeNameInput from './MySizeNameInput';
import MySizeCategoryBox from './MySizeCategoryBox';
import MySizeGenderBox from './MySizeGenderBox';
import MySizeSizeBox from './MySizeSizeBox';
import MySizeFitBox from './MySizeFitBox';
import MySizeMeasurementsInput from './MySizeMeasurementsInput';
import MySizeDescriptionInput from './MySizeDescriptionInput';

import useProductFormStore from '../../hooks/useProductFormStore';

import Button from '../ui/Button';
import { AlertModal } from '../ui/modal/ModalComponents';
import useModal from '../../hooks/useModal';

const Container = styled.div`
  padding: 20px ${props => props.theme.sizes.contentPadding} 0;
  user-select: none;

  h2 {
    display: none;
  }
`;

const Form = styled.form`
  & > div {
    margin-top: 0.8rem;
  }

  & > div:first-of-type {
    margin-top: 0;

    label {
      margin-top: 0;
    }
  }
`

const ButtonWrapper = styled.div`
  button {
    margin: 40px 0 20px 0;
    width: 100%;
    height: 48px;
    background-color: ${props => props.theme.colors.primaryBlack};
    color: ${props => props.theme.colors.primaryWhite};
    font-size: 1.6rem;
    font-weight: 600;
    border-color: ${props => props.theme.colors.primaryBlack};
    border-radius: 6px;

    &:disabled {
      background-color: ${props => props.theme.colors.unSelectedText};
    }
  }
`

type MySizeEditFormProps = {
  onComplete: () => void;
}

export default function MySizeEditForm({ onComplete }: MySizeEditFormProps) {
  const [{ product, valid, errorMessage }, store] = useProductFormStore();
  const { modalRef, openModal, closeModal } = useModal();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await store.update();
      store.reset();
      onComplete();
    } catch (error) {
      openModal();
    }
  };

  const handleConfirm = (event?: MouseEvent) => {
    if (event) event.preventDefault();
    store.reset();
    closeModal();
  };

  return (
    <Container>
      <h2>Edit Size</h2>
      <Form onSubmit={handleSubmit}>
        <MySizeBrandInput maxLength={29} />
        <MySizeNameInput maxLength={29} />
        <MySizeCategoryBox />
        <MySizeGenderBox
          gender={product.gender}
          changeGender={(value) => store.changeGender(value)}
        />
        <MySizeSizeBox />
        <MySizeMeasurementsInput />
        <MySizeFitBox />
        <MySizeDescriptionInput />
        <ButtonWrapper>
          <Button type="submit" disabled={!valid}>
            등록
          </Button>
        </ButtonWrapper>
      </Form>
      <AlertModal modalRef={modalRef} hide={handleConfirm}>
        <p>수정 실패</p>
        <p>{errorMessage}</p>
      </AlertModal>
    </Container>
  )
}
