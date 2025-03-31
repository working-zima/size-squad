import styled from "styled-components";

import MainCategoryBar from "./MainCategoryBar";
import SubCategoryBar from "./SubCategoryBar";

import LoadingSpinner from "../ui/LoadingSpinner";

import useCategories from "../../hooks/useCategories";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  display: block;
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  height: 10.2rem;
  z-index: 1000;
  background-color: white;
`;

type CategoryBarProps = {
  categoryId: string | undefined;
};

export default function CategoryBar({ categoryId }: CategoryBarProps) {
  const { categories, allSubCategories, isLoading, isError, error } =
    useCategories();

  const subCategories = categoryId
    ? categories.find((category) => category._id === categoryId)
        ?.subCategories || []
    : allSubCategories;

  return (
    <Container>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <MainCategoryBar categories={categories} />
          <SubCategoryBar subCategories={subCategories} />
        </>
      )}
    </Container>
  );
}
