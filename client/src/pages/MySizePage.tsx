import { useSearchParams } from 'react-router-dom';

import styled from 'styled-components';

import CategoryBar from '../components/category/CategoryBar';

import useFetchCategories from '../hooks/useFetchCategories';

const Container = styled.div`
  h2 {
    font-size: 2.4rem;
    font-weight: 500;
    line-height: 1.25;
    padding: 0 ${(props) => props.theme.sizes.contentPadding};
  }
`;

export default function MySizePage() {
  const [params] = useSearchParams();

  const categoryId = params.get('categoryId') ?? undefined;

  useFetchCategories({ categoryId });

  return (
    <Container>
      <CategoryBar />
      <h2>나의 사이즈</h2>
    </Container>
  );
}
