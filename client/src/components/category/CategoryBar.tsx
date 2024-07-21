import styled from 'styled-components';

import MainCategoryBar from './MainCategoryBar';
import SubCategoryBar from './SubCategoryBar';

import useCategoriesStore from '../../hooks/useCategoriesStore';
import { Category, Summary } from '../../types';

const Container = styled.div`
  position: sticky;
  top: 0%;
  height: 10.2rem;
  z-index: 1000;
  background-color: white;
`;

type CategoryBarProps = {
  categories: Category[];
  subCategories: Summary[];
}

export default function CategoryBar({
    categories, subCategories
  }: CategoryBarProps) {

  return (
    <Container>
      <MainCategoryBar categories={categories} />
      <SubCategoryBar subCategories={subCategories} />
    </Container>

  );
}
