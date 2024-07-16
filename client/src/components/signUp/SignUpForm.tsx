import { useEffect } from "react";

import styled from "styled-components";
import { CiCircleRemove } from "react-icons/ci";

import TextBox from "../ui/TextBox";
import Button from "../ui/Button";
import ComboBox from "../ui/ComboBox";

import useAccessToken from "../../hooks/useAccessToken";
import useSignupFormStore from "../../hooks/useSignupFormStore";

import { RequiredStar } from "../../utils/RequiredStar";
import { Gender } from "../../types";
import SignUpEmailInput from "./SignUpEmailInput";
import SignUpNameInput from "./SignUpNameInput";
import SignUpPassword from "./SignUpPassword";

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

const Metrics = styled.div`
  color: ${props => props.theme.colors.unSelectedText};
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
  genders: Gender[];
}

export default function SignUpForm({ genders }: SignUpFormProps){
  const { setAccessToken } = useAccessToken();

  const [{
    gender, valid, height, weight, description, error, accessToken
  }, store] = useSignupFormStore();

  useEffect(() => {
    if (accessToken) {
      setAccessToken(accessToken);
    }
  }, [accessToken]);

  const handleChangeHeight = (value: string) => {
    let sanitizedValue = value.replace(/[^0-9]/g, '');

    if (sanitizedValue.length > 3) {
      sanitizedValue = sanitizedValue.slice(0, 3);
    }

    store.changeHeight(sanitizedValue);
  };

  const handleResetHeight = () => {
    store.changeHeight('');
  }

  const handleChangeWeight = (value: string) => {
    let sanitizedValue = value.replace(/[^0-9]/g, '');

    if (sanitizedValue.length > 3) {
      sanitizedValue = sanitizedValue.slice(0, 3);
    }

    store.changeWeight(sanitizedValue);
  };

  const handleResetWeight = () => {
    store.changeWeight('');
  }

  const handleChangeDescription = (value: string) => {
    store.changeDescription(value);
  };


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
        <SignUpPassword />
        <ComboBox
          label="성별"
          selectedItem={gender}
          items={genders}
          itemToId={(item) => item._id}
          itemToText={(item) => item.gender}
          onChange={(value) => value && store.changeGender(value)}
        />
        <TextBox
          label="키"
          placeholder="키를 입력해주세요."
          type="text"
          value={height}
          onChange={handleChangeHeight}
        >
        <Metrics>
          <span>cm</span>
        </Metrics>
        <Button onClick={handleResetHeight}>
          {!!height && <CiCircleRemove size="18" fill='#6e6e6e'/>}
        </Button>
        </TextBox>
        <TextBox
          label="몸무게"
          placeholder="몸무게를 입력해주세요."
          type="text"
          value={weight}
          onChange={handleChangeWeight}
        >
        <Metrics>
          <span>kg</span>
        </Metrics>
        <Button onClick={handleResetWeight}>
          {!!weight && <CiCircleRemove size="18" fill='#6e6e6e'/>}
        </Button>
        </TextBox>
        <TextBox
          label="체형"
          placeholder="체형을 입력해주세요."
          type="text"
          value={description}
          multiline={true}
          onChange={handleChangeDescription}
        />
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
