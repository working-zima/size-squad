import { Outlet, useLocation, useMatch, useParams } from 'react-router-dom';

import styled from 'styled-components';

import LayoutHeader from './LayoutHeader';
import LayoutMenuBar from './LayoutMenuBar';
import LayoutFooter from './LayoutFooter';

import useCheckAccessToken from '../hooks/useCheckAccessToken';

import { PAGES, USERFIELDS } from '../constants';
import useUserStore from '../hooks/useUserStore';
import FixedDetailSwitcher from './FixedDetailSwitcher';

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
      pageTitle: '',
      homeButton: false,
      backSpace: false,
      showMenu: false ,
      Switcher: false,
    };

    if (isEditSizePage) page = PAGES['/mysize/:id/edit'];
    if (isEditProfilePage) page = PAGES['/mypage/:id/edit'];
    if (isMyPage && user) page.pageTitle = `${user.name}님의 페이지`;
    if (isEditProfile && user) {
      page = PAGES['/mypage/:id/edit/:editField'];
      page.pageTitle = USERFIELDS[path] ? `${USERFIELDS[path]} 변경` : ''
    }

  return (
    <Container showMenu={page.showMenu}>
      <LayoutHeader page={page}/>
      <Main>
        <Outlet />
      </Main>
      {page.showMenu && <LayoutFooter />}
      {page.Switcher
        ? <FixedDetailSwitcher />
        : null
      }
      {page.showMenu && <LayoutMenuBar/>}
    </Container>
  );
}
