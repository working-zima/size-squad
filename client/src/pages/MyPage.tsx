import styled from "styled-components";

import AccessDeniedPage from "./AccessDeniedPage";

import Button from "../components/ui/Button";
import LineClampedText from "../components/ui/LineClamp";

import useFetchUser from "../hooks/useFetchUser"
import useAccessToken from "../hooks/useAccessToken";

const Container = styled.div`
  padding: ${props => props.theme.sizes.contentPadding};
  background-color: ${(props) => props.theme.colors.dividerColor};
`

const ProfileWrapper = styled.div`
  font-size: 1.3rem;
  line-height: ${(props) => props.theme.sizes.lineHeight};
`

const UserSummary = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 500;

  div {
    font-size: 1.4rem;
  }

  span {
    padding: 4px 0 0 0;
    font-weight: 400;
    color: ${props => props.theme.colors.unSelectedText};
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 14px 0;

  button {
    width: 100%;
    height: 34px;
    padding: 0;
    margin-left: 4px;
    background-color: ${props => props.theme.colors.primaryWhite};
    color: ${props => props.theme.colors.primaryBlack};
    border: 1px solid ${(props) => props.theme.colors.buttonBorderColor};
    border-radius: 4px;
  }

  & > button:first-of-type {
      margin-left: 0px;
  }
`

export default function MyPage() {
  const { accessToken } = useAccessToken();
  const { user, loading } = useFetchUser()

  if(loading) {
    return (
      <div>
        loading
      </div>
    )
  }

  if (!accessToken) {
    return (
      <AccessDeniedPage />
    );
  }
  console.log(!!user.description)
  return (
    <Container>
      <ProfileWrapper>
        <UserSummary>
          <div>{user.name}</div>
          <span>{user.gender.name}</span>
          <span>{user.height}cm / {user.weight}kg</span>
        </UserSummary>
        <LineClampedText
          text={[user.description
            ? user.description
            : '간단한 체형 정보를 적어보세요'
          ]}
          lines={1}
        />
      </ProfileWrapper>
      <ButtonWrapper>
        <Button>
          회원정보 변경
        </Button>
        <Button>
          비밀번호 변경
        </Button>
        <Button>
          로그아웃
        </Button>
      </ButtonWrapper>
    </Container>
  )
}
