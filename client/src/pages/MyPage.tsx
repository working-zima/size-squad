import { useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { accessTokenUtil } from '../auth/accessTokenUtil';
import { authService } from '../auth/AuthService';
import Profile from '../components/mypage/Profile';
import Sort from '../components/mypage/Sort';
import Product from '../components/mySize/Product';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import useAuthStore from '../hooks/useAuthStore';
import useCategories from '../hooks/useCategories';
import useUser from '../hooks/useUser';
import { useUserProducts } from '../hooks/useUserProducts';
import AccessDeniedPage from './AccessDeniedPage';
import ErrorPage from './ErrorPage';
import NoListPage from './NoListPage';

const Container = styled.div`
  height: 100%;
`;

const Products = styled.section`
  margin: 0 10px;

  & > div:first-of-type {
    border: 0;
  }
`;

export default function MyPage() {
  // 컴포넌트 함수 내부에서
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const params = useParams();
  const [querys] = useSearchParams();
  const subCategoryId = querys.get('category2DepthCode') ?? undefined;
  const [{ user: loginedUser }, authStore] = useAuthStore();
  const {
    allSubCategories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
    error: errorCategories,
  } = useCategories();

  const {
    user,
    isOwner,
    isError: isErrorUser,
  } = useUser({
    id: params.id,
  });

  const {
    data,
    sortOption,
    isLoading: isProductsLoading,
    isFetching: isProductsFetching,
    isError: isProductsError,
    moreRef,
  } = useUserProducts();
  const allProducts = data?.pages.flatMap((page) => page?.docs ?? []) ?? [];

  const findCategoryById = (id: string) => {
    return [{ _id: '', name: 'all' }, ...allSubCategories].find(
      (subCategory) => subCategory._id === id,
    );
  };

  const isError = isErrorCategories || isErrorUser;
  const errorMessage = errorCategories?.message;

  const handleNavigate = ({
    category2DepthCode,
    sortCode,
  }: {
    category2DepthCode?: string;
    sortCode?: string;
  }) => {
    const queryParams: string[] = [];

    const subCategoryParam =
      category2DepthCode === ''
        ? undefined
        : category2DepthCode || subCategoryId;
    const sortParam = sortCode || '';

    if (subCategoryParam)
      queryParams.push(`category2DepthCode=${subCategoryParam}`);
    if (sortParam) queryParams.push(`sortCode=${sortParam}`);

    const queryString = queryParams.join('&');
    const path = `/mypage/${params.id}/${queryString ? `?${queryString}` : ''}`;
    navigate(path);
  };

  const handleClickLogout = async () => {
    await authService.logout();
    accessTokenUtil.setAccessToken('');
    await queryClient.invalidateQueries({ queryKey: ['user'] });
    authStore.reset();
    navigate('/');
  };

  if (!accessTokenUtil.getAccessToken()) return <AccessDeniedPage />;
  if (isError)
    return (
      <ErrorPage
        errorMessage={
          errorMessage || '데이터를 불러오는 중 문제가 발생했습니다.'
        }
      />
    );

  if (!user) return null;
  if (!user || typeof isOwner === 'undefined') return null;

  return (
    <Container>
      <Profile
        user={user}
        isOwner={isOwner}
        handleClickLogout={handleClickLogout}
      />
      <Sort
        totalDocs={Number(data?.pages[0].totalDocs)}
        allSubCategories={allSubCategories}
        selectedSubCategoryId={subCategoryId}
        sortOption={sortOption}
        isLoadingCategories={isLoadingCategories}
        findCategoryById={findCategoryById}
        handleNavigate={handleNavigate}
      />
      <Products>
        {allProducts.map((product) => (
          <Product key={product._id} product={product} user={loginedUser} />
        ))}
        <div id="more button" ref={moreRef} />
        {isProductsFetching && <LoadingSpinner />}
        {!isProductsLoading && !isProductsError && allProducts.length === 0 && (
          <NoListPage itemName={'사이즈'} itemLink={'/mysize/new'} />
        )}
      </Products>
    </Container>
  );
}
