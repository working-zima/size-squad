import { useEffect } from "react";
import SignUpForm from "../components/signUp/SignUpForm";

import useSignupFormStore from "../hooks/useSignupFormStore";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const navigate = useNavigate();

  const [{ accessToken }, store] = useSignupFormStore();

  useEffect(() => {
    if (accessToken) {
      store.reset();
      navigate('/signup/complete');
    }
  }, [accessToken]);

  return (
    <SignUpForm />
  )
}
