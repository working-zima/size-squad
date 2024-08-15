import { Link } from 'react-router-dom';

import styled from 'styled-components';

import AccessDeniedPage from './AccessDeniedPage';

import MyProfileEditForm from '../components/myProfile/MyProfileEditForm';

import useAccessToken from '../hooks/useAccessToken';
import useFetchUserStore from '../hooks/useFetchUserStore';
import { ConfirmTrigger } from '../components/ui/modal/ModalTrigger';
import { useEffect, useState } from 'react';
import useSignupFormStore from '../hooks/useSignupFormStore';

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
  const [, store] = useSignupFormStore()
  const { user, loading } = useFetchUserStore()
  const [confirmed, setConfirmed] = useState<boolean | null>(false);

  useEffect(() => {
    store.reset()
  }, [])

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
      <ConfirmTrigger
        buttonText="회원 탈퇴"
        confirmed={confirmed}
        setConfirmed={setConfirmed}
      >
        회원 탈퇴
      </ConfirmTrigger>
    </Container>
  )
}
