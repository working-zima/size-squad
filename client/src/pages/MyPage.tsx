import { Link, useNavigate } from "react-router-dom";

import styled from "styled-components";

import AccessDeniedPage from "./AccessDeniedPage";

import LineClampedText from "../components/ui/LineClamp";
import Button from "../components/ui/Button";

import useAccessToken from "../hooks/useAccessToken";
import useFetchUserStore from "../hooks/useFetchUserStore";

import { apiService } from "../services/ApiService";

const Container = styled.div`
  padding: ${props => props.theme.sizes.contentPadding};
  background-color: ${(props) => props.theme.colors.backgroundColor};
`

const ProfileWrapper = styled.div`
  font-size: 1.3rem;
  line-height: ${(props) => props.theme.sizes.lineHeight};
`

const UserSummary = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 500;
  margin-bottom: 4px;

  div {
    font-size: 1.4rem;
  }

  span {
    padding-top: 4px;
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
    -webkit-tap-highlight-color: transparent;
  }

  & > button:first-of-type {
      margin-left: 0px;
  }
`

const ButtonLike = styled.div`
  width: 100%;
  height: 100%;
  height: 34px;
  padding: 0;
  margin-right: 4px;
  font-size: 1.4rem;
  background-color: ${props => props.theme.colors.primaryWhite};
  color: ${props => props.theme.colors.primaryBlack};
  border: 1px solid ${(props) => props.theme.colors.buttonBorderColor};
  border-radius: 4px;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
`

export default function MyPage() {
  const navigate = useNavigate();

  const { accessToken, setAccessToken } = useAccessToken();
  const { user, loading, store } = useFetchUserStore();

  const handleClickLogout = async () => {
    await apiService.logout();
    setAccessToken('');
    store.reset();
    navigate('/');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!accessToken) {
    return <AccessDeniedPage />;
  }

  return (
    <Container>
      <ProfileWrapper>
        <UserSummary>
          <div>{user?.name}</div>
          <span>{user.gender?.name}</span>
          <span>{user?.height}cm / {user.weight}kg</span>
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
        <ButtonLike>
          <Link to={`/mypage/${user._id}/edit`}>
            회원정보 변경
          </Link>
        </ButtonLike>
        <Button onClick={handleClickLogout}>
          로그아웃
        </Button>
      </ButtonWrapper>
    </Container>
  )
}
