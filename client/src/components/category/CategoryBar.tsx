import styled from 'styled-components';

import MainCategoryBar from './MainCategoryBar';
import SubCategoryBar from './SubCategoryBar';

import LoadingSpinner from '../ui/LoadingSpinner';

import { Category, Summary } from '../../types';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  display: block;
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  height: 10.2rem;
  z-index: 1000;
  background-color: white;
`;

type CategoryBarProps = {
  categories: Category[];
  subCategories: Summary[];
  categoriesState: 'loading' | 'fetched' | 'idle' | 'error';
}

export default function CategoryBar({
  categories, subCategories, categoriesState
}: CategoryBarProps) {

  return (
    <Container>
      {categoriesState === 'loading' ? (
        <LoadingSpinner />
      ) : (
        <>
          <MainCategoryBar categories={categories} />
          <SubCategoryBar subCategories={subCategories} />
        </>
      )}
    </Container>

  );
}
