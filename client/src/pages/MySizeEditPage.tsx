import { useNavigate, useParams } from "react-router-dom";

import AccessDeniedPage from "./AccessDeniedPage";
import ErrorPage from "./ErrorPage";

import MySizeEditForm from "../components/mySize/MySizeEditForm";
import LoadingSpinner from "../components/ui/LoadingSpinner";

import useInitialData from "../hooks/useInitialData";

import { accessTokenUtil } from "../auth/accessTokenUtil";
import useProduct from "../hooks/useProduct";

export default function MySizeEditPage() {
  const navigate = useNavigate();
  const params = useParams();
  const productId = String(params.id);
  const {
    data: productData,
    isLoading: isPrductLoading,
    isError: isProductError,
    error: productError,
  } = useProduct(productId);
  console.log(`productData: `, productData);
  const {
    data: initialData,
    isLoading: initialDataIsLoading,
    isError: initialDataIsError,
    error: initialDataError,
  } = useInitialData();

  const loading = isPrductLoading === true || initialDataIsLoading === true;

  const handleComplete = () => {
    navigate(`/mysize`);
  };

  if (!accessTokenUtil.getAccessToken()) return <AccessDeniedPage />;
  if (loading) return <LoadingSpinner />;
  if (isProductError) return <ErrorPage errorMessage={productError?.message} />;
  if (initialDataIsError)
    return <ErrorPage errorMessage={initialDataError?.message} />;
  // TODO: NotFoundPage 만들기
  // if (!productData)
  //   return <NotFoundPage message="상품 정보를 찾을 수 없습니다." />;
  if (!productData)
    return <ErrorPage errorMessage={"사이즈 정보를 찾을 수 없습니다."} />;

  return (
    <MySizeEditForm
      initialData={initialData}
      productData={productData}
      onComplete={handleComplete}
    />
  );
}
