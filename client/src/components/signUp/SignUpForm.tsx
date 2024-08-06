import { useEffect } from "react";

import styled from "styled-components";

import Button from "../ui/Button";

import useAccessToken from "../../hooks/useAccessToken";
import useSignupFormStore from "../../hooks/useSignupFormStore";

import { Summary } from "../../types";

import { RequiredStar } from "../../utils/RequiredStar";

import SignUpEmailInput from "./SignUpEmailInput";
import SignUpNameInput from "./SignUpNameInput";
import SignUpPasswords from "./SignUpPasswords";
import SignUpGenderInput from "./SignUpGenderInput";
import SignUpHeightInput from "./SignUpHeightInput";
import SignUpWeightInput from "./SignUpWeightInput";
import SignUpDescriptionInput from "./SignUpDescriptionInput";

const Container = styled.div`
  padding: 20px ${props => props.theme.sizes.contentPadding} 0;
  user-select: none;

  h2 {
    display: none;
  }

  & > div:first-of-type {
    display: flex;
    flex-direction: row-reverse;
    font-size: 1.4rem;
    color: ${props => props.theme.colors.unSelectedText};
    ${RequiredStar('after')}
  }
`;

const Form = styled.form`
  & > div {
    margin-top: 0.8rem;
  }

  & > div:first-of-type {
    margin-top: 0;

    label {
      margin-top: 0;
    }
  }
`

const ButtonWrapper = styled.div`
  button {
    margin: 40px 0 20px 0;
    width: 100%;
    height: 48px;
    background-color: ${props => props.theme.colors.primaryBlack};
    color: ${props => props.theme.colors.primaryWhite};
    font-size: 1.6rem;
    font-weight: 600;
    border-color: ${props => props.theme.colors.primaryBlack};
    border-radius: 6px;

    &:disabled {
      background-color: ${props => props.theme.colors.unSelectedText};
    }
  }
`

type SignUpFormProps = {
  genders: Summary[];
}

export default function SignUpForm({ genders }: SignUpFormProps){
  const { setAccessToken } = useAccessToken();

  const [{ valid, error, accessToken }, store] = useSignupFormStore();

  useEffect(() => {
    if (accessToken) {
      setAccessToken(accessToken);
    }
  }, [accessToken]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    store.signup();
  };

  return (
    <Container>
      <h2>회원가입</h2>
      <div>필수항목</div>
      <Form onSubmit={handleSubmit}>
        <SignUpEmailInput />
        <SignUpNameInput />
        <SignUpPasswords />
        <SignUpGenderInput genders={genders}/>
        <SignUpHeightInput />
        <SignUpWeightInput />
        <SignUpDescriptionInput />
        <ButtonWrapper>
          <Button type="submit" disabled={!valid}>
            회원 가입
          </Button>
        </ButtonWrapper>
        {error && (
          <p>회원 가입 실패</p>
        )}
      </Form>
    </Container>
  )
}
