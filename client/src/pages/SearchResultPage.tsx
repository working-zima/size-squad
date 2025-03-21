import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import styled from "styled-components";

import NoListPage from "./NoListPage";
import ErrorPage from "./ErrorPage";
import AccessDeniedPage from "./AccessDeniedPage";

import SearchInput from "../components/searchInput/SearchInput";
import Product from "../components/mySize/Product";
import BorderlessComboBox from "../components/ui/selectbox/BorderlessComboBox";
import LoadingSpinner from "../components/ui/LoadingSpinner";

import { SortOption } from "../types";

import usePortal from "../hooks/usePortal";
import useProductsStore from "../hooks/useProductsStore";
import useFetchProducts from "../hooks/useFetchProducts";

import { SORT_OPTIONS } from "../constants/constants";

import { accessTokenUtil } from "../auth/accessTokenUtil";
import useAuthStore from "../hooks/useAuthStore";
import { useProducts } from "../hooks/useProducts";

const Container = styled.div`
  height: 100%;
`;

const SortWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  font-size: 1.3rem;
  line-height: 20px;
  color: ${(props) => props.theme.colors.unSelectedText};
`;

const Products = styled.div`
  margin: 0 10px;
`;

export default function SearchResultPage() {
  let [params] = useSearchParams();

  const [, store] = useProductsStore();
  const navigate = useNavigate();
  const query = params.get("query") || "";
  const sortCode = params.get("sortCode") ?? undefined;

  const {
    opened: headerOpened,
    openModal: openHeader,
    closeModal: hideHeader,
  } = usePortal();

  const {
    opened: bodyOpened,
    openModal: openBody,
    closeModal: hideBody,
  } = usePortal();

  const { data, isLoading, isFetching, isError, error, moreRef, sortOption } =
    useProducts({
      keyword: query,
      sortCode,
    });
  const [{ user }] = useAuthStore();

  const products = data?.pages.flatMap((p) => p.docs) ?? [];
  const totalDocs = data?.pages[0]?.totalDocs ?? 0;

  useEffect(() => {
    hideBody();
    openHeader();
  }, [query]);

  const handleNavigate = (sortOption: SortOption) => {
    const path = `/search?query=${query}&sortCode=${sortOption.urlParam}`;
    navigate(path);
  };

  if (!accessTokenUtil.getAccessToken()) return <AccessDeniedPage />;
  if (isError) {
    return <ErrorPage errorMessage={error?.message ?? "에러 발생"} />;
  }

  return (
    <Container>
      <SearchInput
        headerOpened={headerOpened}
        bodyOpened={bodyOpened}
        hideHeader={hideHeader}
        hideBody={hideBody}
        openBody={openBody}
      />
      <SortWrapper>
        <p>Total {totalDocs.toLocaleString()}</p>
        <BorderlessComboBox
          selectedItem={sortOption}
          items={Object.values(SORT_OPTIONS)}
          itemToId={(item) => item?._id || ""}
          itemToText={(item) => item?.name || ""}
          onChange={(value) => value && handleNavigate(value)}
        />
      </SortWrapper>
      <Products>
        {/* 첫 로딩 (데이터가 전혀 없을 때) */}
        {isLoading && <LoadingSpinner />}
        {/* 데이터는 있고, 추가 로딩 중 (무한스크롤 시) */}
        {!isLoading &&
          products.map((product) => (
            <Product key={product._id} product={product} user={user} />
          ))}
        {!isLoading && products.length === 0 && (
          <NoListPage itemName="사이즈" itemLink="/mysize/new" />
        )}
        {/* 추가 로딩 중일 때 아래에만 Spinner 표시 */}
        {isFetching && !isLoading && <LoadingSpinner />}
      </Products>
      <div id="more button" ref={moreRef} />
    </Container>
  );
}
