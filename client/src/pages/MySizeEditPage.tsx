import { useNavigate, useParams } from "react-router-dom";

import MySizeEditForm from "../components/mySize/MySizeEditForm";
import LoadingSpinner from "../components/ui/LoadingSpinner";

import useInitialData from "../hooks/useInitialData";
import useFetchProductForm from "../hooks/useFetchProductForm";

export default function MySizeEditPage() {
  const navigate = useNavigate();
  const params = useParams();
  const productId = String(params.id);

  const { state: productFormState } = useFetchProductForm({ productId });
  const {
    data: initialData,
    isLoading: initialDataIsLoading,
    isError: initialDataIsError,
    error,
  } = useInitialData();

  const loading =
    productFormState === "loading" || initialDataIsLoading === true;

  const handleComplete = () => {
    navigate(`/mysize`);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <MySizeEditForm initialData={initialData} onComplete={handleComplete} />
  );
}
