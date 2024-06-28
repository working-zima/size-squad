import { Outlet } from 'react-router-dom';

import styled from 'styled-components';

import LayoutHeader from './LayoutHeader';
import LayoutMenuBar from './LayoutMenuBar';

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

const LayoutFooter = styled.footer`
  grid-area: footer;
  background-color: ${props => props.theme.colors.tertiaryGrey};
  padding: 26px 16px 0px;
  border-top: solid rgb(242, 244, 247);
`;

export default function Layout() {
  return (
    <Container>
      <LayoutHeader />
      <Main>
        <Outlet />
      </Main>
      <LayoutFooter>
        footer
      </LayoutFooter>
      <LayoutMenuBar />
    </Container>
  );
}
