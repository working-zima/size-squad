import { Outlet } from 'react-router-dom';

import styled from 'styled-components';

import LayoutHeader from './LayoutHeader';
import LayoutMenuBar from './LayoutMenuBar';
import useCheckAccessToken from '../hooks/useCheckAccessToken';
import LayoutFooter from './LayoutFooter';

const Container = styled.div`
  display: grid;
  grid-template-rows: 50px auto auto 50px;
  grid-template-columns: 100%;
  grid-template-areas:
  'header'
  'main'
  'footer'
  'menu';
  margin: 0 auto;
  /* width: ${(props) => props.theme.sizes.layoutWidth}; */
`;

const Main = styled.main`
  grid-area: main;
`;

export default function Layout() {
  useCheckAccessToken();

  return (
    <Container>
      <LayoutHeader />
      <Main>
        <Outlet />
      </Main>
      <LayoutFooter />
      <LayoutMenuBar />
    </Container>
  );
}
