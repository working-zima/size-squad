import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AccessDeniedPage from "./AccessDeniedPage";

import MySizeNewForm from "../components/mySize/MySizeNewForm";

import useFetchCategories from "../hooks/useFetchCategories"
import useProductFormStore from "../hooks/useProductFormStore";
import useAccessToken from "../hooks/useAccessToken";
import useFetchGender from "../hooks/useFetchGenders";
import useFetchUser from "../hooks/useFetchUser";
import useFetchFits from "../hooks/useFetchFits";

import { nullFitSummary, nullGender } from "../nullObject";

export default function MySizeNewPage() {
  const navigate = useNavigate();

  const { accessToken } = useAccessToken();

  const { categories } = useFetchCategories()
  const { genders } = useFetchGender();
  const { gender } = useFetchUser()
  const { fits } = useFetchFits()

  const [, store] = useProductFormStore();

  const addNullObjectGenders = [nullGender, ...genders]
  const addNullObjectFits = [nullFitSummary, ...fits]

  useEffect(() => {
    if (!categories.length) return;
    if (!!gender._id) store.changeGender(gender);

    store.changeCategory(categories[0]);
    store.changeSubCategory(categories[0].subCategories[0]);
  }, [store, categories]);

  const handleComplete = () => {
    navigate('/mysize');
  };

  if (!categories.length) {
    return null;
  }

  if (!accessToken) {
    return (
      <AccessDeniedPage />
    );
  }

  return (
    <MySizeNewForm
      categories={categories}
      genders={addNullObjectGenders}
      fits={addNullObjectFits}
      onComplete={handleComplete}
    />
  );
}
