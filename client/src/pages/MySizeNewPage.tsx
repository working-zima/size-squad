import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AccessDeniedPage from "./AccessDeniedPage";

import MySizeNewForm from "../components/mySize/MySizeNewForm";

import useAccessToken from "../hooks/useAccessToken";
import useFetchUser from "../hooks/useFetchUser";
import useFetchInitialData from "../hooks/useFetchInitialData";
import useProductFormStore from "../hooks/useProductFormStore";

export default function MySizeNewPage() {
  const navigate = useNavigate();

  const { accessToken } = useAccessToken();
  const { gender } = useFetchUser()
  const { categories, genders, fits, sizes } = useFetchInitialData()
  const [{ productId }, store] = useProductFormStore();

  useEffect(() => {
    store.reset();
  }, [])

  useEffect(() => {
    if (!categories[0]._id || productId) return;
    store.reset()

    store.changeCategory(categories[0]);
    store.changeGender(gender);
    store.changeFit(fits[0]);

    const sizeList = sizes.filter(sizeElem => {
      return sizeElem.gender._id === gender._id
    });
    store.changeSize(sizeList[0]);

    categories[0].measurements.forEach((measurement, idx) => {
      store.addMeasurement();
      store.changeMeasurementAndId(idx, measurement._id, measurement.name);
    });



  }, [categories, gender, store])

  // useEffect(() => {
  //   if (!categories[0]._id && !gender._id) return;

  //   const {_id, name, type, subCategories} = categories[0];
  //   store.changeCategory({ _id, name });
  //   store.changeSubCategory(subCategories[0])
  //   store.changeType(type);
  //   store.changeGender(gender);

  //   const sizeList = sizes
  //     .filter(sizeElem => (
  //       sizeElem.gender._id === gender._id && sizeElem.type._id === type._id
  //     ));
  //   store.changeSize({_id: sizeList[0]?._id, name: sizeList[0]?.name});

  //   store.changeFit(fits[2]);

  //   store.resetMeasurements()
  //   categories[0].measurements.forEach((measurement, idx) => {
  //     store.addMeasurement();
  //     store.changeMeasurementAndId(idx, measurement._id, measurement.name);
  //   });
  // }, [store, categories, genders, fits, sizes, gender]);

  const handleComplete = () => {
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
