import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import styled from "styled-components";

import AccessDeniedPage from "./AccessDeniedPage";
import ErrorPage from "./ErrorPage";
import NoListPage from "./NoListPage";

import Profile from "../components/mypage/Profile";
import Sort from "../components/mypage/Sort";
import Product from "../components/mySize/Product";
import LoadingSpinner from "../components/ui/LoadingSpinner";

import useFetchUser from "../hooks/useFetchUser";
import useFetchMyProducts from "../hooks/useFetchMyProducts";
import useFetchCategories from "../hooks/useFetchCategories";
import useAuthStore from "../hooks/useAuthStore";

import { accessTokenUtil } from "../auth/accessTokenUtil";
import { authService } from "../auth/AuthService";

const Container = styled.div`
  height: 100%;
`

const Products = styled.section`
  margin: 0 10px;

  & > div:first-of-type {
    border: 0;
  }
`;

export default function MyPage() {
  const navigate = useNavigate();
  const params = useParams();
  const [querys] = useSearchParams();
  const subCategoryId = querys.get('category2DepthCode') ?? undefined;
  const sortCode = querys.get('sortCode') ?? undefined;
  const [{ user: loginedUser }, authStore] = useAuthStore()
  const { allSubCategories } = useFetchCategories();

  const {
    user,
    errorMessage: userErrorMessage,
    isOwner,
    store: userStore
  } = useFetchUser({ id: params.id });

  const {
    products,
    subCategoryId: selectedSubCategoryId,
    sortOption,
    totalDocs,
    state: productsState,
    moreRef,
  } = useFetchMyProducts({ subCategoryId, sortCode, userId: user._id });

  const findCategoryById = (id: string) => {
    return [{ _id: '', name: 'all' }, ...allSubCategories]
      .find(subCategory => subCategory._id === id)
  };

  const handleNavigate = ({
    category2DepthCode, sortCode
  }: { category2DepthCode?: string, sortCode?: string }) => {
    const queryParams: string[] = [];

    const subCategoryParam = category2DepthCode === ''
      ? undefined
      : category2DepthCode || subCategoryId;
    const sortParam = sortCode || '';

    if (subCategoryParam) queryParams.push(`category2DepthCode=${subCategoryParam}`);
    if (sortParam) queryParams.push(`sortCode=${sortParam}`);

    const queryString = queryParams.join('&');
    const path = `/mypage/${params.id}/${queryString ? `?${queryString}` : ''}`;
    navigate(path);
  };

  const handleClickLogout = async () => {
    await authService.logout();
    accessTokenUtil.setAccessToken('')
    userStore.reset();
    authStore.reset();
    navigate('/');
  };

  if (!accessTokenUtil.getAccessToken()) return (<AccessDeniedPage />);
  if (productsState === 'error') {
    return (<ErrorPage errorMessage={userErrorMessage} />);
  }

  return (
    <Container>
      <Profile
        user={user}
        isOwner={isOwner}
        handleClickLogout={handleClickLogout}
      />
      <Sort
        totalDocs={totalDocs}
        allSubCategories={allSubCategories}
        selectedSubCategoryId={selectedSubCategoryId}
        sortOption={sortOption}
        findCategoryById={findCategoryById}
        handleNavigate={handleNavigate} />
      <Products>
        {products.map((product) => (
          <Product key={product._id} product={product} user={loginedUser} />
        ))}
        <div id='more button' ref={moreRef} />
        {productsState === 'loading' && <LoadingSpinner />}
        {productsState !== 'loading' && products.length === 0 && <NoListPage />}
      </Products>
    </Container>
  )
}
