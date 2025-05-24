import { useNavigate } from 'react-router-dom';

import { accessTokenUtil } from '../auth/accessTokenUtil';
import MySizeNewForm from '../components/mySize/MySizeNewForm';
import LoadingSpinner from '../components/ui/LoadingSpinner';
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
    error: initialDataError,
  } = useInitialData();

  const error = initialDataIsError === true;
  const loading = userState === 'loading' || initialDataIsLoading === true;

  const handleComplete = () => {
    navigate('/mysize');
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
