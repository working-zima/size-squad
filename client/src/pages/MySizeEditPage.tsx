import { useNavigate, useParams } from 'react-router-dom';

import MySizeEditForm from '../components/mySize/MySizeEditForm';

import useFetchProductForm from '../hooks/useFetchProductForm';
import useFetchInitialData from '../hooks/useFetchInitialData';

export default function MySizeEditPage() {
  const navigate = useNavigate();

  const params = useParams();
  const productId = String(params.id);

  useFetchInitialData()
  const { product } = useFetchProductForm({ productId })

  const handleComplete = () => {
    // navigate(`/products/${productId}`);
  };

  if (product.loading) {
    return (
      <p>Loading...</p>
    );
  }

  return (
    <MySizeEditForm onComplete={handleComplete}/>
  );
}
