import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import AccessDeniedPage from './AccessDeniedPage';

import MyProfileEditForm from '../components/myProfile/MyProfileEditForm';

import useAccessToken from '../hooks/useAccessToken';
import useFetchUserStore from '../hooks/useFetchUserStore';
import { ConfirmTrigger } from '../components/ui/modal/ModalTrigger';
import { useEffect, useState } from 'react';
import useSignupFormStore from '../hooks/useSignupFormStore';
import { apiService } from '../services/ApiService';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
  padding: ${props => props.theme.sizes.contentPadding};
`

const ButtonWrapper = styled.div`
  margin-top: 40px;
  width: 100%;

  button {
    line-height: 1.67;
    padding: 0;
    color: ${props => props.theme.colors.unSelectedText};
    text-decoration-line: underline;
    text-underline-offset: 1.5px;
    user-select: none;
  }
`

export default function MyProfileEditPage() {
  const navigate = useNavigate();

  const { accessToken, setAccessToken } = useAccessToken();
  const { user, loading } = useFetchUserStore()
  const [, store] = useSignupFormStore()
  const [confirmed, setConfirmed] = useState<boolean | null>(false);

  useEffect(() => {
    store.reset()
  }, [])

  useEffect(() => {
    if (!!confirmed) {
      apiService.deleteUser();
      setAccessToken('');
      store.reset();
      navigate('/');
    }
  }, [confirmed]);

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
        <ConfirmTrigger
          title='정말 탈퇴하시겠어요?'
          buttonText="회원 탈퇴"
          confirmed={confirmed}
          setConfirmed={setConfirmed}
        >
          <p>확인 버튼 선택시,</p>
          <p>계정은 삭제되며 복구되지 않습니다.</p>
        </ConfirmTrigger>
      </ButtonWrapper>
    </Container>
  )
}
