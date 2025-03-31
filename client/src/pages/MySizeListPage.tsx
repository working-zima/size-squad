import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import styled from "styled-components";

import AccessDeniedPage from "./AccessDeniedPage";

import CategoryBar from "../components/category/CategoryBar";
import ProductListSection from "../components/mySize/ProductListSection";

import { accessTokenUtil } from "../auth/accessTokenUtil";
import { productParamsStore } from "../stores/productParamsStore";

import useAuthStore from "../hooks/useAuthStore";

import { DEFAULT_PER } from "../constants/constants";

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

export default function MySizeListPage() {
  const [params] = useSearchParams();
  const categoryId = params.get("category1DepthCode") ?? undefined;
  const subCategoryId = params.get("category2DepthCode") ?? undefined;
  const sortCode = params.get("sortCode") ?? undefined;

  const [{ user }] = useAuthStore();

  useEffect(() => {
    if (user?._id) {
      productParamsStore.getState().setParams({
        keyword: "",
        categoryId,
        subCategoryId,
        sortCode,
        per: DEFAULT_PER,
        userId: user._id,
      });
    }
  }, [categoryId, subCategoryId, sortCode, user]);

  if (!accessTokenUtil.getAccessToken()) return <AccessDeniedPage />;

  return (
    <Container>
      <CategoryBar categoryId={categoryId} />
      <ProductListSection
        user={user}
        categoryId={categoryId}
        subCategoryId={subCategoryId}
      />
    </Container>
  );
}
