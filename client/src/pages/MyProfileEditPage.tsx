import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { accessTokenUtil } from '../auth/accessTokenUtil';
import MyProfileEditForm from '../components/myProfile/MyProfileEditForm';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { ConfirmTrigger } from '../components/ui/modal/ModalTrigger';
import useAuthStore from '../hooks/useAuthStore';
import useSignupFormStore from '../hooks/useSignupFormStore';
import { userService } from '../services/UserService';
import AccessDeniedPage from './AccessDeniedPage';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
  padding: ${(props) => props.theme.sizes.contentPadding};
`;

const ButtonWrapper = styled.div`
  margin-top: 40px;
  width: 100%;
  text-underline-offset: 1.5px;

  & > button {
    line-height: 1.67;
    padding: 0;
    color: ${(props) => props.theme.colors.unSelectedText};
    text-decoration-line: underline;
    user-select: none;
  }
`;

export default function MyProfileEditPage() {
  const navigate = useNavigate();
  const [{ user, state }, authStore] = useAuthStore();
  const [, signupFormstore] = useSignupFormStore();
  const [confirmed, setConfirmed] = useState<boolean | null>(false);

  useEffect(() => {
    signupFormstore.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const deleteUser = async () => {
      try {
        await userService.deleteUser();
        accessTokenUtil.setAccessToken('');
        signupFormstore.reset();
        authStore.reset();
        navigate('/');
      } catch (error) {
        alert('회원 탈퇴 실패');
      }
    };

    if (confirmed) deleteUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          title="정말 탈퇴하시겠어요?"
          buttonText="회원 탈퇴"
          confirmed={confirmed}
          setConfirmed={setConfirmed}
        >
          <p>확인 버튼 선택시,</p>
          <p>계정은 삭제되며 복구되지 않습니다.</p>
        </ConfirmTrigger>
      </ButtonWrapper>
    </Container>
  );
}
