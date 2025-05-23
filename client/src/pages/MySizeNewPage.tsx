// import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { accessTokenUtil } from '../auth/accessTokenUtil';
import MySizeNewForm from '../components/mySize/MySizeNewForm';
import LoadingSpinner from '../components/ui/LoadingSpinner';
// import useProductFormStore from "../hooks/useProductFormStore";
import useAuthStore from '../hooks/useAuthStore';
import useInitialData from '../hooks/useInitialData';
import AccessDeniedPage from './AccessDeniedPage';
import ErrorPage from './ErrorPage';

export default function MySizeNewPage() {
  const navigate = useNavigate();
  const [{ user, state: userState }] = useAuthStore();

  const {
    data: initialData,
    isLoading: initialDataIsLoading,
    isError: initialDataIsError,
    error,
  } = useInitialData();
  // const [{ product }, store] = useProductFormStore();

  const loading = userState === 'loading' || initialDataIsLoading === true;

  // useEffect(() => {
  //   store.reset();
  // }, []);

  // useEffect(() => {
  //   if (!initialData || product._id || !user.gender) {
  //     return;
  //   }
  //   store.reset();

  //   store.changeCategory(initialData.categories[0]);
  //   store.changeSubCategory(initialData.categories[0].subCategories[0]);
  //   store.changeGender(user.gender);
  //   store.changeFit(initialData.fits[0]);

  //   const sizeList = initialData.sizes.filter((sizeElem: any) => {
  //     return sizeElem.gender._id === user.gender._id;
  //   });
  //   store.changeSize(sizeList[0]);

  //   initialData.categories[0].measurements.forEach(
  //     (measurement: any, idx: any) => {
  //       store.addMeasurement();
  //       store.changeMeasurementAndId(idx, measurement._id, measurement.name);
  //     }
  //   );
  // }, [initialData, user.gender, store]);

  const handleComplete = () => {
    // store.reset();
    navigate('/mysize');
  };

  if (loading) return <LoadingSpinner />;
  if (!accessTokenUtil.getAccessToken() || !user._id)
    return <AccessDeniedPage />;
  if (initialDataIsError === true)
    return <ErrorPage errorMessage={error?.message} />;

  return (
    <MySizeNewForm
      initialData={initialData}
      user={user}
      onComplete={handleComplete}
    />
  );
}
