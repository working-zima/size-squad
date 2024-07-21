import { useEffect } from 'react';

import styled from 'styled-components';

import MySizeNewBrand from './MySizeNewBrand';
import MySizeNewName from './MySizeNewName';
import MySizeNewCategory from './MySizeNewCategory';
import MySizeNewGender from './MySizeNewGender';
import MySizeNewSize from './MySizeNewSize';
import MySizeNewFit from './MySizeNewFit';
import MySizeNewMeasurements from './MySizeNewMeasurements';
import MySizeNewDescription from './MySizeNewDescription';

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

type MySizeNewFormProps = {
  onComplete: () => void;
}

export default function MySizeNewForm({ onComplete }: MySizeNewFormProps) {
  const [
    { category: selectedCategory, error, done, valid }, store
  ] = useProductFormStore();

  useEffect(() => {
    if (done) {
      onComplete();
    }
  }, [done]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await store.create();
  };

  return (
    <Container>
      <h2>New Product</h2>
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
          <Button type="submit" disabled={!valid}>
            등록
          </Button>
        </ButtonWrapper>
      </Form>
    </Container>
  )
}
