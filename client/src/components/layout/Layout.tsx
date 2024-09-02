import { Outlet, useLocation, useMatch, useParams } from 'react-router-dom';

import styled from 'styled-components';

import LayoutHeader from './LayoutHeader';
import LayoutMenuBar from './LayoutMenuBar';
import LayoutFooter from './LayoutFooter';

import useCheckAccessToken from '../../hooks/useCheckAccessToken';

import { PAGES, USERFIELDS } from '../../constants';
import useUserStore from '../../hooks/useUserStore';
import SideButtons from './SideButtons';
import PortalRoot from './PortalRoot';

type ContainerProps = {
  SHOWMENU: boolean;
  FOOTER: boolean;
}

const Container = styled.div<ContainerProps>`
  display: grid;
  grid-template-rows: 50px 1fr ${({ FOOTER }) => (FOOTER ? 'auto' : '')};
  grid-template-columns: 100%;
  grid-template-areas:
    'header'
    'main'
    ${({ FOOTER }) => (FOOTER ? "'footer'" : '')};
    ${({ SHOWMENU }) => (SHOWMENU ? "'menu'" : '')};
  margin: 0 auto;
  width: 100vw;
  height: 100vh;
`;

const Main = styled.main`
  grid-area: main;
  max-width: 768px;
  width: 100%;
  margin: 0 auto;
`;

export default function Layout() {
  useCheckAccessToken();
  const location = useLocation();
  const params = useParams();
  const path = String(params.path);

  const [{ user }] = useUserStore();

  const isEditSizePage = useMatch('/mysize/:id/edit');
  const isEditProfilePage = useMatch('/mypage/:id/edit');
  const isEditProfile = useMatch('/mypage/:id/edit/:editField')
  const isMyPage = useMatch('/mypage');

  let page = PAGES[location.pathname]
    || {
    PAGETITLE: '',
    homeButton: false,
    backSpace: false,
    showMenu: false,
    Switcher: false,
  };

  if (isEditSizePage) page = PAGES['/mysize/:id/edit'];
  if (isEditProfilePage) page = PAGES['/mypage/:id/edit'];
  if (isMyPage && user) page.PAGETITLE = `${user.name}님의 페이지`;
  if (isEditProfile && user) {
    page = PAGES['/mypage/:id/edit/:editField'];
    page.PAGETITLE = USERFIELDS[path] ? `${USERFIELDS[path]} 변경` : ''
  }

  return (
    <Container SHOWMENU={page.SHOWMENU} FOOTER={page.FOOTER}>
      <LayoutHeader page={page} />
      <Main>
        <Outlet />
      </Main>
      {page.FOOTER && <LayoutFooter />}
      {page.SHOWMENU
        ? <SideButtons />
        : null
      }
      {page.SHOWMENU && <LayoutMenuBar />}
      <PortalRoot />
    </Container>
  );
}
