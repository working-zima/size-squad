import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SignUpForm from "../components/signUp/SignUpForm";

import useSignupFormStore from "../hooks/useSignupFormStore";
import useFetchGender from "../hooks/useFetchGenders";
import ErrorPage from "./ErrorPage";

export default function SignupPage() {
  const navigate = useNavigate();

  const [{ accessToken }, store] = useSignupFormStore();

  const { genders, error, errorMessage, loading } = useFetchGender();

  useEffect(() => {
    store.reset();
    store.changeGender(genders[0]);
  }, []);

  useEffect(() => {
    if (accessToken) {
      store.reset();
      navigate('/signup/complete');
    }
  }, [accessToken]);

  if (error) {
    return (
      <ErrorPage errorMessage={errorMessage}/>
    );
  }

  if (loading) {
    return (
      <p>Loading...</p>
    );
  }

  return (
    <SignUpForm genders={genders}/>
  )
}
