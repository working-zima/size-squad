import { useNavigate, useParams } from 'react-router-dom';

import MySizeEditForm from '../components/mySize/MySizeEditForm';
import LoadingSpinner from '../components/ui/LoadingSpinner';

import useFetchInitialData from '../hooks/useFetchInitialData';
import useFetchProductForm from '../hooks/useFetchProductForm';

export default function MySizeEditPage() {
  const navigate = useNavigate();
  const params = useParams();
  const productId = String(params.id)

  const { state: productFormState } = useFetchProductForm({ productId });
  const { state: initialDataState } = useFetchInitialData();

  const loading = productFormState === 'loading'
    || initialDataState === 'loading';

  const handleComplete = () => {
    navigate(`/mysize`);
  };

  if (loading) return (<LoadingSpinner />);

  return (
    <MySizeEditForm onComplete={handleComplete} />
  );
}
