import { Link } from 'react-router-dom';

import styled from 'styled-components';

import AccessDeniedPage from './AccessDeniedPage';

import MyProfileEditForm from '../components/myProfile/MyProfileEditForm';

import useFetchUser from '../hooks/useFetchUser';
import useAccessToken from '../hooks/useAccessToken';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
  padding: ${props => props.theme.sizes.contentPadding};
`

const ButtonWrapper = styled.div`
  margin-top: 40px;
  width: 100%;

  a {
    line-height: 1.67;
    color: ${props => props.theme.colors.unSelectedText};
    text-decoration-line: underline;
    text-underline-offset: 1.5px;
    user-select: none;
  }
`

export default function MyProfileEditPage() {
  const { accessToken } = useAccessToken();
  const { user, loading } = useFetchUser()
  console.log(user)
  if (!accessToken) {
    return <AccessDeniedPage />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <MyProfileEditForm user={user}/>
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
