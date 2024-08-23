import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ErrorPage from "./ErrorPage";

import SignUpForm from "../components/signUp/SignUpForm";
import LoadingSpinner from "../components/ui/LoadingSpinner";

import useSignupFormStore from "../hooks/useSignupFormStore";
import useFetchGender from "../hooks/useFetchGenders";

export default function SignupPage() {
  const navigate = useNavigate();

  const [{ accessToken }, store] = useSignupFormStore();
  const { genders, errorMessage, state } = useFetchGender();

  useEffect(() => {
    store.reset();
    store.changeGender(genders[0]);
  }, [genders]);

  useEffect(() => {
    if (accessToken) {
      store.reset();
      navigate('/signup/complete');
    }
  }, [accessToken]);

  if (state === 'error') return (<ErrorPage errorMessage={errorMessage} />);
  if (state === 'loading') return (<LoadingSpinner />);

  return (<SignUpForm genders={genders} />)
}
