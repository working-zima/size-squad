import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AccessDeniedPage from "./AccessDeniedPage";

import MySizeNewForm from "../components/mySize/MySizeNewForm";

import useAccessToken from "../hooks/useAccessToken";
import useFetchUser from "../hooks/useFetchUserStore";
import useFetchInitialData from "../hooks/useFetchInitialData";
import useProductFormStore from "../hooks/useProductFormStore";
import LoadingSpinner from "../components/ui/LoadingSpinner";

export default function MySizeNewPage() {
  const navigate = useNavigate();

  const { accessToken } = useAccessToken();
  const { user, state: userState } = useFetchUser()
  const {
    categories, fits, sizes, state: initialDataState
  } = useFetchInitialData()
  const [{ product }, store] = useProductFormStore();

  const loading = userState === 'loading' || initialDataState === 'loading';

  useEffect(() => {
    store.reset();
  }, [])

  useEffect(() => {
    if (!categories[0]._id || product._id || !user.gender) return;
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

  if (loading) {
    return <LoadingSpinner />;
  }

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
