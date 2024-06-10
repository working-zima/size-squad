import { Outlet } from 'react-router-dom';

import styled from 'styled-components';

import Header from './Header';
import MenuBar from './MenuBar';

const Container = styled.div`
  display: grid;
  grid-template-rows: 50px auto 60px;
  grid-template-columns: 100%;
  grid-template-areas:
  'header'
  'main'
  'footer';
  margin: 0 auto;
  /* width: ${(props) => props.theme.sizes.layoutWidth}; */
`;

const Main = styled.main`
  grid-area: main;
`;

export default function Layout() {
  return (
    <Container>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <MenuBar />
    </Container>
  );
}
