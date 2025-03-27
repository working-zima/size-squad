import { useNavigate, useSearchParams } from "react-router-dom";

import styled from "styled-components";

import AccessDeniedPage from "./AccessDeniedPage";
import ErrorPage from "./ErrorPage";
import NoListPage from "./NoListPage";

import CategoryBar from "../components/category/CategoryBar";
import Product from "../components/mySize/Product";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import BorderlessComboBox from "../components/ui/selectbox/BorderlessComboBox";

import { accessTokenUtil } from "../auth/accessTokenUtil";

import useCategories from "../hooks/useCategories";
import useAuthStore from "../hooks/useAuthStore";
import { useUserProducts } from "../hooks/useUserProducts";

import { SortOption } from "../types";
import { DEFAULT_PER, SORT_OPTIONS } from "../constants/constants";

const Container = styled.div`
  height: 100%;

  section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 10px;
    font-size: 1.3rem;
    line-height: 20px;
    color: ${(props) => props.theme.colors.unSelectedText};
  }
`;

const Products = styled.section`
  display: flex;
  flex-direction: column;
  margin: 0 10px;

  & > div:first-of-type {
    border: 0;
  }
`;

export default function MySizeListPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const categoryId = params.get("category1DepthCode") ?? undefined;
  const subCategoryId = params.get("category2DepthCode") ?? undefined;
  const sortCode = params.get("sortCode") ?? undefined;

  const [{ user }] = useAuthStore();

  const {
    categories,
    allSubCategories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
    error: errorCategories,
  } = useCategories();

  const userProductsParams = {
    keyword: "",
    categoryId,
    subCategoryId,
    sortCode,
    per: DEFAULT_PER,
    userId: user?._id,
  };

  const { data, sortOption, isLoading, isFetching, isError, error, moreRef } =
    useUserProducts(userProductsParams);
  const allProducts = data?.pages.flatMap((page) => page?.docs ?? []) ?? [];

  const subCategories = categoryId
    ? categories.find((category) => category._id === categoryId)
        ?.subCategories || []
    : allSubCategories;

  const handleNavigate = (sortOption: SortOption) => {
    const queryParams: string[] = [];
    if (categoryId) {
      queryParams.push(`category1DepthCode=${categoryId}`);
    }
    if (subCategoryId) {
      queryParams.push(`category2DepthCode=${subCategoryId}`);
    }
    queryParams.push(`sortCode=${sortOption.urlParam}`);
    const queryString = queryParams.join("&");
    const path = `/mysize${queryString ? `?${queryString}` : ""}`;
    navigate(path);
  };

  if (!accessTokenUtil.getAccessToken()) return <AccessDeniedPage />;
  if (isLoading) return <LoadingSpinner />;
  if (isError) {
    return <ErrorPage errorMessage={error?.message} />;
  }

  return (
    <Container>
      <CategoryBar
        categories={categories}
        subCategories={subCategories}
        isLoadingCategories={isLoadingCategories}
      />
      <section>
        <p>Total {data?.pages[0].totalDocs.toLocaleString() ?? 0}</p>
        <BorderlessComboBox
          selectedItem={sortOption}
          items={Object.values(SORT_OPTIONS)}
          itemToId={(item) => item?._id || ""}
          itemToText={(item) => item?.name || ""}
          onChange={(value) => value && handleNavigate(value)}
        />
      </section>
      <Products>
        {allProducts.map((product) => (
          <Product
            key={product._id}
            product={product}
            user={user}
            userProductsParams={userProductsParams}
          />
        ))}
        <div id="more button" ref={moreRef} />
        {isFetching && <LoadingSpinner />}
        {!isLoading && !isError && allProducts.length === 0 && (
          <NoListPage itemName={"사이즈"} itemLink={"/mysize/new"} />
        )}
      </Products>
    </Container>
  );
}
