import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ErrorPage from "./ErrorPage";

import SignUpForm from "../components/signUp/SignUpForm";
import LoadingSpinner from "../components/ui/LoadingSpinner";

import useSignupFormStore from "../hooks/useSignupFormStore";
import useFetchGender from "../hooks/useGenders";

export default function SignupPage() {
  const navigate = useNavigate();

  const [{ accessToken }, store] = useSignupFormStore();
  const { genders, isLoading, isError, error } = useFetchGender();

  useEffect(() => {
    if (genders.length > 0) {
      store.reset();
      store.changeGender(genders[0]);
    }
  }, [genders.length]);

  useEffect(() => {
    if (accessToken) {
      store.reset();
      navigate("/signup/complete");
    }
  }, [accessToken]);

  if (isError) return <ErrorPage errorMessage={error?.message} />;
  if (isLoading) return <LoadingSpinner />;

  return <SignUpForm genders={genders} />;
}
