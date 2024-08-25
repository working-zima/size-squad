import styled from 'styled-components';

import Button from '../ui/Button';

import useViewModeStore from '../../hooks/useViewModeStore';
import useAccessToken from '../../hooks/useAccessToken';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  right: 10px;
  bottom: 80px;
  z-index: 500;
  font-size: 1.4rem;
`;

const SizeInfoSwitch = styled(Button)`
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

const ScrollToTopButton = styled(SizeInfoSwitch)`
  &::before {
    content: '';
    display: inline-block;
    width: 14px;
    height: 14px;
    border-width: 1.5px;
    border-style: solid;
    border-color:
      transparent
      ${props => props.theme.colors.primaryWhite}
      ${props => props.theme.colors.primaryWhite}
      transparent;
    transform: rotate(225deg);
    vertical-align: bottom;
  }
`

export default function SideButtons() {
  const { accessToken } = useAccessToken();
  const [{ isDescriptionView }, store] = useViewModeStore();

  if (!accessToken) return null


  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <Container>
      <ScrollToTopButton onClick={() => scrollToTop()} />
      <SizeInfoSwitch onClick={() => store.setIsDescriptionView()}>
        {isDescriptionView ? '치수' : '설명'}
      </SizeInfoSwitch>
    </Container>
  );
}
