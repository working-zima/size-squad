import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { CiUser, CiHome, CiEdit, CiLogin, CiViewList } from "react-icons/ci";

import useAccessToken from '../../hooks/useAccessToken';

const Container = styled.div.attrs({ className: 'LayoutMenuBar' })`
  grid-area: menu;
  z-index: 550;
`;

const MenuWrap = styled.div.attrs({ className: 'MenuWrap' })`
  position: relative;
  height: 50px;

  h2 {
    overflow: hidden;
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    clip: rect(0px, 0px, 0px, 0px);
  }
`;

const Menu = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0px;
  right: 0px;
  bottom: 0px;
  height: 50px;
  background-color: ${props => props.theme.colors.primaryWhite};
  /* width: 100%; */

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    flex: 1 1 0%;
    height: 100%;
  }

  span {
    line-height: 1.5rem;
    font-size: 1.1rem;
    user-select: none;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 768px;
  padding: 0 1rem;
`;

export default function LayoutMenuBar() {
  const { accessToken } = useAccessToken();

  return (
    <Container>
      <MenuWrap>
        <h2>Navigation Menu</h2>
        <Menu>
          <ContentWrapper>
            <Link to="/">
              <div><CiHome size="24" /></div>
              <span>홈</span>
            </Link>
            {!!accessToken && (
              <>
                <Link to="/mysize">
                  <div><CiViewList size="24" /></div>
                  <span>목록</span>
                </Link>
                <Link to="/mysize/new">
                  <div><CiEdit size="24" /></div>
                  <span>작성</span>
                </Link>
              </>
            )}
            <Link to={!!accessToken ? "/mypage" : "/login"}>
              {!!accessToken ? (
                <>
                  <div><CiUser size="24" /></div>
                  <span>마이</span>
                </>
              ) : (
                <>
                  <div><CiLogin size="24" /></div>
                  <span>로그인</span>
                </>
              )}
            </Link>
          </ContentWrapper>
        </Menu>
      </MenuWrap>
    </Container>
  );
}
