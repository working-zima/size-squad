import { Link, useLocation } from 'react-router-dom';

import styled from 'styled-components';
import BackSpace from './ui/BackSpace';

const Container = styled.header`
  grid-area: header;
  justify-content: center;
  align-items: center;
  display: flex;
  padding: 0 1rem;
  background-color: ${(props) => props.theme.colors.dividerColor};

  h1 {
    overflow: hidden;
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    clip: rect(0px, 0px, 0px, 0px);
  }

  h2 {
    font-size: 2.5rem;

    a {
      color: black;
      user-select: none;
    }
  }
`;

export default function LayoutHeader() {
  const location = useLocation();
  const isEditPage = /^\/mysize\/.*\/edit$/.test(location.pathname);

  return (
    <Container>
      <h1>사이즈 스쿼드</h1>
      {isEditPage
        ? (<BackSpace />) : (
          <h2>
            <Link to="/">Size Squad</Link>
          </h2>
        )}
    </Container>
  );
}
