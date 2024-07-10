import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SignUpForm from "../components/signUp/SignUpForm";

import useSignupFormStore from "../hooks/useSignupFormStore";
import useFetchGender from "../hooks/useFetchGender";

import { nullGender } from "../nullObject";

export default function SignupPage() {
  const navigate = useNavigate();

  const [{ accessToken }, store] = useSignupFormStore();

  const { genderList, error, loading } = useFetchGender();
  const addNullObjectGenderList = [nullGender, ...genderList]

  useEffect(() => {
    store.reset();
    store.changeGender(nullGender);
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
    <SignUpForm genderList={addNullObjectGenderList}/>
  )
}
