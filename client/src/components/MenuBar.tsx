import styled from 'styled-components';

const Container = styled.footer`
  grid-area: navigationMenu;
  border: solid blue;
`;

export default function MenuBar() {
  return (
    <Container />
  );
}
