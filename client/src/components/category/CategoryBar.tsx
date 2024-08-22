import styled from 'styled-components';

import MainCategoryBar from './MainCategoryBar';
import SubCategoryBar from './SubCategoryBar';

import { Category, Summary } from '../../types';
import LoadingSpinner from '../ui/LoadingSpinner';

const Container = styled.div`
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
  categoriesLoading: boolean;
}

export default function CategoryBar({
  categories, subCategories, categoriesLoading
}: CategoryBarProps) {

  return (
    <Container>
      {categoriesLoading ? (
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
