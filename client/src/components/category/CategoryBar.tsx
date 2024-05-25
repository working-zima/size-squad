import styled from 'styled-components';

import MainCategoryBar from './MainCategoryBar';
import SubCategoryBar from './SubCategoryBar';

import useCategoriesStore from '../../hooks/useCategoriesStore';

const Container = styled.div`
  position: sticky;
  top: 0%;
  height: 10.2rem;
  z-index: 100;
`;

export default function CategoryBar() {
  const [{ categories, subCategories }] = useCategoriesStore();

  return (
    <Container>
      <MainCategoryBar categories={categories} />
      <SubCategoryBar subCategories={subCategories} />
    </Container>

  );
}
