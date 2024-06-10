import styled from 'styled-components';

import FixedDetailSwitcher from './FixedDetailSwitcher';

const Container = styled.div`
  grid-area: footer;
  border: solid blue;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 550;
`;

const Footer = styled.footer`
  background-color: white;
  padding: 26px 16px 0px;
`;

const Nav = styled.div`
  height: 60px;
  position: relative;

  h2 {
    overflow: hidden;
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    clip: rect(0px, 0px, 0px, 0px);
  }
`;

const Menu = styled.div`
  position: fixed;
  height: 60px;
  /* background-color: rgb(0, 0, 0); */
  border: solid red;
  left: 0px;
  right: 0px;
  bottom: 0px;
`;

export default function MenuBar() {
  return (
    <Container>
      <Footer>
        footer
      </Footer>
      <Nav>
        <h2>Navigation Menu</h2>
        <Menu>
          nav
        </Menu>
      </Nav>
      <FixedDetailSwitcher />
    </Container>
  );
}
