import { useLocation } from 'react-router-dom';

import styled from 'styled-components';

const Container = styled.footer`
  grid-area: footer;
  background-color: ${props => props.theme.colors.borderColor};
  padding: 26px 16px 0px;
  border-top: solid rgb(242, 244, 247);
`;

export default function LayoutFooter() {
  const location = useLocation();

  if (location.pathname === '/login') {return null}

  return (
    <Container>
      LayoutFooter
    </Container>
  )
}
