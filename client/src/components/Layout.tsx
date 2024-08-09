import { Outlet, useLocation } from 'react-router-dom';

import styled from 'styled-components';

import LayoutHeader from './LayoutHeader';
import LayoutMenuBar from './LayoutMenuBar';
import LayoutFooter from './LayoutFooter';

import useCheckAccessToken from '../hooks/useCheckAccessToken';

import { TITLE } from '../constants';

type ContainerProps = {
  showMenu: boolean;
}

const Container = styled.div<ContainerProps>`
  display: grid;
  grid-template-rows: ${
    ({ showMenu }) => (showMenu ? '50px auto auto 50px' : '50px auto')
  };
  grid-template-columns: 100%;
  grid-template-areas:
    'header'
    'main'
    ${({ showMenu }) => (showMenu ? "'footer'" : '')};
    ${({ showMenu }) => (showMenu ? "'menu'" : '')};
  margin: 0 auto;
  width: 100vw;
  overflow-x: hidden;
`;

const Main = styled.main`
  grid-area: main;
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
`;

export default function Layout() {
  useCheckAccessToken();

  const location = useLocation();

  // 조건에 따라 menu를 보여줄지 결정
  const showMenu = TITLE[location.pathname] === 'Size Squad';

  return (
    <Container showMenu={showMenu}>
      <LayoutHeader />
      <Main>
        <Outlet />
      </Main>
      {showMenu && <LayoutFooter />}
      {showMenu && <LayoutMenuBar />}
    </Container>
  );
}
