import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import ProductNewForm from '../ProductNewForm';

import useFetchCategories from '../../hooks/useFetchCategories';
import useProductFormStore from '../../hooks/useProductFormStore';

export default function MySizeNewPage() {
  const navigate = useNavigate();

  const { categories } = useFetchCategories()

  const [, store] = useProductFormStore();

  useEffect(() => {
    if (!categories.length) return;

    store.changeCategory(categories[0]);
  }, [store, categories]);

  const handleComplete = () => {
    navigate('/mySize');
  };

  return (
    <ProductNewForm onComplete={handleComplete}/>
  )
}
