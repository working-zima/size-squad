import { useNavigate, useParams } from 'react-router-dom';

import MySizeEditForm from '../components/mySize/MySizeEditForm';

import useFetchInitialData from '../hooks/useFetchInitialData';
import useFetchProductForm from '../hooks/useFetchProductForm';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function MySizeEditPage() {
  const navigate = useNavigate();
  const params = useParams();
  const productId = String(params.id)

  const { loading: productFormLoading } = useFetchProductForm({ productId });
  const { loading: initialDataLoading } = useFetchInitialData();

  const loading = productFormLoading || initialDataLoading;

  const handleComplete = () => {
    navigate(`/mysize`);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <MySizeEditForm onComplete={handleComplete}/>
  );
}
