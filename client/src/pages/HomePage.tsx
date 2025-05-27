import styled from 'styled-components';

import Product from '../components/product/Product';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { Carousel } from '../components/ui/Slide/Carousel';
import UserCard from '../components/UserCard';
import useAuthStore from '../hooks/useAuthStore';
import { useProducts } from '../hooks/useProducts';
import useUsers from '../hooks/useUsers';
import ErrorPage from './ErrorPage';
import NoListPage from './NoListPage';

const Container = styled.div`
  margin-bottom: 80px;
  word-break: keep-all;
`;

const Title = styled.div`
  padding: 4rem 1rem 1.6rem 1rem;
  user-select: none;

  h2 {
    font-size: 3.6rem;
    font-weight: 500;
  }

  p {
    margin-top: 3.2rem;
    font-size: 2rem;
    color: ${(props) => props.theme.colors.secondaryTextColor};
  }
`;

const Cards = styled.div`
  margin: 4rem 10px 10rem 10px;
  border-width: 1px 0;
  border-radius: 2px;
  height: 180px;

  scrollbar-width: none; // 파이어폭스
  -ms-overflow-style: none; // 인터넷 익스플로러
  &::-webkit-scrollbar {
    display: none; // 크롬, 사파리, 오페라, 엣지
  }
`;

export default function HomePage() {
  const {
    data,
    isLoading: isProductsLoading,
    isError: isProductsError,
    error: productsError,
  } = useProducts({});
  const allProducts = data?.pages.flatMap((page) => page.docs) ?? [];
  const [{ user }] = useAuthStore();
  const {
    users,
    isLoading: isUsersLoading,
    isError: isUsersError,
    error: usersError,
  } = useUsers({ page: 1 });

  const userList = users?.docs ?? [];

  return (
    <Container>
      <Title>
        <h2>새로운 인사이트</h2>
        <p>
          최근 공유된 사이즈 정보를 확인하고, 다양한 핏과 스타일링 팁도
          얻어보세요.
        </p>
      </Title>
      <Cards>
        {isProductsLoading && <LoadingSpinner />}
        {isProductsError && (
          <ErrorPage
            errorMessage={
              productsError?.message ?? '상품을 불러올 수 없습니다.'
            }
          />
        )}
        {!isProductsLoading && !isProductsError && allProducts.length === 0 && (
          <NoListPage itemName="사이즈" itemLink="/mysize/new" />
        )}
        {!isProductsLoading && !isProductsError && allProducts.length > 0 && (
          <Carousel
            items={allProducts}
            renderItem={(item) => (
              <Product key={item._id} product={item} user={user} />
            )}
          />
        )}
      </Cards>
      <Title>
        <h2>새로운 얼굴들</h2>
        <p>
          새로 가입한 멤버를 소개합니다! 비슷한 사이즈의 멤버를 찾아 스타일을
          참고해보세요.
        </p>
      </Title>
      <Cards>
        {isUsersLoading && <LoadingSpinner />}
        {isUsersError && (
          <ErrorPage
            errorMessage={
              usersError?.message ?? '유저 목록을 불러올 수 없습니다.'
            }
          />
        )}
        {!isUsersLoading && !isUsersError && userList.length === 0 && (
          <NoListPage itemName="멤버" itemLink="/signup" />
        )}
        {!isUsersLoading && !isUsersError && userList.length > 0 && (
          <Carousel
            items={userList}
            renderItem={(item) => <UserCard key={item._id} user={item} />}
          />
        )}
      </Cards>
    </Container>
  );
}
