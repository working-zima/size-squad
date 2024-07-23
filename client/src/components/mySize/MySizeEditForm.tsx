import React, { useEffect } from 'react'

import styled from 'styled-components';

import MySizeNewBrand from '../mySize/MySizeNewBrand';
import MySizeNewName from '../mySize/MySizeNewName';
import MySizeNewCategory from '../mySize/MySizeNewCategory';
import MySizeNewGender from '../mySize/MySizeNewGender';
import MySizeNewSize from '../mySize/MySizeNewSize';
import MySizeNewFit from '../mySize/MySizeNewFit';
import MySizeNewMeasurements from '../mySize/MySizeNewMeasurements';
import MySizeNewDescription from '../mySize/MySizeNewDescription';

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
      <MySizeNewBrand />
      <MySizeNewName />
      <MySizeNewCategory />
      <MySizeNewGender />
      <MySizeNewSize />
      <MySizeNewFit />
      <MySizeNewMeasurements />
      <MySizeNewDescription />
      <ButtonWrapper>
        <Button type="submit" disabled={!product.valid}>
          등록
        </Button>
      </ButtonWrapper>
    </Form>
  </Container>
  )
}
