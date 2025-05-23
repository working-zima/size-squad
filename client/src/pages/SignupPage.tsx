import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import SignUpForm from '../components/signUp/SignUpForm';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import useFetchGender from '../hooks/useGenders';
import useSignupFormStore from '../hooks/useSignupFormStore';
import ErrorPage from './ErrorPage';

export default function SignupPage() {
  const navigate = useNavigate();

  const [{ accessToken }, store] = useSignupFormStore();
  const { genders, isLoading, isError, error } = useFetchGender();

  useEffect(() => {
    if (genders.length > 0) {
      store.reset();
      store.changeGender(genders[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genders.length]);

  useEffect(() => {
    if (accessToken) {
      store.reset();
      navigate('/signup/complete');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  if (isError) return <ErrorPage errorMessage={error?.message} />;
  if (isLoading) return <LoadingSpinner />;

  return <SignUpForm genders={genders} />;
}
