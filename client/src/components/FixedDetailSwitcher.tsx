import styled from 'styled-components';

import Button from './ui/Button';

import useViewModeStore from '../hooks/useViewModeStore';
import useAccessToken from '../hooks/useAccessToken';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  right: 10px;
  bottom: 80px;
  z-index: 500;
  font-size: 1.4rem;
`;

const CustomButton = styled(Button)`
  width: 40px;
  height: 40px;
  overflow: hidden;
  padding: 0;
  margin-top: 14px;
  border: 0;
  border-radius: 100%;
  color: ${(props) => props.theme.colors.primaryWhite};
  line-height: 20px;
  background-color: ${(props) => props.theme.colors.primaryBlack}; opacity : 0.6;
  user-select: none;
`;

export default function FixedDetailSwitcher() {
  const { accessToken } = useAccessToken();
  const [{ isDescriptionView }, store] = useViewModeStore();

  if (!accessToken) {
    return null;
  }

  return (
    <Container>
      <CustomButton onClick={() => store.setIsDescriptionView()}>
        {isDescriptionView ? '설명' : '치수'}
      </CustomButton>
    </Container>
  );
}
