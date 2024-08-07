import React, { useEffect } from 'react'

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
  const [product, store] = useProductFormStore();
  console.log(product.valid)
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await store.update();
  };

  useEffect(() => {
    if (product.done) {
      store.reset();
      onComplete();
    }
  }, [product.done]);

  return (
    <Container>
    <h2>Edit Size</h2>
    <Form onSubmit={handleSubmit}>
      <MySizeBrandInput />
      <MySizeNameInput />
      <MySizeCategoryBox />
      <MySizeGenderBox />
      <MySizeSizeBox />
      <MySizeFitBox />
      <MySizeMeasurementsInput />
      <MySizeDescriptionInput />
      <ButtonWrapper>
        <Button type="submit" disabled={!product.valid}>
          등록
        </Button>
      </ButtonWrapper>
    </Form>
  </Container>
  )
}
