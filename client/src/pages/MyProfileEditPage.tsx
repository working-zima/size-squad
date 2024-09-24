import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import AccessDeniedPage from './AccessDeniedPage';

import MyProfileEditForm from '../components/myProfile/MyProfileEditForm';
import { ConfirmTrigger } from '../components/ui/modal/ModalTrigger';
import LoadingSpinner from '../components/ui/LoadingSpinner';

import useSignupFormStore from '../hooks/useSignupFormStore';
import useAuthStore from '../hooks/useAuthStore';

import { userService } from '../services/UserService';

import { accessTokenUtil } from '../auth/accessTokenUtil';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
  padding: ${props => props.theme.sizes.contentPadding};
`

const ButtonWrapper = styled.div`
  margin-top: 40px;
  width: 100%;
  text-underline-offset: 1.5px;

  & > button {
    line-height: 1.67;
    padding: 0;
    color: ${props => props.theme.colors.unSelectedText};
    text-decoration-line: underline;
    user-select: none;
  }
`

export default function MyProfileEditPage() {
  const navigate = useNavigate();
  const [{ user, state }] = useAuthStore();
  const [, store] = useSignupFormStore();
  const [confirmed, setConfirmed] = useState<boolean | null>(false);

  useEffect(() => {
    store.reset()
  }, [])

  useEffect(() => {
    if (!!confirmed) {
      userService.deleteUser();
      accessTokenUtil.setAccessToken('')
      store.reset();
      navigate('/');
    }
  }, [confirmed]);

  if (!accessTokenUtil.getAccessToken()) {
    return <AccessDeniedPage />;
  }

  if (state === 'loading') {
    return <LoadingSpinner />;
  }

  return (
    <Container>
      <MyProfileEditForm user={user} />
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
