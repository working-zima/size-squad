import { useNavigate, useParams } from 'react-router-dom';

import MySizeEditForm from '../components/mySize/MySizeEditForm';

import useFetchInitialData from '../hooks/useFetchInitialData';
import useProductFormStore from '../hooks/useProductFormStore';
import useFetchProductForm from '../hooks/useFetchProductForm';

export default function MySizeEditPage() {
  const navigate = useNavigate();
  const params = useParams();
  const productId = String(params.id)

  useFetchProductForm({ productId });
  useFetchInitialData();
  const [{ loading }] = useProductFormStore();

  const handleComplete = () => {
    navigate(`/mysize`);
  };

  if (loading) {
    return (
      <p>Loading...</p>
    );
  }

  return (
    <MySizeEditForm onComplete={handleComplete}/>
  );
}
