import { useEffect, useState } from "react";

import styled, { css } from "styled-components";
import { CiRead, CiCircleRemove, CiUnread } from "react-icons/ci";

import TextBox from "../ui/TextBox";
import Button from "../ui/Button";
import ComboBox from "../ui/ComboBox";

import useAccessToken from "../../hooks/useAccessToken";
import useSignupFormStore from "../../hooks/useSignupFormStore";
import useDebounce from "../../hooks/useDebounce";

import { RequiredStar } from "../../utils/RequiredStar";
import { Gender } from "../../types";

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

const ValidTextWrapper = styled.p`
  margin-top: 4px;
  font-size: 1.2rem;
  line-height: 16px;
  color: #e72a1d;
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
  genderList: Gender[];
}

export default function SignUpForm({ genderList }: SignUpFormProps){
  const [isShowPw, setIsShowPw] = useState({
    showPassword: false,
    showConfirmation: false
  });

  const { setAccessToken } = useAccessToken();

  const [{
    email, name, password, passwordConfirmation, gender, valid, height, weight, description, error, accessToken, isNameDuplicated
  }, store] = useSignupFormStore();

  const debouncedNameInput = useDebounce(name, 500);

  useEffect(() => {
    if (accessToken) {
      setAccessToken(accessToken);
    }
  }, [accessToken]);

  useEffect(() => {
    store.checkUsername(debouncedNameInput);
  }, [debouncedNameInput]);

  const handleChangeEmail = (value: string) => {
    store.changeEmail(value);
  };

  const handleResetEmail = () => {
    store.changeEmail('');
  }

  const handleChangeName = (value: string) => {
    store.changeName(value);
  };

  const handleResetName = () => {
    store.changeName('');
  }

  const handleChangePassword = (value: string) => {
    store.changePassword(value);
  };

  const handleResetPassword = () => {
    store.changePassword('')
  }

  const handleChangePasswordConfirmation = (value: string) => {
    store.changePasswordConfirmation(value);
  };

  const handleResetPasswordConfirmation = () => {
    store.changePasswordConfirmation('');
  }

  const handleChangeHeight = (value: string) => {
    let sanitized = value.replace(/[^0-9]/g, '');

    if (sanitized.length > 3) {
      sanitized = sanitized.slice(0, 3);
    }

    store.changeHeight(sanitized);
  };

  const handleResetHeight = () => {
    store.changeHeight('');
  }

  const handleChangeWeight = (value: string) => {
    let sanitized = value.replace(/[^0-9]/g, '');

    if (sanitized.length > 3) {
      sanitized = sanitized.slice(0, 3);
    }

    store.changeWeight(sanitized);
  };

  const handleResetWeight = () => {
    store.changeWeight('');
  }

  const handleChangeDescription = (value: string) => {
    store.changeDescription(value);
  };

  const handleShowPassword = () => {
    setIsShowPw(prev => ({...prev, showPassword: !prev.showPassword}));
  }

  const handleShowConfirmation = () => {
    setIsShowPw(prev => ({...prev, showConfirmation: !prev.showConfirmation}));
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    store.signup();
  };

  return (
    <Container>
      <h2>회원가입</h2>
      <div>필수항목</div>
      <Form onSubmit={handleSubmit}>
        <TextBox
          label="이메일"
          placeholder="이메일을 입력해주세요."
          value={email}
          onChangeString={handleChangeEmail}
          required
        >
        <Button onClick={handleResetEmail}>
          {!!email && <CiCircleRemove size="18" fill='#6e6e6e'/>}
        </Button>
        </TextBox>
        <TextBox
          label="닉네임"
          placeholder="닉네임을 입력해주세요."
          value={name}
          onChangeString={handleChangeName}
          required
        >
        <Button onClick={handleResetName}>
          {!!name && <CiCircleRemove size="18" fill='#6e6e6e'/>}
        </Button>
        </TextBox>
        {name && (
          <ValidTextWrapper>
            {isNameDuplicated && "중복된 닉네임입니다."}
          </ValidTextWrapper>
        )}
        <TextBox
          label="비밀번호"
          placeholder="8 ~ 16자리를 사용합니다."
          type={isShowPw.showPassword ? "text" : "password"}
          value={password}
          onChangeString={handleChangePassword}
          required
        >
          <Button onClick={handleResetPassword}>
            {!!password && <CiCircleRemove size="18" fill='#6e6e6e'/>}
          </Button>
          <Button onClick={handleShowPassword}>
            {isShowPw.showPassword
              ? <CiRead size="18" fill='#6e6e6e'/>
              : <CiUnread size="18" fill='#6e6e6e'/>
            }
          </Button>
        </TextBox>
        <TextBox
          placeholder="비밀번호를 다시 입력해주세요."
          type={isShowPw.showConfirmation ? "text" : "password"}
          value={passwordConfirmation}
          onChangeString={handleChangePasswordConfirmation}
        >
          <Button onClick={handleResetPasswordConfirmation}>
            {!!passwordConfirmation
              && <CiCircleRemove size="18" fill='#6e6e6e'/>}
          </Button>
          <Button onClick={handleShowConfirmation}>
            {isShowPw.showConfirmation
              ? <CiRead size="18" fill='#6e6e6e'/>
              : <CiUnread size="18" fill='#6e6e6e'/>
            }
          </Button>
        </TextBox>
        <ComboBox
          label="성별"
          selectedItem={gender}
          items={genderList}
          itemToId={(item) => item._id}
          itemToText={(item) => item.gender}
          onChange={(value) => value && store.changeGender(value)}
        />
        <TextBox
          label="키"
          placeholder="키를 입력해주세요."
          type="text"
          value={height}
          onChangeString={handleChangeHeight}
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
          onChangeString={handleChangeWeight}
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
          onChangeString={handleChangeDescription}
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
