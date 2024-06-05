import { useSearchParams } from 'react-router-dom';

import styled from 'styled-components';
import CategoryBar from '../components/category/CategoryBar';
import Products from '../components/Products';

import useFetchCategories from '../hooks/useFetchCategories';
import useCategoriesStore from '../hooks/useCategoriesStore';
import useFetchProducts from '../hooks/useFetchProducts';

const Container = styled.div`
  padding-bottom: 24px;
`;

export default function MySizeListPage() {
  const [params] = useSearchParams();
  const categoryId = params.get('categoryId') ?? undefined;
  const subCategoryId = params.get('subCategoryId') ?? undefined;

  useFetchCategories({ categoryId });
  useFetchProducts({ categoryId, subCategoryId });

  const [{ subCategories }] = useCategoriesStore();

  return (
    <Container>
      <CategoryBar />
      {subCategories.map((subCategory) => (
        <Products key={subCategory} subCategory={subCategory} />
      ))}
    </Container>
  );
}
