import { useNavigate } from 'react-router-dom';

import { accessTokenUtil } from '../auth/accessTokenUtil';
import MySizeNewForm from '../components/product/ProductNewForm';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { ROUTES } from '../constants/pageRoutes';
import useAuthStore from '../hooks/useAuthStore';
import useInitialData from '../hooks/useInitialData';
import AccessDeniedPage from './AccessDeniedPage';
import ErrorPage from './ErrorPage';

export default function ProductCreatePage() {
  const navigate = useNavigate();
  const [{ user, state: userState }] = useAuthStore();

  const {
    data: initialData,
    isLoading: initialDataIsLoading,
    isError: initialDataIsError,
    error: initialDataError,
  } = useInitialData();

  const error = initialDataIsError === true;
  const loading = userState === 'loading' || initialDataIsLoading === true;

  const handleComplete = () => {
    navigate(ROUTES.PRODUCT_LIST);
  };

  if (loading) return <LoadingSpinner />;
  if (!accessTokenUtil.getAccessToken() || !user._id) {
    return <AccessDeniedPage />;
  }
  if (error) {
    return <ErrorPage errorMessage={initialDataError?.message} />;
  }

  return (
    <MySizeNewForm
      initialData={initialData}
      user={user}
      onComplete={handleComplete}
    />
  );
}
