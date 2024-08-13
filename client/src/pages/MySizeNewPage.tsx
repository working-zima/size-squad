import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AccessDeniedPage from "./AccessDeniedPage";

import MySizeNewForm from "../components/mySize/MySizeNewForm";

import useAccessToken from "../hooks/useAccessToken";
import useFetchUser from "../hooks/useFetchUserStore";
import useFetchInitialData from "../hooks/useFetchInitialData";
import useProductFormStore from "../hooks/useProductFormStore";

export default function MySizeNewPage() {
  const navigate = useNavigate();

  const { accessToken } = useAccessToken();
  const { user } = useFetchUser()
  const { categories, fits, sizes } = useFetchInitialData()
  const [{ productId }, store] = useProductFormStore();

  useEffect(() => {
    store.reset();
  }, [])

  useEffect(() => {
    if (!categories[0]._id || productId) return;
    store.reset()

    store.changeCategory(categories[0]);
    store.changeSubCategory(categories[0].subCategories[0]);
    store.changeGender(user.gender);
    store.changeFit(fits[0]);

    const sizeList = sizes.filter(sizeElem => {
      return sizeElem.gender._id === user.gender._id
    });
    store.changeSize(sizeList[0]);

    categories[0].measurements.forEach((measurement, idx) => {
      store.addMeasurement();
      store.changeMeasurementAndId(idx, measurement._id, measurement.name);
    });

  }, [categories, user.gender, store])

  const handleComplete = () => {
    store.reset();
    navigate('/mysize');
  };

  if (!accessToken) {
    return (
      <AccessDeniedPage />
    );
  }

  return (
    <MySizeNewForm
      onComplete={handleComplete}
    />
  );
}
