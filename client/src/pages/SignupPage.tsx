import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SignUpForm from "../components/signUp/SignUpForm";

import useSignupFormStore from "../hooks/useSignupFormStore";
import useFetchGender from "../hooks/useFetchGenders";

import { nullGender } from "../nullObject";

export default function SignupPage() {
  const navigate = useNavigate();

  const [{ accessToken }, store] = useSignupFormStore();

  const { genders, error, loading } = useFetchGender();

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

  if (loading) {
    return (
      <p>Loading...</p>
    );
  }

  if (error) {
    return (
      <p>Error!</p>
    );
  }

  return (
    <SignUpForm genders={genders}/>
  )
}
