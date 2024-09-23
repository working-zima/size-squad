import { useEffect } from "react";

import styled from "styled-components";

import SignUpEmailInput from "./SignUpEmailInput";
import SignUpNameInput from "./SignUpNameInput";
import PasswordInputs from "./PasswordInputs";
import BodyMetricInput from "./BodyMetricInput";
import SignUpDescriptionInput from "./SignUpDescriptionInput";

import Button from "../ui/Button";
import ComboBox from "../ui/selectbox/ComboBox";

import { Summary } from "../../types";

import useSignupFormStore from "../../hooks/useSignupFormStore";

import { requiredStar } from "../../utils/requiredStar";
import { accessTokenUtil } from "../../auth/accessTokenUtil";

import { GENDER } from "../../constants/apiLocalizationMap";


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
    ${requiredStar('after')}
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

export default function SignUpForm({ genders }: SignUpFormProps) {
  const [{ user, valid, state, accessToken }, store] = useSignupFormStore();

  useEffect(() => {
    if (accessToken) {
      accessTokenUtil.setAccessToken(accessToken)
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
        <SignUpEmailInput
          label="이메일"
          placeholder="이메일을 입력해주세요."
        />
        <SignUpNameInput
          label="코드네임"
          placeholder="닉네임 2 ~ 10자리 이내로 입력해주세요."
        />
        <PasswordInputs
          pwdLabel="비밀번호"
          pwdPlaceholder="영문, 숫자, 특수문자 포함 8 ~ 16자리를 사용합니다."
          confirmPlaceholder="비밀번호를 다시 입력해주세요."
        />
        <ComboBox
          label="성별"
          selectedItem={user.gender}
          items={genders}
          itemToId={(item) => item?._id}
          itemToText={(item) => GENDER[item?.name]}
          onChange={(value) => value && store.changeGender(value)}
        />
        <BodyMetricInput
          label="키"
          placeholder="키를 입력해주세요."
          value={user.height}
          unitType='cm'
          onChange={(value) => store.changeHeight(value)}
        />
        <BodyMetricInput
          label="몸무게"
          placeholder="몸무게를 입력해주세요."
          value={user.weight}
          unitType='kg'
          onChange={(value) => store.changeWeight(value)}
        />
        <SignUpDescriptionInput
          label="체형"
          placeholder="체형을 100자 이내로 입력해주세요."
          description={user.description}
          changeDescription={(value) => store.changeDescription(value)}
        />
        <ButtonWrapper>
          <Button type="submit" disabled={!valid}>
            회원 가입
          </Button>
        </ButtonWrapper>
        {state === 'error' && (
          <p>회원 가입 실패</p>
        )}
      </Form>
    </Container>
  )
}
