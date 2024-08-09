import { Link, useParams } from 'react-router-dom';

import styled from 'styled-components';

import AccessDeniedPage from './AccessDeniedPage';

import useFetchUser from '../hooks/useFetchUser';
import useAccessToken from '../hooks/useAccessToken';
import { useState } from 'react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
  padding: ${props => props.theme.sizes.contentPadding};
`

const Profile = styled.div`
  margin-bottom: auto;
`

const ProfileCards = styled.div`
  display: flex;
  flex-direction: column;
`

const ProfileCard = styled.div`
  position: relative;
  align-items: center;
  width: 100%;
  padding: 20px 0;
  font-size: 1.6rem;
  border-bottom: 1px solid ${props => props.theme.colors.dividerColor};

  strong {
    color: ${props => props.theme.colors.secondaryTextColor};
  }

  span {
    font-size: 1.5rem;
  }
`

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 30px 0 0;
`

const ButtonMore = styled.button`
  position: absolute;
  right: 10px;
  bottom: 31px;
  border: 0;
  background-color: transparent;
  width: 5px;
  height: 5px;
  padding: 0;
  cursor: pointer;

  /* 밑 화살표 */
  &::before {
    content: '';
    display: inline-block;
    width: 10px;
    height: 10px;
    border-width: 1.2px;
    border-style: solid;
    border-color: transparent #333 #333 transparent;
    transform: rotate(315deg);
    vertical-align: middle;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 40px;
  width: 100%;

  a {
    line-height: 1.67;
    color: ${props => props.theme.colors.unSelectedText};
    text-decoration-line: underline;
    text-underline-offset: 1.5px;
  }
`

export default function MyProfileEditPage() {
  const [isChanged, setIsChanged] = useState(true);
  const params = useParams();
  const productId = String(params.id);

  const { accessToken, setAccessToken } = useAccessToken();
  const { user, loading } = useFetchUser()

  if (!accessToken) (<AccessDeniedPage />);

  if(loading) (<div>loading</div>)

  return (
    <Container>
      <Profile>
        <ProfileCards>
          <ProfileCard>
            <ProfileWrapper>
              <strong>Email</strong>
              <span>{user.email}</span>
            </ProfileWrapper>
          </ProfileCard>
            <ProfileCard>
              <ProfileWrapper>
                <strong>Name</strong>
                <span>{user.name}</span>
              </ProfileWrapper>
          </ProfileCard>
          <ProfileCard>
            <ProfileWrapper>
              <strong>Password</strong>
              <span>{user.password}</span>
            </ProfileWrapper>
            <ButtonMore />
          </ProfileCard>
          <ProfileCard>
          <ProfileWrapper>
            <strong>Gender</strong>
            <span>{user.gender.name}</span>
          </ProfileWrapper>
          <ButtonMore />
          </ProfileCard>
          <ProfileCard>
          <ProfileWrapper>
            <strong>Height</strong>
            <span>{user.height}cm</span>
          </ProfileWrapper>
            <ButtonMore />
          </ProfileCard>
          <ProfileCard>
          <ProfileWrapper>
            <strong>Weight</strong>
            <span>{user.weight}kg</span>
          </ProfileWrapper>
            <ButtonMore />
          </ProfileCard>
          <ProfileCard>
            <ProfileWrapper>
              <strong>Physical Description</strong>
            </ProfileWrapper>
            <ButtonMore />
          </ProfileCard>
        </ProfileCards>
      </Profile>
      <ButtonWrapper>
        <p>
          <Link to="/signup">
            회원 탈퇴
          </Link>
        </p>
    </ButtonWrapper>
    </Container>
  )
}
