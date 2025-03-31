import { useNavigate, useSearchParams } from "react-router-dom";

import styled from "styled-components";

import NoListPage from "../../pages/NoListPage";

import Product from "./Product";
import { useUserProducts } from "../../hooks/useUserProducts";

import LoadingSpinner from "../ui/LoadingSpinner";
import BorderlessComboBox from "../ui/selectbox/BorderlessComboBox";

import { SortOption, User } from "../../types";
import { SORT_OPTIONS } from "../../constants/constants";

const Section = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  font-size: 1.3rem;
  line-height: 20px;
  color: ${(props) => props.theme.colors.unSelectedText};
`;

const Products = styled.section`
  display: flex;
  flex-direction: column;
  margin: 0 10px;

  & > div:first-of-type {
    border: 0;
  }
`;

type ProductListSectionProps = {
  user: User;
  categoryId: string | undefined;
  subCategoryId: string | undefined;
};

export default function ProductListSection({
  user,
  categoryId,
  subCategoryId,
}: ProductListSectionProps) {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const { data, sortOption, isLoading, isFetching, isError, error, moreRef } =
    useUserProducts();

  const allProducts = data?.pages.flatMap((page) => page?.docs ?? []) ?? [];

  const handleNavigate = (sortOption: SortOption) => {
    const currentSortCode = params.get("sortCode") ?? undefined;
    const currentCategoryId = params.get("category1DepthCode") ?? undefined;
    const currentSubCategoryId = params.get("category2DepthCode") ?? undefined;
    const isSame =
      currentSortCode === sortOption.urlParam &&
      currentCategoryId === categoryId &&
      currentSubCategoryId === subCategoryId;
    if (isSame) return;

    const queryParams: string[] = [];
    if (categoryId) queryParams.push(`category1DepthCode=${categoryId}`);
    if (subCategoryId) queryParams.push(`category2DepthCode=${subCategoryId}`);
    queryParams.push(`sortCode=${sortOption.urlParam}`);
    const queryString = queryParams.join("&");
    const path = `/mysize${queryString ? `?${queryString}` : ""}`;
    navigate(path);
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>{error?.message}</p>;

  return (
    <>
      <Section>
        <p>Total {data?.pages[0].totalDocs.toLocaleString() ?? 0}</p>
        <BorderlessComboBox
          selectedItem={sortOption}
          items={Object.values(SORT_OPTIONS)}
          itemToId={(item) => item?._id || ""}
          itemToText={(item) => item?.name || ""}
          onChange={(value) => value && handleNavigate(value)}
        />
      </Section>
      <Products>
        {allProducts.map((product) => (
          <Product key={product._id} product={product} user={user} />
        ))}
        {!isFetching && <div id="more button" ref={moreRef} />}
        {isFetching && <LoadingSpinner />}
        {!isLoading && !isError && allProducts.length === 0 && (
          <NoListPage itemName={"사이즈"} itemLink={"/mysize/new"} />
        )}
      </Products>
    </>
  );
}
