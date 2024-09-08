import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";

import styled from "styled-components";

import AccessDeniedPage from "./AccessDeniedPage";
import ErrorPage from "./ErrorPage";
import NoListPage from "./NoListPage";

import Product from "../components/mySize/Product";
import LineClampedText from "../components/ui/LineClamp";
import Button from "../components/ui/Button";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import BorderlessComboBox from "../components/ui/selectbox/BorderlessComboBox";

import useAccessToken from "../hooks/useAccessToken";
import useFetchUser from "../hooks/useFetchUser";
import useFetchProducts from "../hooks/useFetchProducts";
import useFetchCategories from "../hooks/useFetchCategories";

import { apiService } from "../services/ApiService";

import { GENDER_MESSAGES, SORT_OPTIONS, SUBCATEGORY_MESSAGES } from "../constants";

const Container = styled.div`
  overflow: hidden;
`

const ProfileWrapper = styled.div`
  font-size: 1.3rem;
  line-height: ${(props) => props.theme.sizes.lineHeight};
  padding: ${props => props.theme.sizes.contentPadding};
  padding-bottom: 0;
  border-bottom: 1px solid ${props => props.theme.colors.dividerColor};
`

const UserSummary = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 500;
  margin-bottom: 4px;

  div {
    font-size: 1.4rem;
  }

  span {
    padding: 4px 0;
    font-weight: 400;
    color: ${props => props.theme.colors.unSelectedText};
  }
`

const Description = styled.div`
  font-weight: 500;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 14px 0;

  button {
    width: 100%;
    height: 34px;
    padding: 0;
    margin-left: 4px;
    background-color: ${props => props.theme.colors.primaryWhite};
    color: ${props => props.theme.colors.primaryBlack};
    border: 1px solid ${(props) => props.theme.colors.buttonBorderColor};
    border-radius: 4px;
    -webkit-tap-highlight-color: transparent;
  }

  & > button:first-of-type {
      margin-left: 0px;
  }
`

const ButtonLike = styled.div`
  width: 100%;
  height: 100%;
  height: 34px;
  padding: 0;
  margin-right: 4px;
  font-size: 1.4rem;
  background-color: ${props => props.theme.colors.primaryWhite};
  color: ${props => props.theme.colors.primaryBlack};
  border: 1px solid ${(props) => props.theme.colors.buttonBorderColor};
  border-radius: 4px;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
`

const SortWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  font-size: 1.3rem;
  line-height: 20px;
  color: ${props => props.theme.colors.unSelectedText};
`

const ComboBoxWrapper = styled.div`
  display: flex;
  gap: 12px;
`

const Products = styled.div`
  margin: 0 10px;
`;

export default function MyPage() {
  const navigate = useNavigate();
  const params = useParams();

  const [querys] = useSearchParams();
  const subCategoryId = querys.get('category2DepthCode') ?? undefined;
  const sortCode = querys.get('sortCode') ?? undefined;

  const { accessToken, setAccessToken } = useAccessToken();
  const { allSubCategories } = useFetchCategories();
  const {
    user,
    state,
    errorMessage: userErrorMessage,
    isOwner,
    store: userStore
  } = useFetchUser({ id: params.id });
  const {
    products,
    state: productsState,
    selectedSubCategoryId,
    totalDocs,
    sortOption,
    store: productStore
  } = useFetchProducts({ subCategoryId, sortCode });

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
    await apiService.logout();
    setAccessToken('');
    userStore.reset();
    navigate('/');
  };

  if (state === 'loading') {
    return <LoadingSpinner />;
  }

  if (!accessToken) {
    return <AccessDeniedPage />;
  }

  if (state === 'error') {
    return (<ErrorPage errorMessage={userErrorMessage} />);
  }

  return (
    <Container>
      <ProfileWrapper>
        <UserSummary>
          <div>{user?.name}</div>
          <span>
            {user?.height}cm / {user.weight}kg · {GENDER_MESSAGES[user.gender?.name]}
          </span>
        </UserSummary>
        <Description>
          <LineClampedText
            text={[user.description
              ? user.description
              : '간단한 체형 정보를 적어보세요'
            ]}
            lines={1}
          />
        </Description>
        <ButtonWrapper>
          {isOwner &&
            <>
              <ButtonLike>
                <Link to={`/mypage/${user._id}/edit`}>
                  회원정보 변경
                </Link>
              </ButtonLike>
              <Button onClick={handleClickLogout}>
                로그아웃
              </Button>
            </>
          }
        </ButtonWrapper>
      </ProfileWrapper>
      <SortWrapper>
        <p>
          Total {totalDocs.toLocaleString()}
        </p>
        <ComboBoxWrapper>
          <BorderlessComboBox
            selectedItem={findCategoryById(selectedSubCategoryId)}
            items={[{ _id: '', name: 'all' }, ...allSubCategories]}
            itemToId={(item) => item?._id || ''}
            itemToText={(item) => SUBCATEGORY_MESSAGES[item?.name || '']}
            onChange={(value) => {
              return value && handleNavigate({ category2DepthCode: value._id })
            }}
          />
          <BorderlessComboBox
            selectedItem={sortOption}
            items={Object.values(SORT_OPTIONS)}
            itemToId={(item) => item?._id || ''}
            itemToText={(item) => item?.name || ''}
            onChange={(value) => {
              return value && handleNavigate({ sortCode: value.urlParam })
            }}
          />
        </ComboBoxWrapper>
      </SortWrapper>
      <Products>
        {productsState === 'loading' && <LoadingSpinner />}
        {productsState !== 'loading' && products.length === 0 && <NoListPage />}
        {products.map((product) => (
          <Product key={product._id} product={product} user={user} />
        ))}
      </Products>
    </Container>
  )
}
