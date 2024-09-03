import { useLocation } from 'react-router-dom';

import styled from 'styled-components';

import { EmailForm } from './EmailForm';
import useAccessToken from '../../hooks/useAccessToken';

const Container = styled.footer`
  grid-area: footer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  border-top: solid ${props => props.theme.colors.primaryWhite};
  background-color: ${props => props.theme.colors.borderColor};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 768px;
  width: 100%;
  padding: 20px 20px 80px 20px;
`

const CopyrightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;


  p {
    font-size: 1.4rem;
    margin: 10px 0;
    color: ${props => props.theme.colors.primaryWhite};
  }
`

const WhiteLogo = styled.div`
  height: 16px;

  img {
    filter: invert(100%);
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
`

const EmailWrapper = styled.div`
  margin-top: 2.4rem;

  h2 {
    font-size: 18px;
    font-weight: 800;
    color: ${props => props.theme.colors.primaryWhite};
  }
`

export default function LayoutFooter() {
  const location = useLocation();
  const { accessToken } = useAccessToken();

  const noFooterPaths = ['/login', '/signup', '/mysize/new'];

  if (noFooterPaths.some(path => location.pathname.startsWith(path))) {
    return null
  }

  return (
    <Container>
      <Wrapper>
        <CopyrightWrapper>
          <WhiteLogo>
            <img src='/images/size-squad-logo.png' alt='Logo' />
          </WhiteLogo>
          <p>Copyright © 2024 working-zima. All rights reserved.</p>
        </CopyrightWrapper>
        <EmailWrapper>
          <h2>문의 메일</h2>
          {accessToken
            ? <EmailForm />
            : <p>로그인 후 이용해 주세요.</p>
          }
        </EmailWrapper>
      </Wrapper>
    </Container>
  )
}
