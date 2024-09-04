import { Link, useLocation } from 'react-router-dom';

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
  padding: 20px;

  @media (min-width: 480px) {
    flex-direction: row;
  }
`

const CopyrightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  width: 100%;
  margin-bottom: 2.4rem;


  p {
    font-size: 1.4rem;
    margin: 10px 0;
    color: ${props => props.theme.colors.primaryWhite};
  }
`

const Images = styled.div`
  display: flex;
  gap: 5px;
`

const WhiteLogo = styled.div`
  height: 16px;

  img {
    filter: invert(100%);
    height: 100%;
    width: 100%;
    object-fit: contain;
    -webkit-user-drag: none;
  }
`

const WhiteIcon = styled.div`
  height: 16.5px;

  img {
    filter: opacity(50%);
    height: 100%;
    width: 100%;
    object-fit: contain;
    -webkit-user-drag: none;
  }
`

const EmailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  h2 {
    font-size: 18px;
    font-weight: 800;
    color: ${props => props.theme.colors.primaryWhite};
  }

  p {
    margin: 10px 0;
    font-size: 1.4rem;
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
          <Images>
            <WhiteLogo>
              <img src='/images/size-squad-logo.png' alt='Logo' />
            </WhiteLogo>
            <WhiteIcon>
              <img src='/images/size-squad-icon.png' alt='Icon' />
            </WhiteIcon>
          </Images>
          <p>Copyright © 2024 working-zima. All rights reserved.</p>
        </CopyrightWrapper>
        <EmailWrapper>
          <h2>문의메일</h2>
          {accessToken
            ? (<EmailForm />)
            : (
              <p>
                문의메일은 <Link to='login'>로그인</Link> 후 이용할 수 있습니다..
              </p>
            )
          }
        </EmailWrapper>
      </Wrapper>
    </Container>
  )
}
