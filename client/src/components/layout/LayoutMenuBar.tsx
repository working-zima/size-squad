import {
  RiEditLine,
  RiHome5Line,
  RiListView,
  RiLoginBoxLine,
  RiUserLine,
} from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { accessTokenUtil } from '../../auth/accessTokenUtil';
import { User } from '../../types';

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
  background-color: ${(props) => props.theme.colors.primaryWhite};
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 768px;
  padding: 0 1rem;
  -webkit-tap-highlight-color: transparent;
`;

const MenuLink = styled(Link)<{ $isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  flex: 1 1 0%;
  height: 100%;
  color: ${(props) =>
    props.$isActive
      ? props.theme.colors.primaryBlack
      : props.theme.colors.unSelectedText};

  span {
    line-height: 1.5rem;
    font-size: 1.1rem;
    user-select: none;
  }
`;

type LayoutMenuBarProps = {
  user: User;
};

export default function LayoutMenuBar({ user }: LayoutMenuBarProps) {
  const location = useLocation();
  const accessToken = accessTokenUtil.getAccessToken();

  const isActive = (path: string) => location.pathname === path;

  return (
    <Container>
      <MenuWrap>
        <h2>Navigation Menu</h2>
        <Menu>
          <ContentWrapper>
            <MenuLink to="/" $isActive={isActive('/')}>
              <div>
                <RiHome5Line size="24" />
              </div>
              <span>홈</span>
            </MenuLink>
            {!!accessToken && (
              <>
                <MenuLink to="/mysize" $isActive={isActive('/mysize')}>
                  <div>
                    <RiListView size="24" />
                  </div>
                  <span>목록</span>
                </MenuLink>
                <MenuLink to="/mysize/new" $isActive={isActive('/mysize/new')}>
                  <div>
                    <RiEditLine size="24" />
                  </div>
                  <span>작성</span>
                </MenuLink>
              </>
            )}
            <MenuLink
              to={accessToken ? `/mypage/${user._id}` : '/login'}
              $isActive={isActive('/mypage') || isActive('/login')}
            >
              {accessToken ? (
                <>
                  <div>
                    <RiUserLine size="24" />
                  </div>
                  <span>마이</span>
                </>
              ) : (
                <>
                  <div>
                    <RiLoginBoxLine size="24" />
                  </div>
                  <span>로그인</span>
                </>
              )}
            </MenuLink>
          </ContentWrapper>
        </Menu>
      </MenuWrap>
    </Container>
  );
}
