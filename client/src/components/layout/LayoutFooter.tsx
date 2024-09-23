import { Link, useLocation } from 'react-router-dom';

import styled from 'styled-components';

import { EmailForm } from './EmailForm';
import { accessTokenUtil } from '../../auth/accessTokenUtil';

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
  user-select: none;

  p {
    font-size: 1.4rem;
    margin: 10px 0;
    line-height: 1.67;
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
  justify-content: flex-start;
  align-items: center;
  width: 100%;

  p {
    line-height: 1.67;
    font-size: 1.4rem;
    color: ${props => props.theme.colors.primaryWhite};
  }

  a {
    color: ${props => props.theme.colors.PrimaryBlue};
  }
`

export default function LayoutFooter() {
  const location = useLocation();
  const accessToken = accessTokenUtil.getAccessToken()

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
          {accessToken
            ? (<EmailForm />)
            : (
              <div>
                <p>
                  팀원만 이용할 수 있는 문의 기능입니다. <Link to='login'>로그인</Link> 후 이용해 주세요.
                </p>
                <p>
                  혹시 아직 스쿼드의 일원이 아니라면 지금 <Link to='signup'>합류</Link>해 보세요.
                </p>
              </div>
            )
          }
        </EmailWrapper>
      </Wrapper>
    </Container>
  )
}
